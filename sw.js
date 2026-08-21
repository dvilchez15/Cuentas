const CACHE='cuenta-clara-v3-6-1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./cuenta-clara-logo-v22-180.png','./cuenta-clara-logo-v22-192.png','./cuenta-clara-logo-v22-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>cached)));});
