-- 重複データを削除する SQL
-- Supabase の SQL Editor で実行してください

-- 同じ name, imageUrl, rakutenKeyword, category の組み合わせで重複しているレコードを削除
-- 最新の id を残して、古いものを削除
DELETE FROM "Product"
WHERE id NOT IN (
  SELECT DISTINCT ON (name, "imageUrl", "rakutenKeyword", category)
    id
  FROM "Product"
  ORDER BY name, "imageUrl", "rakutenKeyword", category, id DESC
);

