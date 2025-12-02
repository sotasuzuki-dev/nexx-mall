import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Nexxmall - 美容の“いまお得”リンク集",
  description: "美容商品の最安値リンク集サービスの基盤 UI"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}


