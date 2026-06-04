const CACHE='krpg-v14';
const PRECACHE=[
  './index.html','./korean-rpg-v7.html','./manifest.json',
  './js/config.js','./js/audio.js','./js/story.js','./js/engine.js',
  './js/battle.js','./js/minigames.js','./js/ui.js','./js/v10_patch.js','./js/v11_patch.js','./js/v12_patch.js','./js/v13_patch.js','./js/v14_patch.js'
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
  const isGame=url.pathname.includes('korean-rpg-v7')||url.pathname.includes('korean-rpg-v8');
  if(url.pathname.endsWith('.html')){
    e.respondWith(
      fetch(e.request).then(r=>{
        if(r.ok&&isGame){
          return r.text().then(html=>{
            ['v10','v11','v12','v13','v14'].forEach(v=>{
              if(html.indexOf(v+'_patch')<0){
                html=html.replace('</body>','<scr'+'ipt src="./js/'+v+'_patch.js"></scr'+'ipt>\n</body>');
              }
            });
            return new Response(html,{status:200,headers:{'Content-Type':'text/html;charset=utf-8'}});
          });
        }
        const rc=r.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return r;
      }).catch(()=>caches.match(e.request).then(r=>{
        if(!r)return r;
        if(isGame){
          return r.text().then(html=>{
            ['v10','v11','v12','v13','v14'].forEach(v=>{
              if(html.indexOf(v+'_patch')<0){
                html=html.replace('</body>','<scr'+'ipt src="./js/'+v+'_patch.js"></scr'+'ipt>\n</body>');
              }
            });
            return new Response(html,{status:200,headers:{'Content-Type':'text/html;charset=utf-8'}});
          });
        }
        return r;
      }))
    );
  }else if(url.pathname.endsWith('.js')){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(nr=>{const rc=nr.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return nr})));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
