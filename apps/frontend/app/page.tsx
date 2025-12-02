"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DummyProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  shop: string;
  category: string;
};

const dummyProducts: DummyProduct[] = [
  {
    id: "1",
    name: "透明感アップ美容液 30ml",
    imageUrl: "/banner.jpg",
    price: "¥2,480",
    shop: "楽天市場",
    category: "美容液"
  },
  {
    id: "2",
    name: "高保湿トナーパッド 70枚入り",
    imageUrl: "/banner.jpg",
    price: "¥1,980",
    shop: "Qoo10",
    category: "化粧水"
  },
  {
    id: "3",
    name: "UVカットトーンアップクリーム SPF50",
    imageUrl: "/banner.jpg",
    price: "¥1,580",
    shop: "楽天市場",
    category: "日焼け止め"
  }
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dummyProducts;
    return dummyProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen">
      {/* Hero バナー */}
      <section className="relative h-[220px] w-full overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="美容商品バナー"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-4 text-center">
            <p className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              美容の「いまお得」だけを集めました
            </p>
            <p className="mt-2 text-sm text-gray-100">
              楽天・Qoo10 など複数モールから、
              <br className="sm:hidden" />
              いま本当にお得な美容アイテムだけをピックアップ。
            </p>
          </div>
        </div>
      </section>

      {/* 検索欄 */}
      <section className="mx-auto max-w-xl px-4 pb-4 pt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          商品名で探す
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="商品名で探す"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
        <p className="mt-2 text-xs text-gray-500">
          ※ 現在はデモ用のダミーデータを表示しています。後ほどリアルタイム価格に対応します。
        </p>
      </section>

      {/* 商品リスト */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <span>該当件数: {filteredProducts.length} 件</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {product.name}
              </h2>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                <span className="font-semibold text-pink-500">
                  {product.price}
                </span>
                <span>{product.shop}</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                カテゴリ: {product.category}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}


