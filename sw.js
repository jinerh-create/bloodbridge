const CACHE = 'bloodbridge-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener('push', e => {
  const d = e.data?.json() || { title: 'BLOODBRIDGE', body: 'New notification' };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: '/icon.png', badge: '/icon.png', vibrate: [200, 100, 200] }));
});
