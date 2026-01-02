const CACHE_NAME = 'fishing-spot-v2';
const TILE_CACHE = 'offline-tiles';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js',
    'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest',
    'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@latest',
    'https://cdn.jsdelivr.net/npm/exif-js',
    'https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.8.0/suncalc.min.js'
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

    // 2. Default: Network First (Untuk data lain)
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
