const CACHE_NAME = 'fishing-spot-v1';
const TILE_CACHE = 'offline-tiles';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. Handle Tile Requests (Peta) - Cache First & Save
    // Mencakup: Google Maps, OpenStreetMap, Esri Ocean, OpenTopoData
    if (url.href.includes('google.com/vt') || 
        url.href.includes('openstreetmap.org') || 
        url.href.includes('arcgisonline.com') ||
        url.href.includes('opentopodata.org') ||
        url.href.includes('rainviewer.com') ||
        url.href.includes('nasa.gov')) {
        
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // Gunakan cache jika ada, jika tidak ambil dari internet lalu simpan (Passive Caching)
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    if(networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                        const responseClone = networkResponse.clone();
                        caches.open(TILE_CACHE).then((cache) => cache.put(event.request, responseClone));
                    }
                    return networkResponse;
                }).catch(() => {
                    return new Response('', { status: 404 }); // Fallback jika offline total & tidak ada cache
                });
            })
        );
        return;
    }

    // 2. Handle Static Assets & CDN (Scripts, Styles, Images) - Stale While Revalidate
    // Ini menangani Tailwind, Lucide, Leaflet, dll secara dinamis
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|json)$/) || 
        url.href.includes('cdn.tailwindcss.com') ||
        url.href.includes('unpkg.com') ||
        url.href.includes('cdn.jsdelivr.net') ||
        url.href.includes('cdnjs.cloudflare.com')) {

        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        // Cache valid responses (termasuk opaque response dari CDN)
                        if(networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => cachedResponse); // Jika offline & fetch gagal, return cache
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // 3. Default: Network First (Untuk data lain)
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
