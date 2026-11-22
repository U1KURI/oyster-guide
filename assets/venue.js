// Venue lookup with passphrase-locked venues.
// A locked venue in VENUES looks like { locked: { iter, salt, iv, ct } } (made by tools/lock-venue.mjs).
// Once unlocked, the venue is remembered in this browser only.
window.VenueLock = (function(){
  function b64(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
  function cacheKey(k,v){return 'oyster-venue:'+k+':'+v.locked.ct.slice(0,16)}
  function raw(k){return (window.VENUES||{})[k]||null}

  // Returns the venue object if public or already unlocked here, otherwise null.
  function get(k){
    var v=raw(k);if(!v)return null;
    if(!v.locked)return v;
    try{var s=localStorage.getItem(cacheKey(k,v));return s?JSON.parse(s):null}catch(e){return null}
  }
  function isLocked(k){var v=raw(k);return !!(v&&v.locked)}

  // Resolves to the venue object, or null when the passphrase is wrong.
  function unlock(k,pass){
    var v=raw(k);if(!v||!v.locked)return Promise.resolve(v);
    var L=v.locked,enc=new TextEncoder();
    if(!window.crypto||!crypto.subtle)return Promise.reject(new Error('unsupported'));
    return crypto.subtle.importKey('raw',enc.encode(pass),'PBKDF2',false,['deriveKey']).then(function(base){
      return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(L.salt),iterations:L.iter,hash:'SHA-256'},
        base,{name:'AES-GCM',length:256},false,['decrypt']);
    }).then(function(key){
      return crypto.subtle.decrypt({name:'AES-GCM',iv:b64(L.iv)},key,b64(L.ct));
    }).then(function(buf){
      var out=JSON.parse(new TextDecoder().decode(buf));
      try{localStorage.setItem(cacheKey(k,v),JSON.stringify(out))}catch(e){}
      return out;
    },function(){return null});
  }

  // Unlock any locked venue with one passphrase (used by the top page).
  function unlockAll(pass){
    var ks=Object.keys(window.VENUES||{}).filter(isLocked);
    return Promise.all(ks.map(function(k){return unlock(k,pass)})).then(function(r){
      return r.some(function(x){return !!x});
    });
  }
  return {get:get,isLocked:isLocked,unlock:unlock,unlockAll:unlockAll};
})();
