
// --- HIGH-PERFORMANCE WEATHER ANIMATION (CANVAS) ---
const canvas = document.getElementById('weather-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let clouds = []; // Array untuk awan
let animationFrameId = null;
let wxInterval = null;
let currentWxType = null;
let storm = null;
let wxIsDay = true;
let wxCode = 0;
let stars = [];
let moonPhase = 0.5; // 0.0 - 1.0

function resizeCanvas() {
    if(canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }
}

function initStars() {
    stars = [];
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight * 0.6), // Top 60%
            size: Math.random() * 2,
            alpha: 0.2 + Math.random() * 0.8,
            twinkle: Math.random() * 0.05
        });
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class RainDrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -Math.random() * 50;
        const layerRand = Math.random();
        if (layerRand < 0.1) { // Front
            this.length = 60; this.speed = 25 + Math.random() * 10; this.width = 3; this.opacity = 0.9; this.splash = true;
        } else if (layerRand < 0.4) { // Mid
            this.length = 40; this.speed = 15 + Math.random() * 5; this.width = 2; this.opacity = 0.6; this.splash = Math.random() > 0.5;
        } else { // Back
            this.length = 25; this.speed = 8 + Math.random() * 4; this.width = 1; this.opacity = 0.3; this.splash = false;
        }
    }
    update() {
        if (!canvas) return;
        this.y += this.speed;
        if (this.y > canvas.height) {
            if (this.splash) particles.push(new Splash(this.x));
            this.y = -this.length; this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        if (!ctx) return;
        ctx.beginPath(); ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length * 0.25, this.y + this.length); // Tilt
        ctx.strokeStyle = `rgba(147, 197, 253, ${this.opacity})`; ctx.lineWidth = this.width; ctx.stroke();
    }
}

class Splash {
    constructor(x) { this.x = x; this.y = canvas ? canvas.height : 0; this.radius = 20 + Math.random() * 20; this.maxRadius = this.radius * 1.5; this.life = 0; this.maxLife = 20; this.isDead = false; }
    update() { this.life++; if (this.life >= this.maxLife) this.isDead = true; }
    draw() {
        if (!ctx) return;
        const p = this.life / this.maxLife;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * p, Math.PI, 2 * Math.PI, false);
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.8 * (1 - p)})`; ctx.lineWidth = 2; ctx.stroke();
    }
}

class SnowFlake {
    constructor() { if(!canvas) return; this.x = Math.random() * canvas.width; this.y = -Math.random() * 20; this.size = 10 + Math.random() * 15; this.speed = 1 + Math.random() * 2; this.sway = 0.5 + Math.random() * 0.5; this.swaySpeed = 0.02 + Math.random() * 0.01; this.angle = 0; }
    update() { if(!canvas) return; this.y += this.speed; this.angle += this.swaySpeed; this.x += Math.sin(this.angle) * this.sway; if (this.y > canvas.height) { this.y = -20; this.x = Math.random() * canvas.width; } }
    draw() { if(!ctx) return; ctx.font = `${this.size}px Arial`; ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + this.size / 30})`; ctx.fillText('❄', this.x, this.y); }
}

class WindLine {
    constructor() { if(!canvas) return; this.x = -150; this.y = Math.random() * canvas.height; this.length = 150; this.speed = 15 + Math.random() * 10; }
    update() { if(!canvas) return; this.x += this.speed; if (this.x > canvas.width + 50) { this.x = -150; this.y = Math.random() * canvas.height; } }
    draw() {
        if (!ctx) return;
        const g = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
        g.addColorStop(0, 'rgba(255, 255, 255, 0)'); g.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)'); g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.length, this.y); ctx.stroke();
    }
}

// --- NEW: Cloud Class untuk Awan Bergerak ---
class Cloud {
    constructor() {
        this.reset();
        this.x = Math.random() * canvas.width; // Posisi awal acak
    }

    reset() {
        this.x = -300;
        this.y = Math.random() * (canvas.height * 0.35); // Area langit atas
        this.speed = 0.15 + Math.random() * 0.25; // Gerakan lambat
        this.scale = 0.6 + Math.random() * 0.8; // Variasi ukuran
        this.opacity = 0.6 + Math.random() * 0.3; 
        
        this.puffs = [];
        // Buat bentuk awan yang lebih kompleks (elongated)
        const count = 5 + Math.floor(Math.random() * 6);
        for(let i=0; i<count; i++) {
            this.puffs.push({
                x: (Math.random() - 0.5) * 200 * this.scale,
                y: (Math.random() - 0.5) * 50 * this.scale,
                r: (40 + Math.random() * 30) * this.scale
            });
        }
    }

    update() {
        if(!canvas) return;
        this.x += this.speed;
        if(this.x > canvas.width + 300) this.reset();
    }

    draw() {
        if(!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Efek Blur agar terlihat seperti kapas/asap (Natural)
        ctx.filter = 'blur(20px)'; 
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        
        ctx.beginPath();
        this.puffs.forEach(p => {
            ctx.moveTo(p.x + p.r, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        });
        ctx.fill();
        
        ctx.restore();
    }
}

function drawSkyBackground() {
    if (!ctx || !canvas) return;
    
    // --- NEW: Gradasi Langit Natural (iPhone Style) ---
    const h = new Date().getHours();
    let top, bot;

    if (wxCode >= 95) { // Badai (Sangat Gelap)
        top = "#020617"; bot = "#1e1b4b"; 
    } else if (wxCode >= 51 || wxCode === 3) { // Hujan / Mendung Tebal
        if(h >= 6 && h < 18) { top = "#475569"; bot = "#94a3b8"; } // Siang Kelabu
        else { top = "#0f172a"; bot = "#334155"; } // Malam Kelabu
    } else {
        // Cuaca Cerah / Berawan Ringan (Warna-warni sesuai jam)
        if (h >= 5 && h < 7) { // Subuh/Sunrise (Biru ke Emas)
            top = "#1e3a8a"; bot = "#fbbf24"; 
        } else if (h >= 7 && h < 10) { // Pagi (Biru Cerah)
            top = "#3b82f6"; bot = "#bae6fd"; 
        } else if (h >= 10 && h < 16) { // Siang (Biru Langit)
            top = "#0ea5e9"; bot = "#7dd3fc"; 
        } else if (h >= 16 && h < 19) { // Sore/Sunset (Ungu ke Oranye)
            top = "#4338ca"; bot = "#f97316"; 
        }
        else { // Malam (Hitam ke Biru Malam)
            top = "#020617"; bot = "#1e293b"; 
        }
    }

    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, top);
    grd.addColorStop(1, bot);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCelestialBodies() {
    if (!ctx) return;
    // Draw Stars (Night only, if not heavy storm)
    const h = new Date().getHours();
    const isNightTime = h >= 19 || h < 5; // Jam malam visual

    if (isNightTime && wxCode < 60) {
        ctx.fillStyle = "white";
        stars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            // Twinkle effect
            star.alpha += star.twinkle;
            if (star.alpha > 1 || star.alpha < 0.2) star.twinkle *= -1;
        });
        ctx.globalAlpha = 1.0;
    }

    // Draw Sun (Day & Clear/Partly Cloudy)
    if (!isNightTime && wxCode <= 3) {
        // Sun Position: Top Left (as requested for Moon, keeping consistent or mirrored)
        // Let's put Sun Top Left as well to match the "corner" request
        const sunX = 60; 
        const sunY = 80;
        
        // Glow
        const grd = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 60);
        grd.addColorStop(0, "rgba(253, 224, 71, 0.8)");
        grd.addColorStop(1, "rgba(253, 224, 71, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(sunX, sunY, 60, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.fillStyle = "#facc15";
        ctx.beginPath(); ctx.arc(sunX, sunY, 25, 0, Math.PI * 2); ctx.fill();
    }

    // Draw Moon (Night)
    if (isNightTime) {
        const moonX = 60; // Top Left
        const moonY = 80;
        const radius = 25;

        // Moon Glow
        const grd = ctx.createRadialGradient(moonX, moonY, radius, moonX, moonY, radius * 3);
        grd.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        grd.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(moonX, moonY, radius * 3, 0, Math.PI * 2); ctx.fill();

        // Draw Base Moon (White)
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath(); ctx.arc(moonX, moonY, radius, 0, Math.PI * 2); ctx.fill();

        // Draw Phase Shadow (Dark Circle Overlay)
        // FIX: Gunakan clipping & fill gelap agar tidak bolong transparan
        ctx.save();
        ctx.beginPath(); ctx.arc(moonX, moonY, radius, 0, Math.PI * 2); ctx.clip(); // Clip ke bentuk bulan

        // Hitung posisi bayangan
        // 0.0 (New) -> Bayangan di Tengah (Menutup)
        // 0.5 (Full) -> Bayangan Jauh (Terbuka)
        let shadowOffset;
        if (moonPhase < 0.5) shadowOffset = (moonPhase / 0.5) * 2.8 * radius; // Waxing
        else shadowOffset = ((1.0 - moonPhase) / 0.5) * 2.8 * radius; // Waning

        ctx.fillStyle = "rgba(15, 23, 42, 0.95)"; // Warna gelap menyerupai langit malam
        ctx.beginPath();
        ctx.arc(moonX + shadowOffset, moonY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Sky & Celestial Bodies
    drawSkyBackground();
    drawCelestialBodies();

    // 2. Draw Clouds (Awan)
    clouds.forEach(c => { c.update(); c.draw(); });

    // 3. Draw Particles (Hujan/Salju)
    particles = particles.filter(p => !p.isDead);
    for (const p of particles) { p.update(); p.draw(); }

    if (storm) {
        if (Math.random() > 0.995) storm.flashOpacity = 0.6;
        if (storm.flashOpacity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${storm.flashOpacity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            storm.flashOpacity -= 0.05;
        }
    }

    // REMOVED: Top Gradient Mask to allow clear view of sky/stars
}

function startWeatherEffect(type) {
    if(currentWxType === type) return;
    if(!canvas) return;
    
    stopWeatherEffect();
    currentWxType = type;
    clouds = []; // Reset awan

    // Pastikan canvas muncul di BELAKANG panel text (2147483640) tapi DI ATAS peta
    canvas.style.zIndex = "2147483639"; 
    canvas.style.pointerEvents = "none";

    if (type === 'rain') for (let i = 0; i < 150; i++) particles.push(new RainDrop());
    else if (type === 'snow') for (let i = 0; i < 50; i++) particles.push(new SnowFlake());
    else if (type === 'wind') for (let i = 0; i < 10; i++) particles.push(new WindLine());
    else if (type === 'storm') {
        for (let i = 0; i < 200; i++) particles.push(new RainDrop());
        storm = { flashOpacity: 0 };
    }
    
    // Tambahkan Awan jika cuaca mendukung (Berawan/Hujan/Salju)
    // Kode: 1,2,3 (Cloudy), 45,48 (Fog), 51+ (Rain/Snow)
    if ([1, 2, 3, 45, 48].includes(wxCode) || wxCode >= 51) {
        const cloudCount = (wxCode >= 51 || wxCode === 3) ? 8 : 5; // Lebih banyak jika hujan/mendung
        for(let i=0; i<cloudCount; i++) clouds.push(new Cloud());
    }

    if (!animationFrameId) animate();
}

function stopWeatherEffect() {
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
    particles = [];
    clouds = [];
    storm = null;
    currentWxType = null;
    if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(canvas) canvas.style.zIndex = "-1"; // Reset z-index saat stop
}

// --- WEATHER VARIABLES ---
let currentUserWeatherCode = null; // Simpan kode cuaca user
let currentUserWindSpeed = 0; // Simpan kecepatan angin user
let currentWeatherData = null; // Simpan data cuaca lengkap
let currentMarineData = null; // Simpan data laut (New)
let currentSolunarData = null; // Data Solunar untuk chart
let currentChartData = []; // Data untuk tooltip chart
let currentRouteLine = null; // Menyimpan garis rute
let currentRouteSteps = []; // Menyimpan langkah-langkah rute

// --- WEATHER FUNCTIONS ---

// Fitur: Cuaca Realtime di Lokasi User (Header)
function getUserWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            userLatlng = L.latLng(lat, lng);
            
            // Simpan lokasi ke browser agar refresh selanjutnya instan
            localStorage.setItem('lastLat', lat);
            localStorage.setItem('lastLng', lng);
            
            // Auto-center map ke lokasi user saat data lokasi didapat
            if(typeof map !== 'undefined') map.flyTo([lat, lng], 15);
            
            fetchUserWeather(lat, lng);
        }, (err) => {
            // Handle Error Lokasi (Penting agar user tahu kenapa tidak muncul)
            console.warn("Geo Error:", err);
            let msg = "Gagal Lokasi";
            if(err.code === 1) msg = "Izin Ditolak"; // User menolak izin
            if(err.code === 3) msg = "Timeout GPS";  // Sinyal lemah
            const infoEl = document.getElementById('user-weather-info');
            if(infoEl) infoEl.innerText = msg;
            
            // FALLBACK: Jika GPS ditolak/gagal, gunakan estimasi lokasi via IP Address
            // Ini solusi untuk pengguna baru yang menolak izin lokasi agar tidak stuck di Jakarta
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if(data.latitude && data.longitude) {
                        const lat = data.latitude;
                        const lng = data.longitude;
                        userLatlng = L.latLng(lat, lng);
                        
                        // Pindahkan peta ke lokasi IP (Zoom level 12 karena kurang akurat dibanding GPS)
                        if(typeof map !== 'undefined') map.flyTo([lat, lng], 12);
                        
                        // Simpan estimasi ini agar refresh selanjutnya tetap di area user
                        localStorage.setItem('lastLat', lat);
                        localStorage.setItem('lastLng', lng);
                        
                        fetchUserWeather(lat, lng);
                    }
                })
                .catch(() => console.log("Gagal deteksi lokasi IP"));
        }, { timeout: 10000, enableHighAccuracy: true });
    }
}

