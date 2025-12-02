# Nexxmall Monorepo

美容商品の最安値リンク集サービスのためのモノレポ基盤です。

- フロントエンド: Next.js (App Router)
- バックエンド: NestJS (REST API)
- DB: Supabase/PostgreSQL + Prisma
- 管理: Turborepo

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下を設定してください：

```bash
# Supabase の接続URL（必須）
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public"

# フロントエンドからバックエンドへの接続URL
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"

# 楽天API アプリID
RAKUTEN_APP_ID="1064480057253811286"
```

### 3. Supabase のセットアップ

詳細は `SETUP.md` を参照してください。簡単な手順：

1. [Supabase](https://supabase.com/) でプロジェクトを作成
2. プロジェクトの「Settings」→「Database」から接続文字列（URI）をコピー
3. `.env` の `DATABASE_URL` に貼り付け（パスワード部分を実際のパスワードに置き換え）

### 4. Prisma マイグレーション

```bash
# Prisma Client を生成
npx prisma generate

# データベースにテーブルを作成
npx prisma migrate dev --name init
```

### 5. 開発サーバー起動

```bash
npm run dev
```

- フロントエンド: `http://localhost:3000`
- バックエンド: `http://localhost:3001`

## API エンドポイント

### バックエンド

- `GET /products` - 商品一覧を取得（DB から）
- `GET /rakuten/search?keyword=化粧水` - 楽天API で商品検索

### フロントエンド

- `/` - トップページ（商品一覧 + 検索）

## データベーススキーマ

`prisma/schema.prisma` を参照してください。主なテーブル：

- `Product` - 商品マスタ（name, imageUrl, rakutenKeyword, qoo10Price, qoo10Link, category）

## 注意事項

- DB が接続されていない場合、`/products` エンドポイントはエラーになりますが、`/rakuten/search` は動作します
- フロントエンドは DB 接続エラー時に適切なメッセージを表示します


