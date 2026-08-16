const CACHE='cuenta-clara-v16';
const ASSETS=[
 './','./index.html','./manifest.webmanifest',
 './cuenta-clara-logo-v16-180.png',
 './cuenta-clara-logo-v16-192.png',
 './cuenta-clara-logo-v16-512.png'
];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
 self.skipWaiting();
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(
   keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
 )));
 self.clients.claim();
});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(
  caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
   const copy=r.clone();
   caches.open(CACHE).then(c=>c.put(e.request,copy));
   return r;
  }).catch(()=>caches.match('./index.html')))
 );
});