async function fetchUserWeather(lat, lng) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const data = await res.json();
        if(data.current_weather) {
            const temp = Math.round(data.current_weather.temperature);
            currentUserWeatherCode = data.current_weather.weathercode;
            currentUserWindSpeed = data.current_weather.windspeed;
            
            const infoEl = document.getElementById('user-weather-info');
            if(infoEl) {
                const lang = localStorage.getItem('appLang') || 'id';
                const locText = dynamicTranslations[lang].location;
                infoEl.innerText = `${locText}: ${temp}°C`;
            }
            
            // Cek Animasi Cuaca di lokasi user
            // Disabled: Jangan auto-start di peta
        }
    } catch(e) {
        const infoEl = document.getElementById('user-weather-info');
        if(infoEl) infoEl.innerText = "Cuaca Offline";
    }
}

function checkWeatherAnimation(code, windSpeed = 0, isDay = true) {
    // Update Globals for Background
    wxCode = code;
    wxIsDay = isDay;

    // Priority: Storm > Snow > Rain > Wind
    let type = 'clear'; // Default to clear (shows sky/sun/moon)
    if([95, 96, 99].includes(code)) type = 'storm';
    else if([71, 73, 75, 77, 85, 86].includes(code)) type = 'snow';
    else if([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) type = 'rain';
    else if(windSpeed > 20) type = 'wind';
    
    startWeatherEffect(type);
}

async function showLocationPanel(latlng) {
    const panel = document.getElementById('location-panel');
    
    const lang = localStorage.getItem('appLang') || 'id';
    const dt = dynamicTranslations[lang];

    // Reset UI
    document.getElementById('panel-address').innerText = "Mencari nama lokasi...";
    document.getElementById('wx-wave').innerText = "-- m";
    document.getElementById('wx-tide').innerText = "-- m";
    document.getElementById('wx-sst').innerText = "--°C";
    document.getElementById('wx-depth').innerText = "-- m";
    document.getElementById('panel-dist').innerHTML = '<span class="animate-pulse">Menghitung...</span>';
    document.getElementById('wx-sun').innerHTML = "--:--<br>--:--";
    document.getElementById('panel-coords').innerText = `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
    document.getElementById('wx-temp').innerText = "--°";
    document.getElementById('wx-wind-speed').innerText = "--";
    document.getElementById('wx-desc').innerText = dt.loading;
    document.getElementById('wx-score').innerText = "--%";
    document.getElementById('forecast-list').innerHTML = `<div class="text-center text-xs text-slate-500 py-4">${dt.loading}</div>`;
    
    // --- FIX: Tampilkan Latar Langit Dulu Sebelum Panel Muncul ---
    // Agar tidak terlihat peta yang "berantakan" di bawah panel transparan
    const sysHour = new Date().getHours();
    let initIsDay = (sysHour >= 6 && sysHour < 18);

    // Cek apakah data yang ada di memori relevan dengan lokasi yang dibuka
    if (currentWeatherData && currentWeatherData.latitude && 
        Math.abs(currentWeatherData.latitude - latlng.lat) < 0.01 && 
        Math.abs(currentWeatherData.longitude - latlng.lng) < 0.01 &&
        currentWeatherData.current_weather) {
        
        const wx = currentWeatherData.current_weather;
        checkWeatherAnimation(wx.weathercode, wx.windspeed, wx.is_day);
    } else {
        // Lokasi baru / belum ada data: Gunakan estimasi waktu sistem & cerah
        wxIsDay = initIsDay;
        wxCode = 0;
        startWeatherEffect('clear');
    }

    // Tampilkan Panel
    panel.classList.remove('translate-y-full');
    
    // FIX: Tampilan Penuh (Full Page) - Paksa Style via JS untuk override CSS class
    panel.style.setProperty('height', '100vh', 'important');
    panel.style.setProperty('width', '100vw', 'important');
    panel.style.setProperty('top', '0', 'important');
    panel.style.setProperty('left', '0', 'important');
    panel.style.setProperty('right', '0', 'important');
    panel.style.setProperty('bottom', '0', 'important');
    panel.style.setProperty('position', 'fixed', 'important');
    panel.style.setProperty('z-index', '2147483640', 'important'); // Max Z-Index (Dikurangi agar animasi cuaca bisa di atasnya)
    panel.style.setProperty('border-radius', '0', 'important');
    panel.style.setProperty('max-height', 'none', 'important');
    panel.style.setProperty('max-width', 'none', 'important'); // Override batasan lebar di laptop
    panel.style.setProperty('margin', '0', 'important');
    panel.style.setProperty('overflow-y', 'auto', 'important');
    panel.style.setProperty('background', 'transparent', 'important'); // Make transparent so canvas shows
    panel.style.setProperty('backdrop-filter', 'none', 'important'); // Hapus efek blur
    panel.style.setProperty('-webkit-backdrop-filter', 'none', 'important'); // Support Safari
    panel.style.setProperty('padding-bottom', '80px', 'important'); // Tambahan padding bawah agar konten paling bawah tidak mentok
    
    // FIX: Hapus lengkungan pada elemen anak (konten dalam panel)
    Array.from(panel.children).forEach(child => {
        child.style.setProperty('border-radius', '0', 'important');
        child.style.setProperty('max-height', 'none', 'important'); // CRITICAL: Hapus batasan tinggi wrapper
        child.style.setProperty('height', 'auto', 'important'); // Biarkan konten memanjang
        child.style.setProperty('min-height', '100%', 'important');
        child.classList.remove('rounded-t-[2rem]', 'rounded-t-3xl', 'rounded-2xl', 'rounded-3xl', 'overflow-hidden');
        
        // FIX: Paksa background transparan agar canvas langit terlihat
        child.style.setProperty('background', 'transparent', 'important');
        child.style.setProperty('background-color', 'transparent', 'important');
        child.style.setProperty('backdrop-filter', 'none', 'important'); // Hapus efek blur pada anak elemen
        child.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        child.style.setProperty('box-shadow', 'none', 'important');
    });

    // FIX: Style Kartu Grid (Angin, Ombak, dll) agar kontras di siang hari
    // Berikan latar belakang gelap transparan pada kartu agar teks putih terbaca jelas
    const detailCards = panel.querySelectorAll('[onclick*="showMetricInsight"]');
    detailCards.forEach(card => {
        card.style.setProperty('background-color', 'rgba(15, 23, 42, 0.4)', 'important'); 
        card.style.setProperty('backdrop-filter', 'blur(4px)', 'important');
        card.style.setProperty('-webkit-backdrop-filter', 'blur(4px)', 'important');
        card.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.1)', 'important');
        card.style.setProperty('border-radius', '1rem', 'important'); // Rounded-xl
        card.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 'important');
    });

    // --- CLEANUP: Hapus elemen navigasi ganda (Garis & Tombol X) ---
    // 1. Sembunyikan garis drag handle (biasanya div kecil di tengah atas)
    const handles = panel.querySelectorAll('div.w-12.h-1\\.5, div.w-16.h-1\\.5, .mx-auto.bg-slate-700, .mx-auto.bg-gray-300');
    handles.forEach(h => h.classList.add('hidden'));

    // 2. Sembunyikan tombol close bawaan (X)
    const oldCloseBtns = panel.querySelectorAll('button');
    oldCloseBtns.forEach(btn => {
        if(btn.id === 'panel-close-btn') return; // Skip tombol back kita
        
        // Cek Icon X atau Posisi Top Right
        if(btn.querySelector('[data-lucide="x"]') || btn.querySelector('[data-lucide="x-circle"]') || (btn.classList.contains('absolute') && btn.classList.contains('right-4'))) {
            btn.classList.add('hidden');
        }
    });

    // Tambahkan tombol Close/Kembali di pojok kiri atas agar user bisa keluar
    let closeBtn = document.getElementById('panel-close-btn');
    if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.id = 'panel-close-btn';
        closeBtn.className = 'fixed top-4 left-4 z-[2147483647] p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-colors';
        closeBtn.innerHTML = '<i data-lucide="chevron-left" class="w-6 h-6"></i>';
        closeBtn.onclick = closeLocationPanel;
        document.body.appendChild(closeBtn);
        lucide.createIcons();
    }
    closeBtn.classList.remove('hidden');
    
    // Pastikan tombol close dari detail view (grafik) tersembunyi agar tidak menumpuk
    const floatClose = document.getElementById('weather-floating-close');
    if(floatClose) floatClose.classList.add('hidden');
    
    panel.classList.remove('rounded-t-[2rem]', 'rounded-t-3xl', 'rounded-2xl', 'rounded-3xl', 'max-h-[85vh]', 'h-auto');

    // 1. HITUNG RUTE & WAKTU (OSRM Routing)
    if(userLatlng) {
        // Hapus garis rute lama jika ada
        if(currentRouteLine) map.removeLayer(currentRouteLine);
        
        const distance = userLatlng.distanceTo(latlng); // Jarak dalam meter

        // Jika jarak > 5000km, jangan hitung rute, tampilkan jarak lurus untuk mencegah error
        if (distance > 5000000) { 
            document.getElementById('panel-dist').innerHTML = `${(distance / 1000).toFixed(0)} km<br><span class="text-xs text-slate-400">(Jarak Lurus)</span>`;
            currentRouteSteps = []; // Kosongkan data rute sebelumnya
        } else {
            // Fetch data rute dari OSRM (Gratis)
            fetch(`https://router.project-osrm.org/route/v1/driving/${userLatlng.lng},${userLatlng.lat};${latlng.lng},${latlng.lat}?overview=full&geometries=geojson&steps=true`)
                .then(res => res.json())
                .then(data => {
                    if(data.routes && data.routes.length > 0) {
                        const route = data.routes[0];
                        const distKm = (route.distance / 1000).toFixed(1);
                        const durationSec = route.duration;
                        
                        // Format Waktu (Jam & Menit)
                        const hours = Math.floor(durationSec / 3600);
                        const minutes = Math.floor((durationSec % 3600) / 60);
                        let timeStr = `${minutes} mnt`;
                        if(hours > 0) timeStr = `${hours} jam ${minutes} mnt`;

                        document.getElementById('panel-dist').innerHTML = `${distKm} km<br><span class="text-xs text-slate-300">${timeStr}</span>`;

                        // Gambar Garis Rute di Peta
                        const routeCoords = route.geometry.coordinates.map(c => [c[1], c[0]]); // GeoJSON [lng,lat] -> Leaflet [lat,lng]
                        currentRouteLine = L.polyline(routeCoords, {color: '#3b82f6', weight: 5, opacity: 0.8, lineCap: 'round'}).addTo(map);
                        
                        // Simpan Steps
                        if(route.legs && route.legs.length > 0) {
                            currentRouteSteps = route.legs[0].steps;
                        }
                    } else {
                        document.getElementById('panel-dist').innerText = "Tidak ada jalan";
                    }
                })
                .catch(() => document.getElementById('panel-dist').innerText = "Gagal hitung");
        }
    }

    // 2. Reverse Geocoding Detail (Nominatim)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(res => res.json())
        .then(data => {
            const addr = data.address;
            
            // Susun alamat lengkap (Jalan, Desa, Kecamatan, Kota)
            let parts = [];
            if(addr.road) parts.push(addr.road);
            if(addr.village) parts.push(addr.village);
            else if(addr.hamlet) parts.push(addr.hamlet);
            if(addr.suburb) parts.push(addr.suburb); // Kecamatan biasanya di sini
            if(addr.city_district) parts.push(addr.city_district);
            if(addr.town) parts.push(addr.town);
            else if(addr.city) parts.push(addr.city);
            else if(addr.county) parts.push(addr.county); // Kabupaten

            // Gabungkan dan potong jika terlalu panjang
            let fullAddr = parts.join(', ');
            if(fullAddr.length > 45) fullAddr = fullAddr.substring(0, 45) + "...";
            
            document.getElementById('panel-address').innerText = fullAddr || "Lokasi Terpilih";
            // NEW: Also update the new header if it exists
            const headerLocation = document.getElementById('header-location');
            if (headerLocation) headerLocation.innerText = fullAddr || "Lokasi Terpilih";
        })
        .catch(() => document.getElementById('panel-address').innerText = "Lokasi Tidak Dikenal");

    // 2.5 Fetch Depth/Elevation (GEBCO via OpenTopoData)
    const depthEl = document.getElementById('wx-depth');
    if(depthEl) depthEl.innerHTML = '<span class="animate-pulse">...</span>';

    // Helper: Fetch dengan Timeout
    const fetchWithTimeout = (url, timeout = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(url, { signal: controller.signal })
            .then(res => { clearTimeout(id); return res.json(); });
    };

    // Fallback Terakhir: Open-Meteo (Hanya Darat)
    const fetchLandOnly = () => {
        fetch(`https://api.open-meteo.com/v1/elevation?latitude=${latlng.lat}&longitude=${latlng.lng}`)
            .then(res => res.json())
            .then(data => {
                if(data && data.elevation) {
                    const val = data.elevation[0];
                    // Jika 0 di laut, berarti data tidak ada
                    if(depthEl) depthEl.innerText = (val === 0) ? "0 m (?)" : (val < 0 ? `${Math.abs(Math.round(val))} m` : `+${Math.round(val)} m`);
                } else {
                    if(depthEl) depthEl.innerText = "N/A";
                }
            }).catch(() => { if(depthEl) depthEl.innerText = "--"; });
    };

    // Gunakan CORS Proxy untuk mengatasi error "Blocked by CORS policy"
    const corsProxy = "https://corsproxy.io/?";

    // Strategi Bertingkat: GEBCO (High Res) -> ETOPO1 (Backup) -> Open-Meteo (Land)
    // 1. Coba GEBCO 2020 (Paling Akurat untuk Laut) - Timeout 8 detik
    fetchWithTimeout(`${corsProxy}https://api.opentopodata.org/v1/gebco2020?locations=${latlng.lat},${latlng.lng}`, 8000)
        .then(data => {
            if(data && data.results && data.results.length > 0) {
                const elVal = data.results[0].elevation;
                if(depthEl) depthEl.innerText = (elVal < 0) ? `${Math.abs(Math.round(elVal))} m` : `+${Math.round(elVal)} m`;
            } else {
                throw new Error("GEBCO No Data");
            }
        })
        .catch(() => {
            console.warn("GEBCO timeout/fail, trying ETOPO1...");
            // 2. Coba ETOPO1 (Dataset alternatif yang juga punya data laut, biasanya lebih ringan)
            fetchWithTimeout(`${corsProxy}https://api.opentopodata.org/v1/etopo1?locations=${latlng.lat},${latlng.lng}`, 5000)
                .then(data => {
                    if(data && data.results && data.results.length > 0) {
                        const elVal = data.results[0].elevation;
                        if(depthEl) depthEl.innerText = (elVal < 0) ? `${Math.abs(Math.round(elVal))} m` : `+${Math.round(elVal)} m`;
                    } else {
                        throw new Error("ETOPO1 No Data");
                    }
                })
                .catch(() => {
                    // 3. Jika semua gagal, fallback ke Open-Meteo (Darat Only)
                    console.warn("All bathymetry sources failed, fallback to land data.");
                    fetchLandOnly();
                });
        });

    // 3. Fetch Weather & Marine Data (Open-Meteo API)
    try {
        // Mengambil Weather + Marine (Wave Height) + Sun (Sunrise/Sunset)
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latlng.lat}&longitude=${latlng.lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode,wave_height,windspeed_10m,winddirection_10m,relativehumidity_2m,surface_pressure,visibility,apparent_temperature,dewpoint_2m,cloudcover,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,sunrise,sunset,uv_index_max&minutely_15=precipitation&timezone=auto`);
        const data = await res.json();
        currentWeatherData = data; // Simpan data untuk detail view
        updateWeatherUI(data);
    } catch(err) {
        document.getElementById('wx-desc').innerText = "Offline";
        document.getElementById('wx-temp').innerText = "-";
        document.getElementById('forecast-list').innerHTML = '<div class="text-center text-red-400 text-xs py-4">Gagal memuat data. Cek koneksi internet.</div>';
    }

    // 4. Fetch Tide Data (Marine API)
    try {
        // Added sea_surface_temperature
        const res = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${latlng.lat}&longitude=${latlng.lng}&hourly=sea_level_height_msl,sea_surface_temperature&timezone=auto`);
        const data = await res.json();
        currentMarineData = data; // Store data for AI Insight

        // Perbaikan: Cek jika API mengembalikan error (misal: lokasi di darat) atau tidak ada data 'hourly'
        if (data.error || !data.hourly) {
            if(data.reason) console.warn("Marine API:", data.reason); // Log alasan error jika ada
            document.getElementById('wx-tide').innerText = "-- m";
            document.getElementById('wx-sst').innerText = "--°C";
        } else {
            const currentHour = new Date().getHours();

            // Handle Tide Data (Enhanced)
            const tideData = data.hourly.sea_level_height_msl;
            if (tideData) {
                const currentLevel = tideData[currentHour];
                const nextLevel = tideData[currentHour + 1] || currentLevel;
                
                // 1. Determine Trend (Naik/Turun)
                const isRising = nextLevel > currentLevel;
                const trendIcon = isRising ? 'trending-up' : 'trending-down';
                const trendColor = isRising ? 'text-cyan-300' : 'text-purple-300';

                // 2. Find Next High & Low (in next 24h)
                let nextHigh = null;
                let nextLow = null;
                
                for(let i = currentHour + 1; i < currentHour + 25; i++) {
                    if(i >= tideData.length - 1) break;
                    const prev = tideData[i-1];
                    const curr = tideData[i];
                    const next = tideData[i+1];
                    
                    if(!nextHigh && curr > prev && curr > next) nextHigh = { h: i % 24, v: curr };
                    if(!nextLow && curr < prev && curr < next) nextLow = { h: i % 24, v: curr };
                    if(nextHigh && nextLow) break;
                }

                // Format Output HTML
                const formatTime = (h) => `${h.toString().padStart(2, '0')}:00`;
                let details = '';
                if(nextHigh) details += `<span class="text-cyan-200">▲ ${formatTime(nextHigh.h)}</span>`;
                if(nextHigh && nextLow) details += `<span class="mx-1 opacity-30">|</span>`;
                if(nextLow) details += `<span class="text-purple-200">▼ ${formatTime(nextLow.h)}</span>`;

                document.getElementById('wx-tide').innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full -mt-1">
                        <div class="flex items-center gap-1 text-lg font-black text-white">
                            <i data-lucide="${trendIcon}" class="w-4 h-4 ${trendColor}"></i>
                            ${currentLevel.toFixed(1)}m
                        </div>
                        <div class="text-[9px] font-bold mt-0.5 flex items-center justify-center w-full">
                            ${details || '<span class="text-slate-500">Stabil</span>'}
                        </div>
                    </div>
                `;
                lucide.createIcons();
            } else {
                document.getElementById('wx-tide').innerText = "-- m";
            }

            // Handle Sea Surface Temperature (SST) Data
            const sst = data.hourly.sea_surface_temperature ? data.hourly.sea_surface_temperature[currentHour] : null;
            document.getElementById('wx-sst').innerText = (sst !== null && typeof sst === 'number') ? `${sst.toFixed(1)}°C` : '--°C';
        }
    } catch(e) { 
        console.log("Marine API data unavailable for this location.", e);
        document.getElementById('wx-tide').innerText = "-- m";
        document.getElementById('wx-sst').innerText = "--°C";
    }
}

function getMoonPhaseValue(date) {
    const lp = 2551443; 
    const now = new Date(date.getTime());
    const new_moon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    return phase / lp;
}

// Fungsi Update UI Cuaca (Dipisah agar bisa dipanggil saat ganti bahasa)
function updateWeatherUI(data) {
    if(!data || !data.current_weather) return;
    
    const lang = localStorage.getItem('appLang') || 'id';
    const dt = dynamicTranslations[lang];

    // --- NEW: Dynamic Background handled by Canvas now ---
    const panel = document.getElementById('location-panel');
    const code = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day;
    panel.style.setProperty('background', 'transparent', 'important'); // Ensure transparency
    panel.style.setProperty('backdrop-filter', 'none', 'important'); // Ensure no blur
    panel.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    
    // --- NEW: Create and Populate iPhone-style Header ---
    const panelContent = document.querySelector('#location-panel > div'); // Target the main content div of the panel
    if (panelContent) {
        let header = document.getElementById('new-weather-header');
        if (!header) {
            header = document.createElement('div');
            header.id = 'new-weather-header';
            header.className = 'flex flex-col items-center text-white pt-4 pb-6 px-4 text-center drop-shadow-md';
            header.innerHTML = `
                <div class="flex items-center justify-center gap-2 w-full mb-1">
                    <i data-lucide="map-pin" class="w-5 h-5 text-white/80 shrink-0"></i>
                    <h2 id="header-location" class="text-2xl font-bold tracking-tight text-center leading-tight line-clamp-2"></h2>
                </div>
                <p id="header-temp" class="text-7xl font-thin -my-1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"></p>
                <p id="header-desc" class="font-semibold"></p>
                <p id="header-minmax" class="text-sm mt-1"></p>
            `;
            // Insert header at the top of the panel content
            panelContent.prepend(header);

            // Hide the old elements that are now in the header.
            const oldAddress = document.getElementById('panel-address');
            const oldCoords = document.getElementById('panel-coords');
            const oldDist = document.getElementById('panel-dist');
            if (oldAddress) oldAddress.classList.add('hidden');
            if (oldCoords) oldCoords.classList.add('hidden');
            if (oldDist) oldDist.classList.add('hidden');
            
            // Hapus icon map-pin lama (yang warna biru/lainnya) yang mungkin tertinggal
            const panel = document.getElementById('location-panel');
            const strayPins = panel.querySelectorAll('[data-lucide="map-pin"], .lucide-map-pin');
            strayPins.forEach(pin => {
                if (!pin.closest('#new-weather-header')) pin.classList.add('hidden');
            });

            // Hide the now-redundant cards from the scroll view
            const tempCard = document.querySelector('[onclick="showMetricInsight(\'temp\')"]');
            const weatherCard = document.querySelector('[onclick="showMetricInsight(\'weather\')"]');
            if (tempCard) tempCard.classList.add('hidden');
            if (weatherCard) weatherCard.classList.add('hidden');
        }

        // Populate new header with data
        document.getElementById('header-temp').innerText = `${Math.round(data.current_weather.temperature)}°`;
        document.getElementById('header-minmax').innerText = `Tertinggi: ${Math.round(data.daily.temperature_2m_max[0])}° Terendah: ${Math.round(data.daily.temperature_2m_min[0])}°`;
    }

    const wx = data.current_weather;
    document.getElementById('wx-temp').innerText = `${Math.round(wx.temperature)}°`;
    document.getElementById('wx-wind-speed').innerText = wx.windspeed;
    
    // Rotasi panah angin
    const arrow = document.getElementById('wx-wind-dir');
    arrow.style.transform = `rotate(${wx.winddirection}deg)`;
    
    // Kode cuaca sederhana (WMO code)
    
    // Mapping Kode ke Deskripsi
    let desc = dt.weather[code] || dt.weather[0]; // Default Cerah
    // Mapping kasar jika kode tidak ada di list utama
    if(!dt.weather[code]) {
        if(code > 3) desc = dt.weather[2]; // Berawan
        if(code > 50) desc = dt.weather[61]; // Hujan
        if(code >= 70 && code <= 79) desc = dt.weather[71]; // Salju
        if(code >= 85 && code <= 86) desc = dt.weather[71]; // Salju
        if(code > 80) desc = dt.weather[95]; // Badai
    }

    document.getElementById('wx-desc').innerText = desc; // Keep old one for the card logic
    const headerDesc = document.getElementById('header-desc');
    if (headerDesc) headerDesc.innerText = desc;
    const headerLocation = document.getElementById('header-location');
    if(headerLocation) headerLocation.innerText = document.getElementById('panel-address').innerText;

    // Cek Animasi Cuaca untuk lokasi yang dipilih
    // Hanya jalankan animasi jika panel cuaca sedang terbuka
    if (!document.getElementById('location-panel').classList.contains('translate-y-full')) {
        moonPhase = getMoonPhaseValue(new Date()); // Update moon phase
        checkWeatherAnimation(code, wx.windspeed, isDay);
    }

    // Ambil data ombak jam sekarang
    if(data.hourly && data.hourly.wave_height) {
        const currentHour = new Date().getHours();
        const waveHeight = data.hourly.wave_height[currentHour] || 0;
        document.getElementById('wx-wave').innerText = `${waveHeight} m`;
    }
    
    // Data Matahari (Sunrise/Sunset)
    if(data.daily) {
        const sunrise = data.daily.sunrise[0].split('T')[1];
        const sunset = data.daily.sunset[0].split('T')[1];
        document.getElementById('wx-sun').innerHTML = `<div class="flex items-center justify-center gap-1"><i data-lucide="sunrise" class="w-3 h-3 text-yellow-300"></i> ${sunrise}</div><div class="flex items-center justify-center gap-1"><i data-lucide="sunset" class="w-3 h-3 text-orange-400"></i> ${sunset}</div>`;
    }

    // AI Score Calculation
    let score = 90; // Base score
    if(wx.windspeed > 15) score -= 10;
    if(wx.windspeed > 25) score -= 20;
    if(wx.temperature < 20 || wx.temperature > 32) score -= 10;
    if(wx.weathercode > 3) score -= 5;
    if(wx.weathercode > 50) score -= 20;
    if(wx.weathercode > 80) score -= 40;
    
    // Tampilkan Score
    document.getElementById('wx-score').innerText = `${Math.max(10, score)}%`;

    // --- NEW: HOURLY FORECAST (iPhone Style) ---
    // Cari atau buat container baru DI BAWAH weather-scroll agar fitur lama (AI Score dll) tetap ada
    let hourlySummaryContainer = document.getElementById('hourly-summary-container');
    let precipChartContainer = document.getElementById('precip-chart-container'); // Container Grafik Hujan
    let hourlyContainer = document.getElementById('hourly-forecast-container');
    const existingScroll = document.getElementById('weather-scroll');
    const dotsContainer = document.getElementById('scroll-dots');

    if (!hourlyContainer && existingScroll) {
        const referenceNode = dotsContainer || existingScroll;

        // --- MODIFIED: Buat Wrapper Card untuk Prakiraan 24 Jam ---
        const hourlyCard = document.createElement('div');
        hourlyCard.className = "mx-0 mb-8 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg overflow-hidden";
        
        if(referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(hourlyCard, referenceNode.nextSibling);
        }

        // 1. Summary Container (Header Kartu)
        hourlySummaryContainer = document.createElement('div');
        hourlySummaryContainer.id = 'hourly-summary-container';
        hourlySummaryContainer.className = "px-4 py-3 text-xs text-slate-200 leading-relaxed font-medium border-b border-white/5 bg-white/5";
        hourlyCard.appendChild(hourlySummaryContainer);

        // 2. Precip Chart Container (Grafik Hujan)
        precipChartContainer = document.createElement('div');
        precipChartContainer.id = 'precip-chart-container';
        precipChartContainer.className = "px-4 py-2 hidden border-b border-white/5";
        hourlyCard.appendChild(precipChartContainer);

        // 3. Hourly Forecast Container (List Scrollable)
        hourlyContainer = document.createElement('div');
        hourlyContainer.id = 'hourly-forecast-container';
        hourlyContainer.className = "flex items-stretch gap-x-4 overflow-x-auto no-scrollbar p-4";
        hourlyCard.appendChild(hourlyContainer);
    }

    if (hourlyContainer && data.hourly && data.hourly.time && data.daily) {
        
        // Helper: Cek Salju (Codes: 71, 73, 75, 77, 85, 86)
        const getPrecipType = (c) => [71, 73, 75, 77, 85, 86].includes(c) ? "Salju" : "Hujan";
        
        // --- NEW: PRECIPITATION CHART LOGIC (Next Hour) ---
        if (data.minutely_15 && data.minutely_15.precipitation && precipChartContainer) {
            const pTimes = data.minutely_15.time;
            const pVals = data.minutely_15.precipitation;
            const now = new Date();
            
            // Cari index waktu terdekat (mundur 15 menit agar mencakup interval saat ini)
            let startIdx = pTimes.findIndex(t => new Date(t) > new Date(now.getTime() - 15*60000));
            if (startIdx === -1) startIdx = 0;

            // Ambil data untuk 2 jam ke depan (8 slot x 15 menit)
            const nextSlots = [];
            let hasRain = false;
            for(let i=0; i<8; i++) { 
                if(startIdx + i < pVals.length) {
                    const val = pVals[startIdx + i];
                    if(val > 0) hasRain = true;
                    nextSlots.push({ t: pTimes[startIdx + i], v: val });
                }
            }

            if (hasRain) {
                precipChartContainer.classList.remove('hidden');
                
                // Generate Text Status
                const pTypeChart = getPrecipType(wx.weathercode);
                let statusText = `${pTypeChart} ringan untuk beberapa saat.`;
                const currentVal = nextSlots[0].v;
                
                if (currentVal > 0) {
                    // Sedang Hujan -> Cari kapan berhenti
                    const stopIdx = nextSlots.findIndex(s => s.v === 0);
                    if (stopIdx !== -1) {
                        const stopTime = new Date(nextSlots[stopIdx].t);
                        const diffMin = Math.max(1, Math.ceil((stopTime - now) / 60000));
                        statusText = `${pTypeChart} berhenti dalam ${diffMin} menit.`;
                    } else {
                        statusText = `${pTypeChart} berlanjut untuk 2 jam ke depan.`;
                    }
                } else {
                    // Tidak Hujan -> Cari kapan mulai
                    const startRainIdx = nextSlots.findIndex(s => s.v > 0);
                    if (startRainIdx !== -1) {
                        const startTime = new Date(nextSlots[startRainIdx].t);
                        const diffMin = Math.max(1, Math.ceil((startTime - now) / 60000));
                        statusText = `${pTypeChart} dimulai dalam ${diffMin} menit.`;
                    }
                }

                // Generate Chart HTML
                const maxP = Math.max(...nextSlots.map(s => s.v), 1); // Scaling
                let barsHtml = nextSlots.map(s => {
                    const heightPct = Math.min((s.v / maxP) * 100, 100);
                    const timeLabel = s.t.slice(11, 16); // HH:MM
                    const barColor = s.v > 0 ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-slate-700/30';
                    return `<div class="flex flex-col items-center justify-end h-20 w-full gap-1"><div class="w-1.5 rounded-full ${barColor} transition-all duration-500" style="height: ${Math.max(heightPct, 5)}%"></div><span class="text-[9px] text-slate-400 font-mono">${timeLabel}</span></div>`;
                }).join('');

                precipChartContainer.innerHTML = `<div class="bg-slate-800/30 rounded-lg border border-white/5 p-3 backdrop-blur-sm"><p class="text-xs font-bold text-white mb-2 flex items-center gap-2"><i data-lucide="cloud-rain" class="w-4 h-4 text-blue-400"></i> ${statusText}</p><div class="flex items-end justify-between gap-1 h-16 border-b border-white/5 pb-1">${barsHtml}</div></div>`;
            } else {
                precipChartContainer.classList.add('hidden');
            }
        }

        hourlyContainer.innerHTML = ''; // Clear only the new container

        // NEW: Populate Summary Text
        if (hourlySummaryContainer) {
            const currentCode = wx.weathercode;
            
            // Smart Summary Logic
            let smartText = "";
            const hourlyCode = data.hourly.weathercode;
            const nowIdx = new Date().getHours();
            
            // NEW: Use Minutely Data for better precision
            let minutelyUsed = false;
            if (data.minutely_15 && data.minutely_15.precipitation) {
                const pVals = data.minutely_15.precipitation;
                const pTimes = data.minutely_15.time;
                const now = new Date();
                let startIdx = pTimes.findIndex(t => new Date(t) > new Date(now.getTime() - 15*60000));
                if (startIdx === -1) startIdx = 0;
                
                const currentP = pVals[startIdx] || 0;
                const pType = getPrecipType(currentCode);

                if (currentP > 0) { // Sedang Hujan
                    let stopIdx = -1;
                    for(let i=startIdx; i<pVals.length; i++) { if(pVals[i] === 0) { stopIdx = i; break; } }
                    if(stopIdx !== -1) {
                        const diffMin = Math.ceil((new Date(pTimes[stopIdx]) - now) / 60000);
                        if(diffMin <= 120) { smartText = `${pType} berhenti dalam ${diffMin} menit.`; minutelyUsed = true; }
                    }
                } else { // Tidak Hujan
                    let startRainIdx = -1;
                    for(let i=startIdx; i<pVals.length; i++) { if(pVals[i] > 0) { startRainIdx = i; break; } }
                    if(startRainIdx !== -1) {
                        const diffMin = Math.ceil((new Date(pTimes[startRainIdx]) - now) / 60000);
                        if(diffMin <= 120) { smartText = `${pType} dimulai dalam ${diffMin} menit.`; minutelyUsed = true; }
                    }
                }
            }

            if (!minutelyUsed) {
                if (currentCode >= 51) { // Sedang Hujan/Salju
                    const pType = getPrecipType(currentCode);
                    let stopIdx = -1;
                    for(let i=nowIdx; i<nowIdx+12; i++) { if(hourlyCode[i] < 51) { stopIdx = i; break; } }
                    if(stopIdx !== -1) smartText = `${pType} diperkirakan reda sekitar jam ${stopIdx}:00.`;
                    else smartText = `${pType} diperkirakan berlanjut hingga malam.`;
                } else { // Sedang Cerah/Berawan
                    let startIdx = -1;
                    let nextType = "Hujan";
                    for(let i=nowIdx; i<nowIdx+12; i++) { if(hourlyCode[i] >= 51) { startIdx = i; nextType = getPrecipType(hourlyCode[i]); break; } }
                    if(startIdx !== -1) smartText = `Cerah saat ini. ${nextType} diperkirakan mulai jam ${startIdx}:00.`;
                    else smartText = `Cuaca cenderung stabil untuk 12 jam ke depan.`;
                }
            }
            
            const maxWind = data.daily.windspeed_10m_max[0];
            let summaryText = `${smartText} Angin hingga <strong>${maxWind} km/j</strong>.`;
            hourlySummaryContainer.innerHTML = `<p>${summaryText}</p>`;
        }

        const now = new Date();
        const endOfForecast = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const currentHour = now.getHours();

        // 1. Buat daftar semua acara (per jam, matahari terbit, terbenam)
        let timelineEvents = [];

        // Tambahkan data prakiraan per jam
        for (let i = 0; i < 24; i++) {
            const hourIndex = currentHour + i;
            if (hourIndex >= data.hourly.time.length) break;

            const date = new Date(data.hourly.time[hourIndex]);
            timelineEvents.push({
                type: 'hourly',
                date: date,
                temp: Math.round(data.hourly.temperature_2m[hourIndex]),
                code: data.hourly.weathercode[hourIndex],
                pop: data.hourly.precipitation_probability[hourIndex], // Chance of Rain
                isNow: i === 0
            });
        }

        // Tambahkan acara matahari terbit/terbenam untuk hari ini dan besok
        const todaySunrise = new Date(data.daily.sunrise[0]);
        const todaySunset = new Date(data.daily.sunset[0]);
        if (data.daily.sunrise[1]) {
            const tomorrowSunrise = new Date(data.daily.sunrise[1]);
            if (tomorrowSunrise > now && tomorrowSunrise < endOfForecast) {
                timelineEvents.push({ type: 'sunrise', date: tomorrowSunrise });
            }
        }
        if (todaySunrise > now && todaySunrise < endOfForecast) {
            timelineEvents.push({ type: 'sunrise', date: todaySunrise });
        }
        if (todaySunset > now && todaySunset < endOfForecast) {
            timelineEvents.push({ type: 'sunset', date: todaySunset });
        }

        // 2. Urutkan semua acara berdasarkan waktu
        timelineEvents.sort((a, b) => a.date - b.date);

        // 3. Render acara yang sudah diurutkan
        const sunriseLabel = { id: 'Terbit', en: 'Sunrise', jp: '日の出' }[lang];
        const sunsetLabel = { id: 'Terbenam', en: 'Sunset', jp: '日没' }[lang];

        timelineEvents.forEach(event => {
            const item = document.createElement('div');
            const hour = event.date.getHours();
            const minutes = event.date.getMinutes().toString().padStart(2, '0');

            if (event.type === 'hourly') {
                // Logika ikon dinamis siang/malam
                const isNight = hour >= 19 || hour < 6;
                let icon = getWeatherIcon(event.code);
                let iconColorClass = 'text-white';

                if (isNight) {
                    if (icon === 'sun') icon = 'moon';
                    if (icon === 'cloud-sun') icon = 'cloud-moon';
                } else { // Day
                    if (icon === 'sun') iconColorClass = 'text-yellow-300';
                }

                item.className = "flex flex-col items-center justify-between py-2 shrink-0 w-14 border-b-2 border-transparent hover:bg-white/5 rounded-lg transition-colors";
                const timeText = event.isNow ? (lang === 'en' ? 'Now' : 'Kini') : `${hour.toString().padStart(2, '0')}`;
                const textWeight = event.isNow ? 'font-bold text-white' : 'font-medium text-slate-300';
                if (event.isNow) item.classList.replace('border-transparent', 'border-blue-500');
                
                // Add Rain Probability if significant
                const popHtml = (event.pop >= 30) ? `<div class="text-[9px] font-bold text-blue-200 flex items-center justify-center gap-0.5 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="text-blue-400"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>${event.pop}%</div>` : '';
                
                item.innerHTML = `<div class="text-xs ${textWeight}">${timeText}</div><i data-lucide="${icon}" class="w-6 h-6 ${iconColorClass} drop-shadow-lg my-1"></i><div class="text-lg font-bold text-white leading-none">${event.temp}°</div>${popHtml}`;
            } else { // Sunrise or Sunset
                const isSunrise = event.type === 'sunrise';
                item.className = "flex flex-col items-center justify-end py-2 shrink-0 w-20 text-center"; // Lebih lebar untuk teks
                item.innerHTML = `<div class="text-xs font-medium ${isSunrise ? 'text-yellow-300' : 'text-orange-400'} mb-2">${isSunrise ? sunriseLabel : sunsetLabel}</div><i data-lucide="${isSunrise ? 'sunrise' : 'sunset'}" class="w-7 h-7 ${isSunrise ? 'text-yellow-400' : 'text-orange-400'} drop-shadow-lg mb-2"></i><div class="text-lg font-bold text-white">${hour}:${minutes}</div>`;
            }
            hourlyContainer.appendChild(item);
        });

        lucide.createIcons();
    }

    // --- FITUR BARU: 7-DAY FORECAST & FISHING RATING ---
    if(data.daily) {
        // Hapus Judul Lama (External) sesuai permintaan
        const oldTitle = document.querySelector('[data-i18n="forecast_title"]');
        if(oldTitle) {
            oldTitle.style.display = 'none';
            if(oldTitle.parentElement) oldTitle.parentElement.style.display = 'none'; // Sembunyikan container judul lama
        }

        const list = document.getElementById('forecast-list');
        list.className = "mx-0 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 p-2 shadow-lg"; // Style Kartu 7 Hari (Lebar Penuh)
        list.innerHTML = ''; // Clear

        // --- RESTORED: Judul Header Kartu 7 Hari (Internal) ---
        const titleDiv = document.createElement('div');
        titleDiv.className = "px-2 py-2 mb-2 flex items-center gap-2 border-b border-white/5";
        const titleText = lang === 'en' ? '7-Day Forecast' : (lang === 'jp' ? '7日間予報' : 'Prakiraan 7 Hari');
        titleDiv.innerHTML = `<i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i> <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">${titleText}</span>`;
        list.appendChild(titleDiv);

        // Pre-calculate overall min/max temps for consistent bar scaling (iPhone style)
        const allMinTemps = data.daily.temperature_2m_min.slice(0, 7);
        const allMaxTemps = data.daily.temperature_2m_max.slice(0, 7);
        const overallMinTemp = Math.min(...allMinTemps);
        const overallMaxTemp = Math.max(...allMaxTemps);
        const totalRange = (overallMaxTemp - overallMinTemp) || 1; // Avoid division by zero
        
        for(let i=0; i<7; i++) {
            const date = new Date(data.daily.time[i]);
            const dayName = i === 0 ? (lang === 'en' ? 'Today' : (lang === 'jp' ? '今日' : 'Hari Ini')) : dt.days[date.getDay()];
            const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
            const minTemp = Math.round(data.daily.temperature_2m_min[i]);
            const code = data.daily.weathercode[i];
            const rainSum = data.daily.precipitation_sum[i];

            // Calculate bar dimensions based on the overall range
            const leftOffset = ((minTemp - overallMinTemp) / totalRange) * 100;
            const barWidth = ((maxTemp - minTemp) / totalRange) * 100;

            // Dynamic Icon Color
            let iconColor = "text-white";
            if(code <= 1) iconColor = "text-yellow-400";
            else if(code >= 51) iconColor = "text-blue-400";
            else if(code === 3) iconColor = "text-slate-400";

            const item = document.createElement('div');
            // Improved Aesthetics: Card-like row, better spacing, hover effect
            item.className = "flex items-center justify-between py-3 px-3 mx-2 mb-1 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 group border border-transparent hover:border-white/5";
            item.onclick = () => openDetailModal(i); // Tambahkan event klik

            item.innerHTML = `
                <div class="w-[22%] text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">${dayName}</div>
                <div class="w-[18%] flex flex-col items-center justify-center">
                    <i data-lucide="${getWeatherIcon(code)}" class="w-6 h-6 ${iconColor} drop-shadow-md transition-transform group-hover:scale-110"></i>
                    ${rainSum > 0.5 ? `<span class="text-[9px] font-bold text-blue-300 mt-0.5">${Math.round(rainSum)}mm</span>` : ''}
                </div>
                <div class="w-[60%] flex items-center gap-3 pl-1">
                    <span class="text-slate-400 text-xs font-medium w-6 text-right">${minTemp}°</span>
                    <div class="flex-1 h-2 bg-slate-700/50 rounded-full relative overflow-hidden shadow-inner ring-1 ring-white/5">
                        <div class="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-yellow-300 to-red-400 opacity-90 shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                             style="left: ${leftOffset.toFixed(2)}%; width: ${barWidth.toFixed(2)}%;">
                        </div>
                    </div>
                    <span class="text-white text-xs font-bold w-6 text-left">${maxTemp}°</span>
                </div>
            `;
            list.appendChild(item);
        }
        lucide.createIcons();
    }
}

