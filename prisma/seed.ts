import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 シードデータを投入中...");

  // サンプル商品データ
  const sampleProducts = [
    {
      name: "透明感アップ美容液 30ml",
      imageUrl: "https://via.placeholder.com/400x400?text=Beauty+Serum",
      rakutenKeyword: "透明感 美容液",
      qoo10Price: 2480,
      qoo10Link: null,
      category: "美容液"
    },
    {
      name: "高保湿トナーパッド 70枚入り",
      imageUrl: "https://via.placeholder.com/400x400?text=Toner+Pad",
      rakutenKeyword: "トナーパッド 高保湿",
      qoo10Price: 1980,
      qoo10Link: null,
      category: "化粧水"
    },
    {
      name: "UVカットトーンアップクリーム SPF50",
      imageUrl: "https://via.placeholder.com/400x400?text=UV+Cream",
      rakutenKeyword: "トーンアップ 日焼け止め SPF50",
      qoo10Price: 1580,
      qoo10Link: null,
      category: "日焼け止め"
    },
    {
      name: "リップグロス 透明感タイプ 6g",
      imageUrl: "https://via.placeholder.com/400x400?text=Lip+Gloss",
      rakutenKeyword: "リップグロス 透明感",
      qoo10Price: 980,
      qoo10Link: null,
      category: "リップ"
    },
    {
      name: "クレンジングオイル 200ml",
      imageUrl: "https://via.placeholder.com/400x400?text=Cleansing+Oil",
      rakutenKeyword: "クレンジングオイル 敏感肌",
      qoo10Price: 1280,
      qoo10Link: null,
      category: "クレンジング"
    }
  ];

  // 既存データをクリア（オプション）
  await prisma.product.deleteMany({});

  // 商品を追加
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product
    });
    console.log(`✅ ${product.name} を追加しました`);
  }

  console.log(`\n✨ ${sampleProducts.length} 件の商品データを投入しました！`);
}

main()
  .catch((e) => {
    console.error("❌ シード実行エラー:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

