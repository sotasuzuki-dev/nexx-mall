import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Nexxmall - 美容の“いまお得”リンク集",
  description: "美容好き学生のための最安値ビューティーモール"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffe6f1,_#fef7ff)] text-bm-ink antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,182,222,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(190,227,248,0.35),transparent_55%)] mix-blend-soft-light" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-white/40 bg-bm-shell/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bm-accent text-xs font-semibold text-white shadow-[0_8px_25px_rgba(255,105,180,0.6)]">
                  N
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-sm tracking-wide text-bm-ink">
                    Nexxmall
                  </span>
                  <span className="text-[10px] text-bm-muted">
                    beauty deal navigator
                  </span>
                </div>
              </div>
              <nav className="hidden items-center gap-4 text-[11px] text-bm-muted sm:flex">
                <span className="rounded-full bg-white/60 px-3 py-1 font-medium text-bm-ink shadow-sm shadow-bm-accent/10">
                  学生おすすめ
                </span>
                <button className="rounded-full px-3 py-1 hover:bg-white/60">
                  新着セール
                </button>
                <button className="rounded-full px-3 py-1 hover:bg-white/60">
                  マイリスト（近日公開）
                </button>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/50 bg-bm-shell/70 py-4 text-center text-[10px] text-bm-muted backdrop-blur-xl">
            <p>© {new Date().getFullYear()} Nexxmall — made for beauty lovers.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}