// --- INTERNAL ROUTE MODAL FUNCTIONS ---
function openRouteModal() {
    if(!currentRouteSteps || currentRouteSteps.length === 0) {
        // Jika rute belum ada (misal belum klik peta), coba hitung atau alert
        if(tempLatlng && userLatlng) {
            alert("Sedang menghitung rute... Silakan tunggu sebentar.");
            return;
        }
        alert("Rute tidak tersedia. Pastikan lokasi Anda terdeteksi.");
        return;
    }
    
    const list = document.getElementById('route-steps-list');
    list.innerHTML = '';
    
    currentRouteSteps.forEach((step, index) => {
        const dist = step.distance < 1000 ? `${Math.round(step.distance)} m` : `${(step.distance/1000).toFixed(1)} km`;
        const instr = step.maneuver.type; 
        const mod = step.maneuver.modifier; 
        const name = step.name || "Jalan";
        
        // Mapping Icon & Text Sederhana
        let icon = "arrow-up";
        let actionText = "Lurus";
        
        if(mod && mod.includes('left')) { icon = "corner-up-left"; actionText = "Belok Kiri"; }
        else if(mod && mod.includes('right')) { icon = "corner-up-right"; actionText = "Belok Kanan"; }
        else if(mod === 'uturn') { icon = "refresh-ccw"; actionText = "Putar Balik"; }
        else if(instr === 'arrive') { icon = "map-pin"; actionText = "Tiba di Tujuan"; }
        else if(instr === 'depart') { icon = "navigation"; actionText = "Mulai Perjalanan"; }
        
        const item = document.createElement('div');
        // Layout Timeline Modern
        item.className = "relative pl-2 py-1 flex items-start gap-3 group";
        
        // Garis vertikal (Timeline)
        const isLast = index === currentRouteSteps.length - 1;
        const line = !isLast ? `<div class="absolute top-10 bottom-0 w-0.5 bg-slate-700 group-hover:bg-blue-500/50 transition-colors" style="left: 19px;"></div>` : '';

        // Warna Icon Dinamis
        let iconBg = "bg-slate-800 border-slate-700";
        let iconColor = "text-slate-400";
        
        if(instr === 'depart') { iconBg = "bg-blue-500/20 border-blue-500/50"; iconColor = "text-blue-400"; }
        else if(instr === 'arrive') { iconBg = "bg-emerald-500/20 border-emerald-500/50"; iconColor = "text-emerald-400"; }
        else if(mod && (mod.includes('left') || mod.includes('right'))) { iconColor = "text-white"; }

        item.innerHTML = `
            ${line}
            <div class="z-10 mt-1 ${iconBg} p-2 rounded-full border shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-blue-500/20">
                <i data-lucide="${icon}" class="w-4 h-4 ${iconColor}"></i>
            </div>
            <div class="flex-1 bg-slate-800/30 p-3 rounded-xl border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all">
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-white text-sm leading-tight">${actionText}</p>
                    <span class="text-[10px] font-mono text-slate-400 bg-black/20 px-1.5 py-0.5 rounded border border-white/5">${dist}</span>
                </div>
                <p class="text-xs text-slate-400 line-clamp-2">${name}</p>
            </div>
        `;
        list.appendChild(item);
    });
    
    document.getElementById('routeModal').classList.remove('translate-y-full');
    lucide.createIcons();
}

