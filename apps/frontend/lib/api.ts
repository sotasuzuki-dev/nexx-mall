export async function fetchProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL が設定されていません");
  }

  const res = await fetch(`${baseUrl}/products`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}


