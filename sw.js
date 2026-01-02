const CACHE_NAME = 'fishing-spot-v1';
const TILE_CACHE = 'offline-tiles';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. Handle Tile Requests (Peta) - Cache First
    // Mencakup: Google Maps, OpenStreetMap, Esri Ocean, OpenTopoData
    if (url.href.includes('google.com/vt') || 
        url.href.includes('openstreetmap.org') || 
        url.href.includes('arcgisonline.com') ||
        url.href.includes('opentopodata.org')) {
        
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).catch(() => {
                    return new Response('', { status: 404 }); // Return kosong jika offline & tidak ada cache
                });
            })
        );
        return;
    }

    // 2. Default: Network First (Untuk data lain)
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
