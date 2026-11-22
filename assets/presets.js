// Shared content for every event page.
// Venues and fee plans are registered once here and picked by key in assets/events.js.

window.VENUES = {
  ours: {
    name: "CAFE＆HALL Ours",
    area: "大崎",
    map: "https://maps.app.goo.gl/b7G6mkFFWP914pte6"
  }
  // ,other: { name: "", area: "", map: "" }
};

window.FEES = {
  // 5,000円・持ち込み1本で1,000円引き（vol.0）
  std5000: {
    plans: [
      { label: "一般", yen: 5000 },
      { label: "🍷 1本お持ち込み", yen: 4000 }
    ],
    notes: [
      "ワイン（または日本酒）の<strong>未開封ボトル1本</strong>で1,000円引き。皆でシェアします。",
      "白・泡・ロゼなど、牡蠣に合いそうなものがおすすめです。",
      "お持ち込みの方は<strong>お申し込み時にお知らせください</strong>。"
    ]
  }
};

// Sections that are identical on every event page.
// Put <section data-block="KEY"></section> in a page to insert one.
window.BLOCKS = {
  shuck:
    '<h2>🧤 牡蠣は自分で剥きます</h2><div class="card"><ul class="pts">' +
    '<li>ナイフ・手袋はご用意しています。最初に剥き方をご説明します。</li>' +
    '<li><strong>必ず手袋をして、刃は体と反対の方向へ。</strong></li>' +
    '<li>うまく開かないときは無理せずスタッフへ。</li>' +
    '<li>お帰りの前にナイフを返却してください。</li>' +
    '</ul></div>',

  memo:
    '<h2>📝 牡蠣メモ</h2><div class="card memo">' +
    '<p style="margin:0 0 .6rem">試すたびに <strong>◎ ○ △</strong> をつけるだけ。最後に「今日のいちばん」を投票して発表します。</p>' +
    '<table><tr><th></th><th>おいしい</th><th>ふつう</th><th>いまいち</th></tr>' +
    '<tr><td>① そのまま</td><td>◎</td><td>○</td><td>△</td></tr>' +
    '<tr><td>② ポン酢</td><td>◎</td><td>○</td><td>△</td></tr>' +
    '<tr><td>…</td><td></td><td></td><td></td></tr>' +
    '<tr><td colspan="4" style="text-align:left">🏆 今日のいちばん：＿＿＿＿＿＿</td></tr></table></div>',

  notes:
    '<h2>ご参加にあたって</h2><div class="card"><ul class="pts">' +
    '<li class="pre-only">食物アレルギーや苦手な食材がある方は事前にお知らせください。</li>' +
    '<li>妊娠中の方、体調の優れない方は生牡蠣を控えてください。</li>' +
    '<li>お酒は20歳以上の方のみ。お車でのご来場はご遠慮ください。</li>' +
    '</ul></div><div class="notice mt">' +
    '<strong>⚠ 酢やお酒をかけても牡蠣が殺菌されるわけではありません。</strong><br>' +
    '体調に異変を感じたら、すぐにスタッフへお声がけください。</div>',

  guide:
    '<h2>調味料ガイド</h2><div class="card">当日試す調味料の背景や、世界の牡蠣の食べ方はこちら：<br>' +
    '<a href="{root}guide/">生牡蠣の調味料・薬味・酒類アイデア一覧 →</a></div>'
};
