const CACHE='krpg-v9';
const PRECACHE=[
  './index.html',
  './korean-rpg-v7.html',
  './manifest.json',
  './js/config.js',
  './js/audio.js',
  './js/story.js',
  './js/engine.js',
  './js/battle.js',
  './js/minigames.js',
  './js/ui.js'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(url.pathname.endsWith('.html')){
    // Network-first for HTML
    e.respondWith(fetch(e.request).then(r=>{const rc=r.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return r}).catch(()=>caches.match(e.request)));
  }else if(url.pathname.endsWith('.js')){
    // Cache-first for JS
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(nr=>{const rc=nr.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return nr})));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