function closeRouteModal() {
    document.getElementById('routeModal').classList.add('translate-y-full');
}

function getWeatherIcon(code) {
    if (code === 0) return 'sun'; // Cerah
    if (code >= 1 && code <= 2) return 'cloud-sun'; // Sedikit Berawan
    if (code === 3) return 'cloud'; // Berawan
    if (code >= 45 && code <= 48) return 'cloud-fog'; // Kabut
    if (code >= 51 && code <= 67) return 'cloud-drizzle'; // Hujan Ringan
    if (code >= 71 && code <= 77) return 'cloud-snow'; // Salju
    if (code >= 80 && code <= 82) return 'cloud-rain'; // Hujan Deras
    if (code >= 95) return 'cloud-lightning'; // Badai
    return 'sun'; // Default
}

function closeLocationPanel() {
    document.getElementById('location-panel').classList.add('translate-y-full');
    const closeBtn = document.getElementById('panel-close-btn');
    if(closeBtn) closeBtn.classList.add('hidden');
    
    stopWeatherEffect(); // Matikan total animasi saat panel ditutup
}

// --- FITUR DETAIL CUACA (Chart & Hourly) ---
let currentChartType = 'temp';
let currentDayIndex = 0;
const solunarTranslations = { id: "Aktivitas Ikan", en: "Fish Activity", jp: "魚の活性" };

