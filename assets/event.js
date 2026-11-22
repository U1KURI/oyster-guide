// Shared behaviour for event pages.
// <body data-vol="N"> picks the entry from assets/events.js; venue/fee/blocks come from assets/presets.js.
// Timeline items need data-t="HH:MM".
(function(){
  var q=location.search,body=document.body,root='../../';
  var W='日月火水木金土';
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function fmtDate(d){var p=d.split('-');return +p[0]+'年'+(+p[1])+'月'+(+p[2])+'日（'+W[new Date(Date.UTC(+p[0],p[1]-1,+p[2])).getUTCDay()]+'）'}
  function yen(n){return Number(n).toLocaleString('ja-JP')}

  var vol=body.getAttribute('data-vol');
  var ev=(window.EVENTS||[]).filter(function(e){return String(e.vol)===vol})[0]||{};
  var venue=(window.VENUES||{})[ev.venue]||{};
  var fee=(window.FEES||{})[ev.fee];
  var title='vol.'+ev.vol+(ev.title?' '+ev.title:'');

  // Hero, title, footer
  if(ev.date){
    document.title='牡蠣を味わう会 '+title;
    var set=function(sel,html){var el=document.querySelector(sel);if(el)el.innerHTML=html};
    set('[data-fill="title"]','<span class="vol">vol.'+esc(ev.vol)+'</span>'+esc(ev.title||''));
    set('[data-fill="when"]',fmtDate(ev.date)+' '+(ev.open?esc(ev.open)+' 受付／':'')+esc(ev.start)+' 開始／'+esc(ev.end)+' おひらき');
    set('[data-fill="where"]',esc(venue.name||ev.venue||'')+(venue.area?'（'+esc(venue.area)+'）':'')+
      (venue.map?'<br><a href="'+esc(venue.map)+'" target="_blank" rel="noopener">Google マップで見る →</a>':''));
    set('[data-fill="footer"]','牡蠣を味わう会 '+esc(title)+' — '+fmtDate(ev.date)+' '+esc(venue.name||''));
  }

  // Fee
  var feeEl=document.querySelector('[data-block="fee"]');
  if(feeEl&&fee){
    feeEl.innerHTML='<h2>会費</h2><div class="fee">'+fee.plans.map(function(p){
      return '<div><div class="lbl">'+p.label+'</div><div class="yen">'+yen(p.yen)+'<small>円</small></div></div>'}).join('')+
      '</div>'+(fee.notes&&fee.notes.length?'<div class="card mt"><ul class="pts"><li>'+fee.notes.join('</li><li>')+'</li></ul></div>':'');
  }

  // Shared blocks
  [].forEach.call(document.querySelectorAll('[data-block]'),function(el){
    var b=(window.BLOCKS||{})[el.getAttribute('data-block')];
    if(b)el.innerHTML=b.replace(/\{root\}/g,root);
  });

  // ?display : larger text, hides pre-event-only sections (for the on-site screen)
  if(/[?&]display\b/.test(q))body.classList.add('display');

  // Highlight the current step on the event day (Japan time). ?demo forces it on.
  var items=[].slice.call(document.querySelectorAll('.tl li[data-t]'));
  if(!items.length)return;
  function mins(hm){var p=hm.split(':');return +p[0]*60+ +p[1]}
  function tick(){
    var jst=new Date(Date.now()+9*3600e3);
    var onDay=jst.toISOString().slice(0,10)===ev.date||/[?&]demo\b/.test(q);
    var now=jst.getUTCHours()*60+jst.getUTCMinutes(),cur=-1;
    if(onDay)items.forEach(function(li,i){if(mins(li.dataset.t)<=now)cur=i});
    items.forEach(function(li,i){
      li.classList.toggle('now',i===cur);
      li.classList.toggle('done',cur>-1&&i<cur);
    });
  }
  tick();setInterval(tick,30000);
})();
