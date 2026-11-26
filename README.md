# 100個の牡蠣&ワインの会

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
2. `events/vol-1/index.html` の `<body data-vol="0">` を `data-vol="1"` にし、タイムテーブルを編集
3. `assets/events.js` に1件追加

   ```js
   { vol: 1, title: "", date: "2027-01-20", open: "18:50", start: "19:00", end: "21:00",
     venue: "v0", fee: "std5000", path: "events/vol-1/" }
   ```

日時・会場・会費・共通パーツはページに自動で入ります。トップページの「次回」「これまで」も日付で自動振り分けです。

## 共通パーツ（`assets/presets.js`）

| 名前 | 内容 |
|---|---|
| `VENUES` | 会場のパターン（名前・エリア・地図URL）。新しい会場は1件追加して `venue` にキーを指定 |
| `FEES` | 会費のパターン（料金プランと注意書き）。新しい料金体系は1件追加して `fee` にキーを指定 |
| `BLOCKS.shuck` | 剥くときの注意（全回共通） |
| `BLOCKS.memo` | 牡蠣メモの説明 |
| `BLOCKS.notes` | 参加にあたっての注意・安全 |
| `BLOCKS.guide` | 調味料ガイドへのリンク |

ページ内では `<section data-block="shuck"></section>` のように置くと挿入されます。

## 会場を合言葉で隠す

会場情報（名前・エリア・地図URL）は合言葉で暗号化して `assets/presets.js` に置けます。合言葉そのものはリポジトリに保存しません。

```sh
OYSTER_PASS='合言葉' node tools/lock-venue.mjs '{"name":"会場名","area":"エリア","map":"https://…"}'
```

出力された `{ iter, salt, iv, ct }` を `VENUES` に `key: { locked: { … } }` として貼り付け、`events.js` の `venue` にそのキーを指定します。
ページでは会場欄に合言葉の入力欄が出て、正しい合言葉を入れるとそのブラウザでは以後も表示されます。
