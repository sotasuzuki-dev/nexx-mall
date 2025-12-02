# Supabase セットアップガイド

## 1. Supabase プロジェクトの作成

1. [Supabase](https://supabase.com/) にアクセスしてアカウントを作成（無料）
2. 「New Project」をクリック
3. プロジェクト名を入力（例: `nexxmall`）
4. データベースパスワードを設定（**必ずメモしておく**）
5. リージョンを選択（例: `Tokyo`）
6. 「Create new project」をクリック

## 2. 接続文字列の取得

1. Supabase ダッシュボードでプロジェクトを開く
2. 左メニューの「Settings」→「Database」を開く
3. 「Connection string」セクションを探す
4. 「URI」タブを選択
5. 表示された接続文字列をコピー

例：
```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

## 3. `.env` ファイルの設定

プロジェクトルートの `.env` ファイルを開き、`DATABASE_URL` を更新：

```bash
DATABASE_URL="[コピーした接続文字列]"
```

**重要**: `[YOUR-PASSWORD]` の部分を、プロジェクト作成時に設定したパスワードに置き換えてください。

## 4. マイグレーション実行

接続文字列を設定したら、以下を実行：

```bash
# Prisma Client を生成（既に実行済みの場合はスキップ可）
npm run db:generate

# データベースにテーブルを作成
npm run db:migrate
```

## 5. シードデータの投入（オプション）

サンプル商品データを投入する場合：

```bash
npm run db:seed
```

## 6. 動作確認

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開き、商品一覧が表示されることを確認してください。

---

## トラブルシューティング

### エラー: `Can't reach database server`

- `.env` の `DATABASE_URL` が正しく設定されているか確認
- Supabase プロジェクトが作成されているか確認
- パスワードが正しいか確認（接続文字列内の `[YOUR-PASSWORD]` を実際のパスワードに置き換えているか）

### エラー: `Authentication failed`

- Supabase のパスワードが間違っている可能性があります
- Supabase ダッシュボードでパスワードをリセットできます

### エラー: `relation "Product" does not exist`

- マイグレーションが実行されていない可能性があります
- `npm run db:migrate` を実行してください

