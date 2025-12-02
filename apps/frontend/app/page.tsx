"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  rakutenKeyword: string;
  qoo10Price: number | null;
  qoo10Link: string | null;
  category: string;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "商品の読み込みに失敗しました");
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.rakutenKeyword.toLowerCase().includes(q)
    );
  }, [query, products]);

  const formatPrice = (price: number | null): string => {
    if (price === null) return "価格未設定";
    return `¥${price.toLocaleString()}`;
  };

  const getShopName = (product: Product): string => {
    if (product.qoo10Link) return "Qoo10";
    if (product.rakutenKeyword) return "楽天市場";
    return "その他";
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-8 sm:pt-10">
      {/* Hero バナー */}
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_18px_60px_rgba(255,143,190,0.45)] sm:p-6 md:flex md:items-center md:justify-between">
        <div className="relative z-10 max-w-xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-bm-accent-soft/90 px-3 py-1 text-[11px] font-medium text-bm-muted shadow-sm shadow-bm-accent/20">
            <span className="h-1.5 w-1.5 rounded-full bg-bm-accent" />
            学割世代の「いまお得」だけピック
          </p>
          <h1 className="font-display text-2xl leading-tight tracking-tight text-bm-ink sm:text-3xl md:text-[32px]">
            今日の{" "}
            <span className="relative inline-block">
              神コスパ
              <span className="pointer-events-none absolute -bottom-1.5 left-0 h-[10px] w-full rounded-full bg-bm-accent-soft/80" />
            </span>{" "}
            コスメだけ、
            <br className="hidden sm:block" />
            ぜんぶここに。
          </h1>
          <p className="text-xs leading-relaxed text-bm-muted sm:text-[13px]">
            楽天・Qoo10・ドラッグストア系モールから、
            <span className="font-semibold text-bm-ink">
              「いま」学生目線でお得な美容アイテム
            </span>
            をだけをまとめてチェック。
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bm-chip"># 学生でも手が届くデパコス風</span>
            <span className="bm-chip"># SNSでバズってる順に表示（予定）</span>
            <span className="bm-chip hidden sm:inline-flex"># 推しブランドで絞り込み（近日追加）</span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 translate-x-12 opacity-60 sm:w-48 sm:translate-x-10 md:static md:inset-auto md:translate-x-0 md:opacity-100">
          <div className="relative h-40 w-40 rotate-6 overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-[#ffe0f2] via-[#fff7fb] to-[#e2f2ff] shadow-[0_20px_50px_rgba(138,71,104,0.35)] sm:h-48 sm:w-48">
            <div className="absolute inset-3 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm" />
            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-[10px] text-bm-muted">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-2 py-0.5 font-semibold text-[10px] text-bm-ink">
                  今日のいま得 TOP3
                </span>
                <span>¥1,580〜</span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/70">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-bm-accent to-[#ffb4de]" />
              </div>
              <p className="text-[9px] text-bm-muted">
                ログインすると、肌悩みにあわせたおすすめ順に並び替えられます。（近日公開）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 検索欄 */}
      <section className="mx-auto mb-6 w-full max-w-3xl">
        <div className="relative rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_14px_35px_rgba(138,71,104,0.16)] backdrop-blur">
          <label className="mb-1 block text-[11px] font-medium tracking-wide text-bm-muted">
            商品名・ブランド名で探す
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-bm-muted">
                🔍
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例）トナーパッド / トーンアップ / rom&nd"
                className="w-full rounded-xl border border-transparent bg-bm-accent-soft/40 px-8 py-2.5 text-xs text-bm-ink placeholder:text-bm-muted/70 focus:border-bm-accent/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bm-accent/30"
              />
            </div>
            <div className="hidden flex-col items-end text-[10px] text-bm-muted sm:flex">
              <span>↵ で絞り込み</span>
              <span className="rounded-full bg-bm-accent-soft/80 px-2 py-0.5 text-[9px]">
                {filteredProducts.length} 件ヒット中
              </span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-bm-muted">
            {products.length === 0 && !isLoading && (
              <span className="text-bm-accent">
                ※ データベースに商品が登録されていません。Supabase に接続して商品を追加してください。
              </span>
            )}
            {products.length > 0 && (
              <span>
                データベースから <span className="font-semibold">{products.length} 件</span> の商品を読み込みました。
                将来的には<span className="font-semibold">楽天・Qoo10 などのリアルタイム価格</span>
                から最安値順に並び替えます。
              </span>
            )}
          </p>
        </div>
      </section>

      {/* 商品リスト */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-[11px] text-bm-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium text-bm-ink">
              該当件数: {filteredProducts.length} 件
            </span>
            <span>先に見るべき「コスパ◎順」に並べています。</span>
          </div>
          <button className="hidden items-center gap-1 rounded-full border border-bm-outline bg-white/70 px-3 py-1 text-[10px] text-bm-muted hover:border-bm-accent/60 hover:text-bm-ink sm:inline-flex">
            並び替え
            <span className="text-[9px]">▼</span>
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mb-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-bm-accent-soft border-t-bm-accent" />
              <p className="text-xs text-bm-muted">商品を読み込み中...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <p className="mt-1 text-xs text-red-500">
              DB が接続されていない可能性があります。.env の DATABASE_URL を確認してください。
            </p>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-bm-outline bg-white/60 p-8 text-center">
            <p className="text-sm text-bm-muted">
              {query ? `「${query}」に一致する商品が見つかりませんでした` : "商品が登録されていません"}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.map((product, index) => (
            <article
              key={product.id}
              className="bm-card bm-card-hover group flex flex-col"
              style={{ animation: `fadeUp 0.4s ease-out ${index * 0.04}s both` }}
            >
              <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffe1f2] via-[#fff7fb] to-[#e4f3ff]">
                <img
                  src={product.imageUrl || "/banner.jpg"}
                  alt={product.name}
                  className="h-full w-full object-cover mix-blend-multiply"
                  onError={(e) => {
                    // 画像読み込みエラー時のフォールバック
                    const target = e.target as HTMLImageElement;
                    target.src = "/banner.jpg";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.7),transparent_55%),radial-gradient(circle_at_90%_90%,rgba(255,189,214,0.7),transparent_55%)] opacity-80 mix-blend-soft-light" />
                <div className="absolute left-2 top-2 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-medium text-white">
                  学生人気
                  <span className="ml-1 align-middle text-[9px]">TOP{index + 1}</span>
                </div>
              </div>
              <h2 className="line-clamp-2 text-[13px] font-semibold tracking-tight text-bm-ink">
                {product.name}
              </h2>
              <div className="mt-2 flex items-center justify-between text-[11px] text-bm-muted">
                <span className="font-semibold text-bm-accent">
                  {formatPrice(product.qoo10Price)}
                  <span className="ml-1 text-[10px] font-normal text-bm-muted">
                    税込・参考
                  </span>
                </span>
                <span className="rounded-full bg-bm-accent-soft/70 px-2 py-0.5 text-[10px] text-bm-ink">
                  {getShopName(product)}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-bm-muted">
                カテゴリ: <span className="font-medium">{product.category}</span>
              </p>
              <button
                onClick={() => {
                  const link = product.qoo10Link || `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(product.rakutenKeyword)}`;
                  window.open(link, "_blank");
                }}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-bm-ink px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_10px_25px_rgba(34,20,31,0.4)] transition group-hover:bg-bm-accent group-hover:shadow-[0_16px_40px_rgba(255,111,166,0.7)]"
              >
                最安値リンクを見る
                <span className="ml-1 text-[11px]">↗</span>
              </button>
            </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}