function openDetailModal(dayIndex) {
    // closeLocationPanel(); // JANGAN tutup panel utama agar bisa kembali
    
    // Sembunyikan tombol back panel utama sementara agar tidak tumpang tindih
    const mainBackBtn = document.getElementById('panel-close-btn');
    if(mainBackBtn) mainBackBtn.classList.add('hidden');

    if(!currentWeatherData || !currentWeatherData.hourly) return;
    
    currentDayIndex = dayIndex;
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dateStr = currentWeatherData.daily.time[dayIndex];
    // Penting: Set ke tengah hari agar kalkulasi 1 hari penuh akurat
    const dateObj = new Date(dateStr + 'T12:00:00');
    
    document.getElementById('tab-solunar').innerText = solunarTranslations[localStorage.getItem('appLang') || 'id'];

    document.getElementById('detail-title').innerText = days[dateObj.getDay()];
    document.getElementById('detail-date').innerText = dateStr;
    
    // Update Advanced Details (Ambil data jam 12 siang sebagai representasi)
    const noonIdx = (dayIndex * 24) + 12;
    const humidity = currentWeatherData.hourly.relativehumidity_2m[noonIdx] || '-';
    const pressure = currentWeatherData.hourly.surface_pressure[noonIdx] || '-';
    const uv = currentWeatherData.daily.uv_index_max[dayIndex] || '-';
    
    document.getElementById('det-humidity').innerText = `${humidity}%`;
    document.getElementById('det-pressure').innerText = `${pressure} hPa`;
    document.getElementById('det-uv').innerText = uv;
    
    // --- NEW: Extra Weather Details ---
    const feelsLike = currentWeatherData.hourly.apparent_temperature ? Math.round(currentWeatherData.hourly.apparent_temperature[noonIdx]) : '-';
    const dewPoint = currentWeatherData.hourly.dewpoint_2m ? Math.round(currentWeatherData.hourly.dewpoint_2m[noonIdx]) : '-';
    const cloudCover = currentWeatherData.hourly.cloudcover ? currentWeatherData.hourly.cloudcover[noonIdx] : '-';
    const windGust = currentWeatherData.hourly.windgusts_10m ? currentWeatherData.hourly.windgusts_10m[noonIdx] : '-';
    const visibility = currentWeatherData.hourly.visibility ? (currentWeatherData.hourly.visibility[noonIdx] / 1000).toFixed(1) : '-';

    const extraDetailsHtml = `
        <div class="grid grid-cols-3 gap-2 mb-4 mt-2">
            <div class="bg-slate-800/50 p-2 rounded-xl border border-white/5 text-center">
                <p class="text-[9px] text-slate-400 uppercase font-bold">Terasa Spt</p>
                <p class="text-sm font-bold text-white">${feelsLike}°</p>
            </div>
            <div class="bg-slate-800/50 p-2 rounded-xl border border-white/5 text-center">
                <p class="text-[9px] text-slate-400 uppercase font-bold">Awan</p>
                <p class="text-sm font-bold text-white">${cloudCover}%</p>
            </div>
            <div class="bg-slate-800/50 p-2 rounded-xl border border-white/5 text-center">
                <p class="text-[9px] text-slate-400 uppercase font-bold">Gust Angin</p>
                <p class="text-sm font-bold text-white">${windGust} <span class="text-[9px]">km/h</span></p>
            </div>
            <div class="bg-slate-800/50 p-2 rounded-xl border border-white/5 text-center">
                <p class="text-[9px] text-slate-400 uppercase font-bold">Titik Embun</p>
                <p class="text-sm font-bold text-white">${dewPoint}°</p>
            </div>
            <div class="bg-slate-800/50 p-2 rounded-xl border border-white/5 text-center">
                <p class="text-[9px] text-slate-400 uppercase font-bold">Visibilitas</p>
                <p class="text-sm font-bold text-white">${visibility} <span class="text-[9px]">km</span></p>
            </div>
        </div>
    `;

    // Render Summary Text
    const dailyCode = currentWeatherData.daily.weathercode[dayIndex];
    const isSnow = [71, 73, 75, 77, 85, 86].includes(dailyCode);
    const rainSum = currentWeatherData.daily.precipitation_sum[dayIndex];
    
    let summary = extraDetailsHtml + `<div class="flex items-center gap-2"><i data-lucide="info" class="text-blue-400 w-4 h-4"></i> <p>Total presipitasi: ${rainSum}mm. `;
    if(rainSum > 5) summary += "Siapkan jas hujan.";
    else summary += "Cuaca relatif kering.";
    summary += "</p></div>";
    
    // --- NEW: Astro Visualization (Sun Position) ---
    const nowTime = new Date().getTime();
    const riseTime = new Date(currentWeatherData.daily.sunrise[dayIndex]).getTime();
    const setTime = new Date(currentWeatherData.daily.sunset[dayIndex]).getTime();
    let sunPct = -1; // Default hidden
    
    // Only show for Today
    if (new Date().toDateString() === dateObj.toDateString()) {
        if(nowTime > riseTime && nowTime < setTime) sunPct = (nowTime - riseTime) / (setTime - riseTime);
        else if (nowTime >= setTime) sunPct = 1;
        else sunPct = 0;
    }
    
    if(sunPct >= 0) {
        const sunRotate = (sunPct * 180) - 90; // -90 (left) to 90 (right)
        summary += `
            <div class="relative h-20 w-full overflow-hidden mt-6 mb-2 bg-slate-800/30 rounded-xl border border-white/5 pt-4">
                <p class="absolute top-2 left-0 w-full text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">Posisi Matahari</p>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-dashed border-yellow-500/20 rounded-t-full"></div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24">
                    <div class="w-full h-full origin-bottom transition-transform duration-1000" style="transform: rotate(${sunRotate}deg)">
                        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_25px_rgba(250,204,21,0.6)] flex items-center justify-center">
                            <div class="w-2 h-2 bg-white rounded-full opacity-50"></div>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-1 w-full flex justify-between px-6 text-[9px] font-mono text-slate-500">
                    <span>${currentWeatherData.daily.sunrise[dayIndex].split('T')[1]}</span>
                    <span>${currentWeatherData.daily.sunset[dayIndex].split('T')[1]}</span>
                </div>
            </div>
        `;
    }

    document.getElementById('rain-summary').innerHTML = summary;

    // --- NEW: Calculate Solunar Data ---
    const lat = currentWeatherData.latitude;
    const lng = currentWeatherData.longitude;
    
    let sunTimes = { sunrise: null, sunset: null };
    let moonTimes = { rise: null, set: null };
    let moonTransit = null;
    let moonNadir = null;
    
    if (typeof SunCalc !== 'undefined') {
        sunTimes = SunCalc.getTimes(dateObj, lat, lng);
        moonTimes = SunCalc.getMoonTimes(dateObj, lat, lng);
        
        // Find moon transit (peak) and nadir (low)
        let highestAlt = -2; // Start from -2 to ensure any value is higher
        
        for(let i=0; i<24; i++) {
            const hourDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), i, 0, 0);
            const moonPos = SunCalc.getMoonPosition(hourDate, lat, lng);
            if(moonPos.altitude > highestAlt) {
                highestAlt = moonPos.altitude;
                moonTransit = hourDate;
            }
        }
        // Nadir is approx 12.4 hours after transit
        if(moonTransit) moonNadir = new Date(moonTransit.getTime() + 12.4 * 3600 * 1000);
    }

    currentSolunarData = { sunTimes, moonTimes, moonTransit, moonNadir };

    // --- AI ANALYSIS & SUMMARY (New Logic) ---
    const warningsContainer = document.getElementById('ai-warnings-container');
    const recommendationsContainer = document.getElementById('ai-recommendations-container');

    if(warningsContainer && recommendationsContainer) {
        // Reset content
        warningsContainer.innerHTML = '<p class="text-xs text-slate-500 animate-pulse">Menganalisa potensi bahaya...</p>';
        recommendationsContainer.innerHTML = '<p class="text-xs text-slate-500 animate-pulse">Mencari waktu terbaik...</p>';

        let warningsHtml = '';
        let recommendationsHtml = '';
        let aiWarnings = [];
        
        // 1. Analisa Bahaya (Warnings)
        const dCode = currentWeatherData.daily.weathercode[dayIndex];
        const dWind = currentWeatherData.daily.windspeed_10m_max[dayIndex];
        const dRain = currentWeatherData.daily.precipitation_sum[dayIndex];
        const dWave = currentWeatherData.hourly.wave_height ? Math.max(...currentWeatherData.hourly.wave_height.slice(dayIndex*24, (dayIndex+1)*24)) : 0;

        if([95, 96, 99].includes(dCode)) aiWarnings.push({ icon: 'cloud-lightning', text: "<b>BAHAYA PETIR:</b> Sebaiknya jangan melaut di area terbuka." });
        if(dWind > 25) aiWarnings.push({ icon: 'wind', text: "<b>ANGIN KENCANG:</b> Waspada gelombang tinggi, bahaya untuk perahu kecil." });
        if(dWave > 2.0) aiWarnings.push({ icon: 'waves', text: `<b>OMBAK TINGGI:</b> Gelombang mencapai ${dWave.toFixed(1)}m. Sangat berbahaya.` });
        if(dRain > 15) aiWarnings.push({ icon: 'cloud-rain', text: "<b>HUJAN LEBAT:</b> Jarak pandang terbatas & licin." });

        // 2. Cari Waktu Terbaik (Golden Hours)
        const events = [
            { t: sunTimes.sunrise, label: "Pagi (Sunrise)" },
            { t: sunTimes.sunset, label: "Sore (Sunset)" },
            { t: moonTransit, label: "Puncak Bulan" },
            { t: moonNadir, label: "Lembah Bulan" }
        ];
        
        let goodHours = [];
        const hourly = currentWeatherData.hourly;
        const startIdx = dayIndex * 24;

        events.forEach(ev => { if(ev.t && !isNaN(ev.t)) {
            const h = ev.t.getHours();
            const idx = startIdx + h;
            if(idx < hourly.time.length) {
                const wSpeed = hourly.windspeed_10m[idx];
                const wRain = hourly.precipitation_probability[idx];
                const wCode = hourly.weathercode[idx];
                // Syarat: Angin < 20, Hujan < 50%, Tidak Badai
                if(wSpeed < 20 && wRain < 50 && wCode < 90) {
                    goodHours.push(`<b>Jam ${h}:00</b> (${ev.label})`);
                }
            }
        }});

        // 3. Susun HTML
        // Warnings
        if(aiWarnings.length > 0) {
            warningsHtml = aiWarnings.map(w => `
                <div class="flex items-start gap-3 bg-red-900/30 p-3 rounded-lg border border-red-500/30 text-red-300 text-xs">
                    <i data-lucide="${w.icon}" class="w-5 h-5 text-red-400 shrink-0 mt-0.5"></i>
                    <p class="leading-relaxed">${w.text}</p>
                </div>
            `).join('');
        } else {
            warningsHtml = `
                <div class="flex items-start gap-3 bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 text-emerald-300 text-xs">
                    <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
                    <p class="leading-relaxed"><b>Kondisi Aman:</b> Cuaca relatif bersahabat untuk memancing hari ini.</p>
                </div>
            `;
        }

        // Recommendations
        if(goodHours.length > 0) {
            let unique = [...new Set(goodHours)];
            recommendationsHtml += `
                <div class="flex items-start gap-3 bg-blue-900/30 p-3 rounded-lg border border-blue-500/30 text-blue-200 text-xs">
                    <i data-lucide="clock" class="w-5 h-5 text-blue-300 shrink-0 mt-0.5"></i>
                    <div>
                        <p class="font-bold text-blue-200 mb-1">Waktu Potensial</p>
                        <p class="leading-relaxed">Coba mancing pada ${unique.join(", ")}. Ikan diprediksi lebih aktif & cuaca mendukung.</p>
                    </div>
                </div>
            `;
        } else {
            recommendationsHtml += `
                <div class="flex items-start gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 text-slate-400 text-xs">
                    <i data-lucide="moon-star" class="w-5 h-5 text-slate-500 shrink-0 mt-0.5"></i>
                    <p class="leading-relaxed"><b>Waktu Premium Tidak Ditemukan:</b> Cuaca kurang mendukung pada jam-jam aktif ikan. Cari spot terlindung.</p>
                </div>
            `;
        }
        
        // NEW: Detailed Solunar Explanation
        recommendationsHtml += `
            <div class="flex items-start gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 text-slate-400 text-xs">
                <i data-lucide="moon" class="w-5 h-5 text-purple-400 shrink-0 mt-0.5"></i>
                <div>
                    <p class="font-bold text-purple-300 mb-1">Info Solunar & Pasang Surut</p>
                    <p class="leading-relaxed text-slate-300">
                        Gravitasi bulan memicu 2 periode makan utama:<br>
                        • <b>Puncak Bulan:</b> Saat bulan tepat di atas, seringkali bersamaan dengan pasang naik.<br>
                        • <b>Lembah Bulan:</b> Saat bulan di bawah kaki kita, juga memicu pasang dan aktivitas ikan.
                    </p>
                </div>
            </div>
        `;

        warningsContainer.innerHTML = warningsHtml;
        recommendationsContainer.innerHTML = recommendationsHtml;
    }

    // Default Chart
    switchChart('temp');
    
    const modal = document.getElementById('weatherDetailModal');
    modal.classList.remove('hidden');
    modal.classList.remove('translate-y-full');
    
    // FIX: Tampilan Penuh (Full Page) - Paksa Style via JS
    modal.style.setProperty('height', '100vh', 'important');
    modal.style.setProperty('width', '100vw', 'important');
    modal.style.setProperty('top', '0', 'important');
    modal.style.setProperty('left', '0', 'important');
    modal.style.setProperty('right', '0', 'important');
    modal.style.setProperty('bottom', '0', 'important');
    modal.style.setProperty('position', 'fixed', 'important');
    modal.style.setProperty('z-index', '2147483647', 'important');
    modal.style.setProperty('border-radius', '0', 'important');
    modal.style.setProperty('max-height', 'none', 'important');
    modal.style.setProperty('max-width', 'none', 'important');
    modal.style.setProperty('margin', '0', 'important');
    modal.style.setProperty('background-color', '#0f172a', 'important');
    modal.style.setProperty('overflow-y', 'auto', 'important'); // Pastikan bisa di-scroll
    modal.style.setProperty('padding-bottom', '80px', 'important');
    
    // FIX: Reset style anak elemen modal juga agar tidak memotong konten
    Array.from(modal.children).forEach(child => {
        child.style.setProperty('border-radius', '0', 'important');
        child.style.setProperty('max-height', 'none', 'important');
        child.style.setProperty('height', 'auto', 'important');
        child.style.setProperty('min-height', '100%', 'important');
        child.classList.remove('rounded-t-[2rem]', 'rounded-t-3xl', 'rounded-2xl', 'rounded-3xl', 'overflow-hidden');
    });

    modal.classList.remove('rounded-t-[2rem]', 'rounded-t-3xl', 'rounded-2xl', 'rounded-3xl', 'max-h-[85vh]', 'h-auto');
    
    // --- FIX: Tombol Close Floating (Pindah ke Body) ---
    let closeBtn = document.getElementById('weather-floating-close');
    if (!closeBtn) {
        // Buat tombol baru jika belum ada
        closeBtn = document.createElement('button');
        closeBtn.id = 'weather-floating-close';
        closeBtn.onclick = closeDetailModal;
        document.body.appendChild(closeBtn);
        
        // Bersihkan tombol lama di dalam modal jika ada
        const originalBtn = modal.querySelector('button[onclick*="closeDetailModal"]');
        if (originalBtn) originalBtn.remove();
    }
    
    // Update Style menjadi Tombol Back di Kiri Atas (Konsisten)
    closeBtn.style.position = 'fixed';
    closeBtn.style.top = '16px';
    closeBtn.style.left = 'auto';
    closeBtn.style.right = '16px'; 
    closeBtn.style.zIndex = '2147483647';
    closeBtn.className = "p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-colors";
    closeBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';

    if (closeBtn) {
        closeBtn.classList.remove('hidden');
    }
    
    lucide.createIcons();
    initChartInteractivity();
}

