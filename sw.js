const CACHE_NAME = 'fishing-spot-v42';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './weather.js',
    './manifest.json'
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

    // --- FIX: AUDIO & API BYPASS ---
    // File audio dari GitHub & API Eksternal harus bypass SW agar tidak error saat offline/CORS
    if (url.hostname.includes('raw.githubusercontent.com') || 
        url.hostname.includes('rainviewer.com')) {
        return;
    }

    // --- STRATEGY: NETWORK FIRST (Untuk File Inti) ---
    // Agar update aplikasi langsung terasa tanpa menunggu cache expired.
    // Kita cek apakah file yang diminta adalah file utama aplikasi.
    const isCore = url.pathname.endsWith('index.html') || 
                   url.pathname.endsWith('/') || 
                   url.pathname.endsWith('script.js') || 
                   url.pathname.endsWith('weather.js') || 
                   url.pathname.endsWith('style.css');

    if (isCore) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Jika berhasil ambil dari network, update cache
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Jika offline, fallback ke cache
                    return caches.match(event.request);
                })
        );
        return; // Stop di sini untuk file inti
    }

    // --- STRATEGY: CACHE FIRST (Untuk Aset Lain & Peta Offline) ---
    event.respondWith(
        caches.match(event.request).then((cached) => {
            // 1. Jika ada di cache (termasuk Peta Offline), gunakan itu!
            if (cached) return cached;

            // 2. Jika tidak ada, ambil dari internet
            return fetch(event.request).then((response) => {
                // 3. Cek apakah URL ini boleh dicache secara otomatis (Dynamic Caching)?
                // Kita mengecualikan Tile Peta & API agar tidak memenuhi memori HP user saat browsing biasa.
                const shouldCache = !url.hostname.includes('rainviewer.com') &&
                                    !url.hostname.includes('openstreetmap.org') &&
                                    !url.hostname.includes('openweathermap.org') &&
                                    !url.hostname.includes('windy.com') &&
                                    !url.hostname.includes('open-meteo.com') &&
                                    !url.hostname.includes('google.com') &&        // Tile Peta (Kecuali offline)
                                    !url.hostname.includes('arcgisonline.com') &&  // Tile Peta (Kecuali offline)
                                    !url.hostname.includes('ipapi.co');

                if (shouldCache) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                
                return response;
            });
        }).catch(() => {
            // Jika offline total dan file tidak ada di cache, bisa return fallback page disini
        })
    );
});
