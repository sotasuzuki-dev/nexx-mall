import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RakutenService } from "../rakuten/rakuten.service";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rakutenService: RakutenService
  ) {}

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        orderBy: { name: "asc" }
      });
    } catch (error) {
      // DB 接続エラーの場合
      if (error instanceof Error && error.message.includes("Can't reach database")) {
        throw new HttpException(
          "データベースに接続できません。DATABASE_URL を確認してください。",
          HttpStatus.SERVICE_UNAVAILABLE
        );
      }
      throw new HttpException(
        "商品の取得に失敗しました",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async syncFromRakuten(keywords: string[] = ["スキンケア", "化粧水", "美容液", "日焼け止め", "リップ"]) {
    try {
      const allProducts: Array<{
        name: string;
        imageUrl: string;
        rakutenKeyword: string;
        qoo10Price: number | null;
        qoo10Link: string | null;
        category: string;
      }> = [];

      // 各キーワードで楽天APIから商品を取得
      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i];
        const rakutenItems = await this.rakutenService.search(keyword);
        
        for (const item of rakutenItems) {
          // カテゴリをキーワードから推測
          const category = this.inferCategory(keyword, item.name);
          
          allProducts.push({
            name: item.name,
            imageUrl: item.image || "",
            rakutenKeyword: keyword,
            qoo10Price: null,
            qoo10Link: null,
            category
          });
        }

        // レート制限を避けるため、最後のリクエスト以外は1秒待機
        if (i < keywords.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // 重複を除去（name と imageUrl の組み合わせで）
      const uniqueProducts = Array.from(
        new Map(allProducts.map(p => [`${p.name}_${p.imageUrl}`, p])).values()
      );

      // DBに保存（既存のものは更新、新規は追加）
      const savedProducts = [];
      for (const product of uniqueProducts) {
        const existing = await this.prisma.product.findFirst({
          where: {
            name: product.name,
            imageUrl: product.imageUrl
          }
        });

        if (existing) {
          // 既存の商品を更新
          const updated = await this.prisma.product.update({
            where: { id: existing.id },
            data: {
              rakutenKeyword: product.rakutenKeyword,
              category: product.category
            }
          });
          savedProducts.push(updated);
        } else {
          // 新規商品を追加
          const created = await this.prisma.product.create({
            data: product
          });
          savedProducts.push(created);
        }
      }

      return {
        message: `${savedProducts.length} 件の商品を同期しました`,
        count: savedProducts.length
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("楽天APIからの商品同期エラー:", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "楽天APIからの商品同期に失敗しました",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private inferCategory(keyword: string, productName: string): string {
    const name = productName.toLowerCase();
    
    if (name.includes("化粧水") || name.includes("トナー") || keyword.includes("化粧水")) {
      return "化粧水";
    }
    if (name.includes("美容液") || name.includes("セラム") || keyword.includes("美容液")) {
      return "美容液";
    }
    if (name.includes("日焼け止め") || name.includes("uv") || name.includes("サンスクリーン") || keyword.includes("日焼け止め")) {
      return "日焼け止め";
    }
    if (name.includes("リップ") || name.includes("口紅") || keyword.includes("リップ")) {
      return "リップ";
    }
    if (name.includes("クレンジング") || keyword.includes("クレンジング")) {
      return "クレンジング";
    }
    
    return keyword || "その他";
  }
}