function switchChart(type) {
    currentChartType = type;
    // Update Tabs UI
    document.querySelectorAll('.chart-tab').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600');
        btn.classList.add('bg-slate-800/50', 'text-slate-400', 'border-white/10');
    });
    const activeBtn = document.getElementById(`tab-${type}`);
    if(activeBtn) {
        activeBtn.classList.add('active', 'bg-blue-600', 'text-white', 'border-blue-600');
        activeBtn.classList.remove('bg-slate-800/50', 'text-slate-400', 'border-white/10');
    }
    renderChart();
}

function renderChart() {
    const container = document.getElementById('chart-container');
    currentChartData = []; // Reset data
    const startIndex = currentDayIndex * 24;
    const hourly = currentWeatherData.hourly;
    
    const labels = [];
    const data1 = []; // Main Line
    const data2 = []; // Secondary
    
    for(let i=0; i<24; i++) {
        const idx = startIndex + i;
        if(idx >= hourly.time.length) break;
        labels.push(i);
        
        if(currentChartType === 'temp') {
            data1.push(hourly.temperature_2m[idx]);
            data2.push(hourly.precipitation_probability[idx]);
            currentChartData.push({temp: data1[i], rain: data2[i]});
        } else if(currentChartType === 'wind') {
            data1.push(hourly.windspeed_10m[idx]);
            data2.push(hourly.winddirection_10m[idx]);
        } else if(currentChartType === 'wave') {
            data1.push(hourly.wave_height[idx] || 0);
        }
    }
    
    const w = container.clientWidth || 300;
    const h = container.clientHeight || 150;
    const pad = 30;
    
    const minVal = Math.min(...data1);
    const maxVal = Math.max(...data1);
    const range = (maxVal - minVal) || 1;
    
    const getX = (i) => pad + (i / 23) * (w - 2 * pad);
    const getY = (v) => h - pad - ((v - minVal) / range) * (h - 2 * pad);
    
    let svgContent = '';
    // Grid Lines
    svgContent += `<line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#475569" stroke-width="1" />`;
    
    if(currentChartType === 'temp') {
        // Rain Bars
        const getYRain = (p) => h - pad - (p / 100) * (h - 2 * pad);
        data2.forEach((r, i) => { if(r > 0) svgContent += `<rect x="${getX(i)-3}" y="${getYRain(r)}" width="6" height="${(h-pad)-getYRain(r)}" fill="#3b82f6" opacity="0.3" rx="2" />`; });
        
        // Temp Line
        let path = `M ${getX(0)} ${getY(data1[0])}`;
        for(let i=1; i<data1.length; i++) path += ` L ${getX(i)} ${getY(data1[i])}`;
        let area = path + ` L ${getX(data1.length-1)} ${h-pad} L ${getX(0)} ${h-pad} Z`;
        
        svgContent += `<defs><linearGradient id="gradTemp" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#fbbf24" stop-opacity="0.4"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></linearGradient></defs>`;
        svgContent += `<path d="${area}" fill="url(#gradTemp)" stroke="none" />`;
        svgContent += `<path d="${path}" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;
        data1.forEach((v, i) => { if(i%3===0) svgContent += `<circle cx="${getX(i)}" cy="${getY(v)}" r="3" fill="#fbbf24" stroke="#1e293b" stroke-width="2" />`; });
        
    } else if(currentChartType === 'wind') {
        currentChartData = data1.map((speed, i) => ({ speed, dir: data2[i] }));
        let path = `M ${getX(0)} ${getY(data1[0])}`;
        for(let i=1; i<data1.length; i++) path += ` L ${getX(i)} ${getY(data1[i])}`;
        svgContent += `<path d="${path}" fill="none" stroke="#22d3ee" stroke-width="2" />`;
        data2.forEach((dir, i) => { if(i%3===0) svgContent += `<g transform="translate(${getX(i)},${getY(data1[i])-15}) rotate(${dir})"><path d="M0 5 L-3 -2 L0 0 L3 -2 Z" fill="#cbd5e1" /></g>`; });
        
    } else if(currentChartType === 'solunar') {
        const activity = Array(24).fill(10); // Base activity
        const times = [
            { time: currentSolunarData.sunTimes.sunrise, score: 30, type: 'sunrise' },
            { time: currentSolunarData.sunTimes.sunset, score: 30, type: 'sunset' },
            { time: currentSolunarData.moonTimes.rise, score: 25, type: 'moonrise' },
            { time: currentSolunarData.moonTimes.set, score: 25, type: 'moonset' },
            { time: currentSolunarData.moonTransit, score: 40, type: 'moontransit' },
            { time: currentSolunarData.moonNadir, score: 40, type: 'moonnadir' }
        ];

        times.forEach(t => {
            if(t.time && !isNaN(t.time)) {
                const hour = t.time.getHours();
                // Boost current hour and +/- 1 hour
                if(activity[hour]) activity[hour] = Math.min(100, activity[hour] + t.score);
                if(hour > 0 && activity[hour-1]) activity[hour-1] = Math.min(100, activity[hour-1] + t.score / 2);
                if(hour < 23 && activity[hour+1]) activity[hour+1] = Math.min(100, activity[hour+1] + t.score / 2);
            }
        });

        currentChartData = activity;
        
        const getYActivity = (v) => h - pad - (v / 100) * (h - 2 * pad);
        
        // Activity Bars
        activity.forEach((val, i) => {
            svgContent += `<rect x="${getX(i)-4}" y="${getYActivity(val)}" width="8" height="${(h-pad)-getYActivity(val)}" fill="#a78bfa" opacity="0.6" rx="2" />`;
        });

        // Add icons for key events
        times.forEach(t => {
            if(t.time && !isNaN(t.time)) {
                const hour = t.time.getHours() + t.time.getMinutes() / 60;
                const x = pad + (hour / 23) * (w - 2 * pad);
                let iconPath = 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'; // Moon
                let color = '#93c5fd'; // Blue
                if(t.type.includes('sun')) {
                    iconPath = 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42';
                    color = '#facc15'; // Yellow
                }
                svgContent += `<g transform="translate(${x}, 15)"><circle cx="12" cy="12" r="5" fill="${color}" opacity="${t.type.includes('transit') || t.type.includes('nadir') ? 1 : 0.7}"/><path d="${iconPath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
            }
        });
    } else if(currentChartType === 'wave') {
        currentChartData = data1;
        let path = `M ${getX(0)} ${getY(data1[0])}`;
        for(let i=1; i<data1.length; i++) path += ` L ${getX(i)} ${getY(data1[i])}`;
        let area = path + ` L ${getX(data1.length-1)} ${h-pad} L ${getX(0)} ${h-pad} Z`;
        svgContent += `<defs><linearGradient id="gradWave" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#60a5fa" stop-opacity="0.6"/><stop offset="100%" stop-color="#60a5fa" stop-opacity="0.1"/></linearGradient></defs>`;
        svgContent += `<path d="${area}" fill="url(#gradWave)" stroke="none" />`;
        svgContent += `<path d="${path}" fill="none" stroke="#60a5fa" stroke-width="2" />`;
    }
    
    labels.forEach((t, i) => { if(i%4===0) svgContent += `<text x="${getX(i)}" y="${h-10}" font-size="11" fill="#94a3b8" text-anchor="middle">${t}:00</text>`; });
    container.innerHTML = `<svg viewBox="0 0 ${w} ${h}" class="w-full h-full overflow-visible">${svgContent}</svg>`;
}

