-- シードデータ投入用 SQL
-- Supabase の SQL Editor で実行してください

INSERT INTO "Product" ("id", "name", "imageUrl", "rakutenKeyword", "qoo10Price", "qoo10Link", "category")
VALUES
  (gen_random_uuid()::text, '透明感アップ美容液 30ml', 'https://via.placeholder.com/400x400?text=Beauty+Serum', '透明感 美容液', 2480, NULL, '美容液'),
  (gen_random_uuid()::text, '高保湿トナーパッド 70枚入り', 'https://via.placeholder.com/400x400?text=Toner+Pad', 'トナーパッド 高保湿', 1980, NULL, '化粧水'),
  (gen_random_uuid()::text, 'UVカットトーンアップクリーム SPF50', 'https://via.placeholder.com/400x400?text=UV+Cream', 'トーンアップ 日焼け止め SPF50', 1580, NULL, '日焼け止め'),
  (gen_random_uuid()::text, 'リップグロス 透明感タイプ 6g', 'https://via.placeholder.com/400x400?text=Lip+Gloss', 'リップグロス 透明感', 980, NULL, 'リップ'),
  (gen_random_uuid()::text, 'クレンジングオイル 200ml', 'https://via.placeholder.com/400x400?text=Cleansing+Oil', 'クレンジングオイル 敏感肌', 1280, NULL, 'クレンジング');

