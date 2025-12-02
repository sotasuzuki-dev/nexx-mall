export async function fetchProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL が設定されていません");
  }

  const url = `${baseUrl}/products`;
  console.log("Fetching products from:", url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒タイムアウト

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json"
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage = errorData.message || `Failed to fetch products: ${res.status}`;
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log("Products fetched successfully:", data.length, "items");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("リクエストがタイムアウトしました");
      }
      console.error("Fetch error:", error);
      throw error;
    }
    throw new Error("商品の取得に失敗しました");
  }
}