function initChartInteractivity() {
    const wrapper = document.getElementById('chart-wrapper');
    const tooltip = document.getElementById('chart-tooltip');
    const cursor = document.getElementById('chart-cursor');
    
    wrapper.onmousemove = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const w = rect.width;
        const pad = 30;
        
        let idx = Math.round(((x - pad) / (w - 2 * pad)) * 23);
        if(idx < 0) idx = 0; if(idx > 23) idx = 23;
        
        const cursorX = pad + (idx / 23) * (w - 2 * pad);
        cursor.style.left = `${cursorX}px`;
        cursor.classList.remove('hidden');
        
        const realIdx = (currentDayIndex * 24) + idx;
        const h = currentWeatherData.hourly;
        
        let html = `<strong>${idx}:00</strong><br>`;
        // Use SVG strings directly for performance in tooltip
        const iconTemp = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline text-yellow-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`;
        const iconRain = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline text-blue-400"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;
        const iconWind = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline text-slate-300"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`;
        const iconWave = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline text-cyan-400"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
        const iconFish = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline text-purple-400"><path d="M6.5 12.5c0-2.5 3.5-6 3.5-6s3.5 3.5 3.5 6-1.5 2.5-3.5 2.5-3.5-0-3.5-2.5z"/><path d="M18.5 10.5c0-2.5 3.5-6 3.5-6s3.5 3.5 3.5 6-1.5 2.5-3.5 2.5-3.5-0-3.5-2.5z"/><path d="M13 10.5c-2.5 0-2.5 2-5 2s-2.5-2-5-2"/><path d="M13 15.5c-2.5 0-2.5 2-5 2s-2.5-2-5-2"/></svg>`;

        if(currentChartType === 'temp') {
            const d = currentChartData[idx] || {temp: '-', rain: '-'};
            html += `${iconTemp} ${d.temp}°C<br>${iconRain} ${d.rain}%`;
        } else if(currentChartType === 'wind') {
            const d = currentChartData[idx] || {speed: '-', dir: '-'};
            html += `${iconWind} ${d.speed} km/h<br>🧭 ${d.dir}°`;
        } else if(currentChartType === 'wave') {
            html += `${iconWave} ${currentChartData[idx] || 0} m`;
        } else if(currentChartType === 'solunar') {
            const activityScore = Math.round(currentChartData[idx] || 0);
            html += `${iconFish} Aktivitas: <strong>${activityScore}%</strong>`;
        }
        
        tooltip.innerHTML = html;
        tooltip.style.display = 'block';
        tooltip.style.left = `${Math.min(x + 10, w - 80)}px`;
        tooltip.style.top = '10px';
    };
    
    wrapper.onmouseleave = () => { tooltip.style.display = 'none'; cursor.classList.add('hidden'); };
}

