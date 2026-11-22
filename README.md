# 牡蠣を味わう会

公開URL: https://u1kuri.github.io/oyster-guide/

## ページ構成

| パス | 内容 |
|---|---|
| `/` | シリーズのトップ（次回・これまでの開催・会の紹介） |
| `/events/vol-N/` | 各回の案内ページ。`?display` を付けると当日モニター表示 |
| `/guide/` | 生牡蠣の調味料ガイド |
| `/assets/` | 共通のスタイル（`site.css`）・スクリプト（`event.js`）・開催一覧（`events.js`） |
| `/event.html` | 旧URL。`/events/vol-0/` へ転送 |

## 新しい回を追加する手順

1. `events/vol-0/` をフォルダごとコピーして `events/vol-1/` を作る
2. `events/vol-1/index.html` を編集
   - `<body data-date="YYYY-MM-DD">` の日付（当日の「いまここ」表示に使う）
   - タイトル、日時、会場、タイムテーブル、会費など
3. `assets/events.js` に1件追加

   ```js
   { vol: 1, title: "", date: "2027-01-20", time: "19:00–21:00", venue: "", path: "events/vol-1/" }
   ```

トップページの「次回」「これまで」は日付から自動で振り分けられます。
