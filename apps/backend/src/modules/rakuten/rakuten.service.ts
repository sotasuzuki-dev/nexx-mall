import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

type RakutenItemRaw = {
  Item: {
    itemName: string;
    itemPrice: number;
    itemUrl: string;
    mediumImageUrls: { imageUrl: string }[];
    shopName: string;
  };
};

export type RakutenSearchResult = {
  name: string;
  price: number;
  url: string;
  image: string;
  shop: string;
};

@Injectable()
export class RakutenService {
  private readonly MAX_RETRIES = 3;
  private readonly DEFAULT_RETRY_DELAY = 1000; // 1秒

  async search(keyword?: string, retryCount = 0): Promise<RakutenSearchResult[]> {
    const appId = process.env.RAKUTEN_APP_ID;
    if (!appId) {
      throw new HttpException(
        "RAKUTEN_APP_ID is not configured",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const q = (keyword ?? "スキンケア").trim() || "スキンケア";

    const params = new URLSearchParams({
      applicationId: appId,
      keyword: q,
      hits: "10",
      sort: "+itemPrice"
    });

    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${params.toString()}`;

    try {
      const res = await fetch(url);

      // 429エラー（レート制限）の場合、リトライを試みる
      if (res.status === 429) {
        if (retryCount < this.MAX_RETRIES) {
          const retryAfter = res.headers.get("Retry-After");
          const delay = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : this.DEFAULT_RETRY_DELAY * (retryCount + 1);

          // eslint-disable-next-line no-console
          console.log(
            `Rakuten API rate limit hit. Retrying after ${delay}ms (attempt ${retryCount + 1}/${this.MAX_RETRIES})`
          );

          await new Promise(resolve => setTimeout(resolve, delay));
          return this.search(keyword, retryCount + 1);
        } else {
          throw new HttpException(
            "Rakuten API rate limit exceeded. Please try again later.",
            HttpStatus.TOO_MANY_REQUESTS
          );
        }
      }

      if (!res.ok) {
        throw new HttpException(
          `Rakuten API error: ${res.status}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      const data = (await res.json()) as { Items?: RakutenItemRaw[] };
      const items = data.Items ?? [];

      return items.map(({ Item }) => ({
        name: Item.itemName,
        price: Item.itemPrice,
        url: Item.itemUrl,
        image: Item.mediumImageUrls?.[0]?.imageUrl ?? "",
        shop: Item.shopName
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Rakuten API request failed", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to fetch from Rakuten API",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}


