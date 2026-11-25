const C='plume-v1',CORE=['./','index.html','manifest.webmanifest','lib/peerjs.min.js','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(x=>{if(x.ok)caches.open(C).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))});
