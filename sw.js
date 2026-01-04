const CACHE_NAME = 'fishing-spot-v7';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './weather.js'
];

// 1. Install Service Worker & Cache File Inti
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Langsung aktifkan SW baru
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// 2. Activate & Hapus Cache Lama (Agar user dapat update terbaru)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Fetch Strategy: Cache First, lalu Network (Dynamic Caching)
self.addEventListener('fetch', (event) => {
    // Hanya cache request GET (bukan POST/API upload)
    if(event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // --- FIX: JANGAN CACHE TILE PETA & API ---
    // Mencegah error 403 RainViewer dan menghemat memori
    if (
        url.hostname.includes('rainviewer.com') ||
        url.hostname.includes('openstreetmap.org') || // OSM tidak dipakai, tapi biarkan untuk jaga-jaga
        url.hostname.includes('openweathermap.org') ||
        url.hostname.includes('windy.com') ||
        url.hostname.includes('open-meteo.com') ||     // FIX: Jangan cache data cuaca
        url.hostname.includes('google.com') ||         // FIX: Jangan cache map tiles & script
        url.hostname.includes('arcgisonline.com') ||   // FIX: Jangan cache map laut
        url.hostname.includes('ipapi.co') ||             // FIX: Jangan cache lokasi IP
        url.hostname.includes('raw.githubusercontent.com') // FIX: Jangan cache file audio
    ) {
        return; // Biarkan browser menangani request ini secara langsung (Network Only)
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            // Jika ada di cache, pakai itu. Jika tidak, ambil dari internet.
            return cached || fetch(event.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    // Simpan aset baru yang berhasil diambil ke cache (misal: gambar, icon)
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }).catch(() => {
            // Jika offline total dan file tidak ada di cache, bisa return fallback page disini
        })
    );
});
