// Shared behaviour for event pages.
// <body data-date="YYYY-MM-DD"> sets the event day; timeline items need data-t="HH:MM".
(function(){
  var q=location.search;
  // ?display : larger text, hides pre-event-only sections (for the on-site screen)
  if(/[?&]display\b/.test(q))document.body.classList.add('display');

  // Highlight the current step on the event day (Japan time). ?demo forces it on.
  var date=document.body.getAttribute('data-date');
  var items=[].slice.call(document.querySelectorAll('.tl li[data-t]'));
  if(!items.length)return;
  function mins(hm){var p=hm.split(':');return +p[0]*60+ +p[1]}
  function tick(){
    var jst=new Date(Date.now()+9*3600e3);
    var onDay=jst.toISOString().slice(0,10)===date||/[?&]demo\b/.test(q);
    var now=jst.getUTCHours()*60+jst.getUTCMinutes(),cur=-1;
    if(onDay)items.forEach(function(li,i){if(mins(li.dataset.t)<=now)cur=i});
    items.forEach(function(li,i){
      li.classList.toggle('now',i===cur);
      li.classList.toggle('done',cur>-1&&i<cur);
    });
  }
  tick();setInterval(tick,30000);
})();