function closeDetailModal() {
    document.getElementById('weatherDetailModal').classList.add('translate-y-full');
    const closeBtn = document.getElementById('weather-floating-close');
    if(closeBtn) closeBtn.classList.add('hidden');
    
    // Munculkan kembali tombol back panel utama
    const mainBackBtn = document.getElementById('panel-close-btn');
    if(mainBackBtn) mainBackBtn.classList.remove('hidden');
}

// --- AI INSIGHT FUNCTION (New) ---
function showMetricInsight(type) {
    // Trigger Animation saat diklik
    if(currentWeatherData && currentWeatherData.current_weather) {
        const wx = currentWeatherData.current_weather;
        if(type === 'weather') checkWeatherAnimation(wx.weathercode, wx.windspeed, wx.is_day);
        else if(type === 'wind') startWeatherEffect('wind');
        else if(type === 'temp' && [71, 73, 75, 77, 85, 86].includes(wx.weathercode)) startWeatherEffect('snow');
    }

    const panel = document.getElementById('weather-insight-panel');
    const titleEl = document.getElementById('insight-title');
    const textEl = document.getElementById('insight-text');
    const iconEl = document.getElementById('insight-icon');

    // --- NEW: Reposition the insight panel ---
    // The user wants the insight box to appear above the hourly forecast.
    // We find the hourly summary container and insert the insight panel right before it.
    const hourlySummary = document.getElementById('hourly-summary-container');
    if (hourlySummary && hourlySummary.parentNode) {
        hourlySummary.parentNode.insertBefore(panel, hourlySummary);
    }
    
    // Ensure panel is visible
    panel.classList.remove('hidden');
    panel.classList.add('mb-3'); // Add margin to separate it from the content below
    
    // Default values if data not loaded
    if(!currentWeatherData || !currentWeatherData.current_weather) {
        textEl.innerText = "Data cuaca belum tersedia sepenuhnya. Silakan tunggu atau refresh.";
        return;
    }

    const wx = currentWeatherData.current_weather;
    const hourly = currentWeatherData.hourly;
    const currentHour = new Date().getHours();
    
    let title = "";
    let text = "";
    let icon = "info";

    switch(type) {
        case 'score':
            title = "AI Fishing Score";
            icon = "sparkles";
            const scoreText = document.getElementById('wx-score').innerText;
            const scoreVal = parseInt(scoreText);
            if(scoreVal > 80) text = `Skor ${scoreText} sangat bagus! Kondisi angin, suhu, dan tekanan udara sangat mendukung aktivitas ikan. Waktu yang tepat untuk memancing.`;
            else if(scoreVal > 50) text = `Skor ${scoreText} cukup baik. Ikan mungkin aktif, namun perhatikan perubahan angin mendadak.`;
            else text = `Skor ${scoreText} rendah. Kondisi cuaca kurang mendukung (mungkin angin kencang atau badai). Ikan cenderung bersembunyi.`;
            break;
        case 'temp':
            title = "Analisis Suhu";
            icon = "thermometer";
            const temp = wx.temperature;
            if(temp > 32) text = `Suhu ${temp}°C tergolong panas. Ikan cenderung turun ke kedalaman yang lebih sejuk. Pastikan Anda membawa air minum yang cukup.`;
            else if(temp < 20) text = `Suhu ${temp}°C cukup dingin. Ikan mungkin kurang aktif di permukaan. Coba teknik dasar (bottom fishing).`;
            else text = `Suhu ${temp}°C sangat ideal. Metabolisme ikan stabil, kemungkinan strike lebih besar di area dangkal maupun tengah.`;
            break;
        case 'wind':
            title = "Analisis Angin";
            icon = "wind";
            const wind = wx.windspeed;
            if(wind > 30) text = `BAHAYA: Angin ${wind} km/h sangat kencang. Ombak bisa tinggi tiba-tiba. Tidak disarankan untuk perahu kecil.`;
            else if(wind > 15) text = `Angin ${wind} km/h lumayan terasa. Permukaan air akan bergelombang. Gunakan pemberat/timah yang lebih besar agar umpan tidak hanyut.`;
            else text = `Angin tenang (${wind} km/h). Permukaan air stabil, sangat nyaman untuk memancing teknik casting atau pelampung.`;
            break;
        case 'weather':
            title = "Kondisi Langit";
            icon = "cloud-sun";
            const code = wx.weathercode;
            if(code > 90) text = "Peringatan Badai Petir! Segera hindari area terbuka atau laut. Joran karbon bisa menghantar listrik.";
            else if(code >= 61) text = "Hujan sedang turun. Ikan lele atau patin mungkin lebih aktif, tapi jarak pandang terbatas. Hati-hati licin.";
            else if(code <= 3) text = "Langit cerah/berawan. Cahaya matahari menembus air, gunakan umpan dengan warna natural atau mengkilap.";
            else text = "Cuaca mendung/berkabut. Ikan predator mungkin lebih berani naik ke permukaan karena cahaya redup.";
            break;
        case 'wave':
            title = "Tinggi Ombak";
            icon = "waves";
            const wave = hourly && hourly.wave_height ? hourly.wave_height[currentHour] : 0;
            if(wave > 2.5) text = `Ombak ${wave}m SANGAT TINGGI. Dilarang melaut dengan perahu nelayan biasa. Bahaya terbalik.`;
            else if(wave > 1.2) text = `Ombak ${wave}m cukup tinggi. Perahu akan bergoyang keras. Waspada mabuk laut.`;
            else text = `Ombak ${wave}m relatif tenang. Aman untuk sebagian besar aktivitas memancing di pinggir atau tengah.`;
            break;
        case 'tide':
            title = "Pasang Surut";
            icon = "activity";
            text = "Pergerakan air (arus) memicu ikan untuk makan. Saat terbaik adalah menjelang pasang penuh atau saat air mulai surut perlahan.";
            if(currentMarineData && currentMarineData.hourly && currentMarineData.hourly.sea_level_height_msl) {
                const tideData = currentMarineData.hourly.sea_level_height_msl;
                const tideNow = tideData[currentHour];
                const tideNext = tideData[currentHour+1];
                
                if(tideNext > tideNow) text += " Air sedang <b>PASANG NAIK</b>, ikan biasanya bergerak ke tepian untuk mencari makan.";
                else text += " Air sedang <b>SURUT</b>, ikan predator sering menunggu mangsa yang terbawa arus keluar ke laut dalam.";

                // Cari waktu pasang/surut berikutnya
                let nextHigh = null;
                let nextLow = null;
                
                for(let i = currentHour + 1; i < currentHour + 25; i++) {
                    if(i >= tideData.length - 1) break;
                    const prev = tideData[i-1];
                    const curr = tideData[i];
                    const next = tideData[i+1];
                    
                    if(!nextHigh && curr > prev && curr > next) nextHigh = { h: i % 24, v: curr };
                    if(!nextLow && curr < prev && curr < next) nextLow = { h: i % 24, v: curr };
                    if(nextHigh && nextLow) break;
                }

                if(nextHigh || nextLow) {
                    text += "<br><br><b>Jadwal Berikutnya:</b><br>";
                    if(nextHigh) text += `🌊 Pasang: Jam ${nextHigh.h.toString().padStart(2, '0')}:00 (${nextHigh.v.toFixed(1)}m)<br>`;
                    if(nextLow) text += `🔻 Surut: Jam ${nextLow.h.toString().padStart(2, '0')}:00 (${nextLow.v.toFixed(1)}m)`;
                }
            }
            break;
        case 'sst':
            title = "Suhu Permukaan Laut";
            icon = "thermometer-sun";
            const sstText = document.getElementById('wx-sst').innerText;
            text = `Suhu air ${sstText}. Perubahan suhu air drastis bisa membuat ikan mogok makan (shock). Suhu hangat stabil biasanya disukai ikan pelagis.`;
            break;
        case 'travel':
            title = "Info Perjalanan";
            icon = "map";
            const distText = document.getElementById('panel-dist').innerText;
            text = `Estimasi perjalanan: ${distText.replace('\n', ', ')}. Pastikan bahan bakar cukup. Cek rute untuk menghindari macet.`;
            break;
        case 'sun':
            title = "Solunar Matahari";
            icon = "sunrise";
            text = "Waktu perpindahan gelap-terang (Sunrise/Sunset) adalah 'Golden Hour'. Predator sangat aktif berburu di waktu ini karena penglihatan mangsa terbatas.";
            break;
        case 'depth':
            title = "Info Kedalaman / Elevasi";
            icon = "anchor";
            const dVal = document.getElementById('wx-depth').innerText;
            if(dVal.includes('+')) {
                text = `Lokasi ini berada di daratan dengan ketinggian <b>${dVal}</b> di atas permukaan laut.`;
            } else if(dVal.includes('?') || dVal.includes('--') || dVal.includes('N/A')) {
                text = "Data kedalaman belum tersedia atau tidak valid untuk lokasi ini.";
            } else {
                text = `Kedalaman laut di titik ini diperkirakan <b>${dVal}</b>. Area ini potensial untuk teknik Jigging atau Dasaran tergantung struktur bawah laut.`;
            }
            break;
        default:
            title = "Info";
            text = "Klik item lain untuk melihat analisis detail.";
    }
    
    titleEl.innerText = title;
    textEl.innerHTML = text;
    iconEl.setAttribute('data-lucide', icon);
    lucide.createIcons();
}
