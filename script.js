        // --- SAFETY CHECK: OFFLINE MODE FALLBACK ---
        // Mencegah aplikasi crash jika library tidak termuat karena offline
        if (typeof lucide === 'undefined') {
            // Definisi Path Icon (SVG) untuk Fallback Offline agar tidak jadi Emoji
            const iconPaths = {
                'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
                'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
                'wind': '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
                'waves': '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
                'fish': '<path d="M6.5 12.5c0-2.5 3.5-6 3.5-6s3.5 3.5 3.5 6-1.5 2.5-3.5 2.5-3.5-0-3.5-2.5z"/><path d="M18.5 10.5c0-2.5 3.5-6 3.5-6s3.5 3.5 3.5 6-1.5 2.5-3.5 2.5-3.5-0-3.5-2.5z"/><path d="M13 10.5c-2.5 0-2.5 2-5 2s-2.5-2-5-2"/><path d="M13 15.5c-2.5 0-2.5 2-5 2s-2.5-2-5-2"/>',
                'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
                'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
                'chevron-left': '<path d="m15 18-6-6 6-6"/>',
                'layers': '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
                'cloud-sun': '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
                'navigation': '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
                'locate-fixed': '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
                'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
                'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
                'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
                'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
                'wifi': '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>',
                'wifi-off': '<line x1="1" x2="23" y1="1" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>',
                'check': '<path d="M20 6 9 17l-5-5"/>',
                'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
                'anchor': '<circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
                'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
                'scan-line': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
                'thermometer-sun': '<path d="M12 9a4 4 0 0 0-2 7.5"/><path d="M12 3v2"/><path d="m6.6 18.4-1.4 1.4"/><path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M4 13H2"/><path d="M6.34 7.34 4.93 5.93"/>',
                'sprout': '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
                'thermometer': '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
                'sunrise': '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
                'sunset': '<path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
                'corner-up-left': '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
                'corner-up-right': '<polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
                'refresh-ccw': '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
                'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
                'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
                'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
                'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
                'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
                'loader': '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
                'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
                'scan': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
                'pencil': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
                'shield-x': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m14.5 9-5 5"/><path d="m9.5 9 5 5"/>',
                'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
                'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
                'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 9h4"/><path d="M3 5h4"/>',
                'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
                'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
                'moon-star': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/><path d="M19 3v4"/><path d="M21 5h-4"/>',
                'cloud': '<path d="M17.5 19c0-1.7-1.3-3-3-3h-11a4 4 0 0 1-1-7.9 5 5 0 0 1 9.8-1.2 3 3 0 0 1 2.7 2.1"/>',
                'cloud-fog': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/>',
                'cloud-drizzle': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v2"/><path d="M8 13v2"/><path d="M16 19v2"/><path d="M16 13v2"/><path d="M12 21v2"/><path d="M12 15v2"/>',
                'cloud-snow': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/>',
                'cloud-rain': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
                'cloud-lightning': '<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>',
                'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
                'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
                'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
                'heart-off': '<line x1="2" x2="22" y1="2" y2="22"/><path d="M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"/><path d="M8.76 3.1c1.1-.36 2.24-.27 3.24.44 1.5 1.05 2.74 2 4.5 2A5.5 5.5 0 0 1 21.5 11c0 2.12-.74 4.07-1.97 5.61"/>'
            };

            window.lucide = {
                isFallback: true, // Flag untuk deteksi saat online nanti
                createIcons: () => {
                    document.querySelectorAll('[data-lucide]').forEach(el => {
                        const key = el.getAttribute('data-lucide');
                        const path = iconPaths[key];
                        // Jika path ada, render SVG. Jika tidak, fallback ke emoji atau dot
                        if (path) {
                            // Cek class bawaan elemen untuk ditransfer ke SVG
                            const existingClass = el.getAttribute('class') || '';
                            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${key} ${existingClass}">${path}</svg>`;
                        } else {
                            // Fallback Emoji (Hanya untuk yang belum terdaftar di iconPaths)
                            const emojiMap = { 'map-pin': '📍', 'search': '🔍', 'wind': '💨', 'waves': '🌊', 'fish': '🐟', 'menu': '☰', 'x': '✖', 'chevron-left': '⬅', 'layers': '📚', 'cloud-sun': '⛅', 'navigation': '🧭', 'locate-fixed': '🎯', 'heart': '❤️', 'settings': '⚙️' };
                            if(!el.innerHTML.trim()) el.innerHTML = emojiMap[key] || '•';
                        }
                    });
                }
            };
        }
        lucide.createIcons();
        let isSat = true; // Hoisted to top to fix initialization error
        
        // --- MAP LAYERS CONFIGURATION ---
        const OWM_API_KEY = "YOUR_OWM_API_KEY"; // Ganti dengan API Key OpenWeatherMap Anda untuk layer Angin
        let activeLayers = {}; // Menyimpan layer yang aktif (Multi-layer support)

        // --- THEME SYSTEM (Default Dark) ---
        function initTheme() {
            const saved = localStorage.getItem('appTheme');
            // Default ke 'dark' jika belum ada settingan
            const theme = saved || 'dark';
            applyTheme(theme);
        }

        function applyTheme(theme) {
            const body = document.body;
            const btn = document.getElementById('theme-btn');
            
            if(theme === 'light') {
                body.classList.add('light-mode');
                if(btn) { btn.innerHTML = '<i data-lucide="sun" class="w-3 h-3 inline mr-1"></i> Light'; btn.className = "bg-white text-slate-900 text-xs px-3 py-2 rounded-lg border border-slate-200 font-bold shadow-sm"; }
                
                // Auto-switch to Street View for better blending
                if(isSat) setBaseMap('street');
            } else {
                body.classList.remove('light-mode');
                if(btn) { btn.innerHTML = '<i data-lucide="moon" class="w-3 h-3 inline mr-1"></i> Dark'; btn.className = "bg-slate-900 text-white text-xs px-3 py-2 rounded-lg border border-white/10 font-bold"; }
                
                // Auto-switch to Satellite for Dark Mode
                if(!isSat) setBaseMap('satellite');
            }
            localStorage.setItem('appTheme', theme);
            lucide.createIcons();
        }

        function toggleTheme() {
            const isLight = document.body.classList.contains('light-mode');
            applyTheme(isLight ? 'dark' : 'light');
        }

        // Jalankan tema saat start
        initTheme();

        // --- MULTI-LANGUAGE SYSTEM ---
        const translations = {
            id: {
                app_title: "Fishing Spot by Wayan & StoryBali", login_subtitle: "Masuk untuk simpan spot memancing Anda",
                btn_login: "Masuk Sekarang", btn_register: "Belum punya akun? Daftar gratis",
                search_placeholder: "Cari lokasi (Desa, Kota, Laut)...",
                wx_score: "AI Score", wx_temp: "Suhu", wx_wind: "Angin", wx_weather: "Cuaca",
                wx_wave: "Ombak (Max)", wx_travel: "Perjalanan", wx_tide: "Pasang Surut", wx_sun: "Matahari",
                forecast_title: "Prakiraan 7 Hari & Potensi Mancing",
                wx_depth: "Kedalaman", btn_savespot: "Simpan Spot", modal_add_title: "Posting Spot",
                placeholder_spotname: "Nama Spot/Ikan", placeholder_comment: "Komentar...",
                label_add_photo: "Tambah Foto (Opsional)", btn_save_cloud: "Posting", btn_cancel: "Batal",
                label_contributors: "Kontributor", label_record: "Rekor Ikan", btn_add_review: "Tambah Foto / Ulasan Disini"
            },
            en: {
                app_title: "Fishing Spot by Wayan & StoryBali", login_subtitle: "Login to save your fishing spots",
                btn_login: "Login Now", btn_register: "No account? Sign up free",
                search_placeholder: "Search location (City, Sea)...",
                wx_score: "AI Score", wx_temp: "Temp", wx_wind: "Wind", wx_weather: "Weather",
                wx_wave: "Wave (Max)", wx_travel: "Travel", wx_tide: "Tide", wx_sun: "Sun",
                wx_depth: "Depth", forecast_title: "7-Day Forecast & Fishing Potential",
                btn_savespot: "Save Spot", modal_add_title: "Post Spot",
                placeholder_spotname: "Spot Name/Fish", placeholder_comment: "Comment...", solunar_title: "Fish Activity",
                label_add_photo: "Add Photo (Optional)", btn_save_cloud: "Post", btn_cancel: "Cancel",
                label_contributors: "Contributors", label_record: "Fish Record", btn_add_review: "Add Photo / Review Here"
            },
            jp: {
                app_title: "Fishing Spot by Wayan & StoryBali", login_subtitle: "釣り場を保存するためにログインしてください",
                btn_login: "ログイン", btn_register: "アカウントなし？ 無料登録",
                search_placeholder: "場所を検索 (都市, 海)...",
                wx_score: "AIスコア", wx_temp: "気温", wx_wind: "風", wx_weather: "天気",
                wx_wave: "波 (最大)", wx_travel: "移動", wx_tide: "潮汐", wx_sun: "太陽",
                wx_depth: "水深", forecast_title: "7日間の予報と釣りの可能性",
                btn_savespot: "スポット保存", modal_add_title: "スポット投稿",
                placeholder_spotname: "スポット名/魚", placeholder_comment: "コメント...", solunar_title: "魚の活性",
                label_add_photo: "写真を追加 (任意)", btn_save_cloud: "投稿", btn_cancel: "キャンセル",
                label_contributors: "投稿者", label_record: "最大記録", btn_add_review: "写真/レビューを追加"
            }
        };

        // Dictionary untuk konten dinamis (Cuaca, Hari, dll)
        const dynamicTranslations = {
            id: {
                days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                weather: { 0: "Cerah", 1: "Cerah Berawan", 2: "Berawan", 3: "Mendung", 45: "Kabut", 51: "Gerimis", 61: "Hujan", 80: "Hujan Deras", 95: "Badai", 71: "Salju" },
                rating: { good: "Bagus", medium: "Sedang", bad: "Buruk" },
                loading: "Memuat...", location: "Lokasi Anda"
            },
            en: {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                weather: { 0: "Clear", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Fog", 51: "Drizzle", 61: "Rain", 80: "Showers", 95: "Thunderstorm", 71: "Snow" },
                rating: { good: "Good", medium: "Fair", bad: "Poor" },
                loading: "Loading...", location: "Your Location"
            },
            jp: {
                days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                weather: { 0: "快晴", 1: "晴れ", 2: "一部曇り", 3: "曇り", 45: "霧", 51: "霧雨", 61: "雨", 80: "にわか雨", 95: "雷雨", 71: "雪" },
                rating: { good: "良い", medium: "普通", bad: "悪い" },
                loading: "読み込み中...", location: "あなたの場所"
            }
        };

        function changeLanguage(lang) {
            const t = translations[lang];
            if(!t) return;
            
            // Update Text Content
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(t[key]) el.innerText = t[key];
            });
            // Update Placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if(t[key]) el.placeholder = t[key];
            });
            
            // Sync Selectors
            document.querySelectorAll('select').forEach(s => {
                if(s.options[0].value === 'id' && s.options[1].value === 'en') s.value = lang;
            });
            
            localStorage.setItem('appLang', lang);
            
            // Refresh tampilan cuaca jika sedang terbuka atau ada data
            if(currentWeatherData) updateWeatherUI(currentWeatherData);
            if(currentUserWeatherCode !== null) getUserWeather(); // Refresh header
        }
        
        // Init Language
        setTimeout(() => changeLanguage(localStorage.getItem('appLang') || 'id'), 100);

        // --- CONFIGURATION ---
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuRtzzICS1qoBxWKdOJpHeqWCUN6Wt04xAIi_sYQHd0wSxjc89eumDWAYYcKPrT8jV/exec"; 
        const IMGBB_API_KEY = "7e6f3ce63649d305ccaceea00c28266d"; // Daftar gratis di api.imgbb.com

        // --- AI SETUP (Web Worker & Lazy Loading) ---
        let aiWorker = null;
        let isAiReady = false; // Flag to check if AI model is pre-loaded

        function getAiWorker() {
            if (!aiWorker) {
                const workerCode = `
                    self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest', 'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@latest');
                    let model = null;
 
                    async function loadModel() {
                        if (!model) {
                            self.postMessage({ type: 'status', message: 'AI_LOADING' });
                            try {
                                model = await mobilenet.load();
                                self.postMessage({ type: 'status', message: 'AI_READY' });
                            } catch (e) {
                                self.postMessage({ type: 'error', message: 'Failed to load AI model.' });
                            }
                        }
                        return model;
                    }
 
                    self.onmessage = async (e) => {
                        // Handle pre-loading message
                        if (e.data.type === 'init') {
                            await loadModel();
                            return;
                        }

                        // Handle classification message
                        const { imageData } = e.data;
                        try {
                            const classifier = await loadModel(); // Will be fast if already loaded
                            if (!classifier) { throw new Error("Model not available."); }
                            if (!imageData) { throw new Error("No image data received."); }
                            
                            const image = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
                            const imgTensor = tf.browser.fromPixels(image);
                            const predictions = await classifier.classify(imgTensor);
                            imgTensor.dispose();
                            self.postMessage({ type: 'result', predictions: predictions });
                        } catch (error) {
                            self.postMessage({ type: 'error', message: error.message });
                        }
                    };
                `;
                const blob = new Blob([workerCode], { type: 'application/javascript' });
                aiWorker = new Worker(URL.createObjectURL(blob));

                // Add a permanent listener to update the isAiReady flag
                aiWorker.addEventListener('message', (e) => {
                    if (e.data.type === 'status' && e.data.message === 'AI_READY') {
                        isAiReady = true;
                        console.log("AI Model is ready and pre-loaded.");
                    }
                });
            }
            return aiWorker;
        }

        // Cek apakah Leaflet (Peta) termuat
        if (typeof L === 'undefined') {
            document.getElementById('map').innerHTML = '<div class="flex flex-col items-center justify-center h-full text-slate-500 bg-slate-900 gap-2"><i class="text-4xl">🗺️</i><p>Mode Offline: Peta tidak dapat dimuat.</p></div>';
            // Mock object agar script tidak crash total
            window.L = {
                map: () => ({ setView: () => {}, on: () => {}, addControl: () => {}, removeLayer: () => {}, addLayer: () => {}, getPane: () => ({ style: {} }), createPane: () => {}, getBounds: () => ({ getNorth:()=>0, getWest:()=>0, getSouth:()=>0, getEast:()=>0 }), getZoom: () => 10, flyTo: () => {}, eachLayer: () => {}, invalidateSize: () => {} }),
                tileLayer: () => ({ addTo: () => {} }), marker: () => ({ addTo: () => ({ bindPopup: () => ({ openPopup: () => {} }), on: () => {} }) }), divIcon: () => {}, control: { attribution: () => ({ addTo: () => {} }), extend: () => {} }, DomUtil: { create: () => document.createElement('div') }, Control: { extend: () => {} }, latLng: () => {}, polyline: () => ({ addTo: () => {} }), circleMarker: () => ({ addTo: () => {} }), geoJSON: () => ({ addTo: () => {} }), heatLayer: () => ({ addTo: () => {} })
            };
            window.L.tileLayer.wms = () => ({ addTo: () => {} });
        }

        // 2. Map & Street View Setup
        // Menggunakan Google Hybrid (Satelit + Label/Jalan) agar lebih lengkap & cerah
        const satLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { 
            maxZoom: 20,
            attribution: '© Google Maps'
        });
        
        const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // Layer Laut (Bathymetry/Depth) - Esri Ocean Basemap
        const oceanLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 13, // Data kedalaman biasanya optimal di zoom level ini
            attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
        });
        
        // Cek penyimpanan lokal agar saat refresh langsung ke lokasi terakhir
        const lastLat = localStorage.getItem('lastLat');
        const lastLng = localStorage.getItem('lastLng');
        const initLat = lastLat ? parseFloat(lastLat) : -6.2000;
        const initLng = lastLng ? parseFloat(lastLng) : 106.8166;
        
        // Inisialisasi peta dengan menonaktifkan attribution default
        var map = L.map('map', { zoomControl: false, attributionControl: false, layers: [satLayer] }).setView([initLat, initLng], lastLat ? 15 : 13);

        // BUAT PANE KHUSUS: Agar layer NASA (SST, Klorofil) selalu di atas peta dasar
        map.createPane('gibsPane');
        map.getPane('gibsPane').style.zIndex = 250; // Di atas base map (200), di bawah marker (600)
        map.getPane('gibsPane').style.pointerEvents = 'none'; // Biarkan klik menembus layer

        // Tambahkan attribution control baru tanpa prefix "Leaflet"
        L.control.attribution({ prefix: false }).addTo(map);
        // Handle Zoom Effect: Glow & Clustering Logic
        function handleZoomEffect() {
            const zoom = map.getZoom();
            const mapEl = document.getElementById('map');
            
            // 1. Efek Glow Lebar (CSS)
            if(zoom < 14) mapEl.classList.add('zoomed-out');
            else mapEl.classList.remove('zoomed-out');
            
            // 2. Logika Prioritas Marker (Hanya saat Zoom Jauh < 13)
            // "Yang biru/kuning hilang KECUALI tidak ada yang merah di dekatnya"
            if (zoom < 13) { 
                // Cari semua marker merah (Monster)
                const redMarkers = allMarkers.filter(m => m.options.maxWeight >= 10);
                
                allMarkers.forEach(m => {
                    const el = m.getElement();
                    if(!el) return;

                    if (m.options.maxWeight >= 10) {
                        // Marker Merah selalu muncul
                        el.classList.remove('hidden-marker');
                        return;
                    }
                    
                    // Cek jarak pixel ke marker merah terdekat
                    let nearRed = false;
                    const p1 = map.latLngToLayerPoint(m.getLatLng());
                    
                    for (const r of redMarkers) {
                        const p2 = map.latLngToLayerPoint(r.getLatLng());
                        const dist = p1.distanceTo(p2);
                        if (dist < 120) { // Jika dalam radius 120px dari Merah -> Sembunyikan
                            nearRed = true;
                            break;
                        }
                    }
                    
                    if (nearRed) el.classList.add('hidden-marker');
                    else el.classList.remove('hidden-marker');
                });
            } else {
                // Reset: Tampilkan semua saat zoom dekat
                allMarkers.forEach(m => {
                    const el = m.getElement();
                    if(el) el.classList.remove('hidden-marker');
                });
            }
        }
        map.on('zoomend', handleZoomEffect);
        // handleZoomEffect dipanggil setelah marker dimuat
        
        // --- FITUR INFO CUACA USER ---
        function showUserWeatherPanel() {
            if(userLatlng) {
                showLocationPanel(userLatlng);
                map.flyTo(userLatlng, 15); // Fokus ke lokasi user
            } else {
                alert("Lokasi Anda belum ditemukan. Pastikan GPS aktif.");
                getUserWeather();
            }
        }

        let tempLatlng = null;
        let currentUser = null;
        let searchMarker = null; // Variabel untuk menyimpan marker pencarian
        let selectionMarker = null; // Marker untuk lokasi yang diklik
        let currentUserWeatherCode = null; // Simpan kode cuaca user
        let currentUserWindSpeed = 0; // Simpan kecepatan angin user
        let currentWeatherData = null; // Simpan data cuaca lengkap
        let currentMarineData = null; // Simpan data laut (New)
        let currentDetailSpot = null; // Data spot yang sedang dibuka detailnya
        let groupedSpots = {}; // Global variable untuk menyimpan data spot yang dikelompokkan
        let isContributionMode = false; // Flag untuk membedakan mode tambah spot vs ulasan
        let currentSolunarData = null; // Data Solunar untuk chart
        let currentChartData = []; // Data untuk tooltip chart
        let allMarkers = []; // Array untuk menyimpan semua marker spot

        // Custom Icon untuk Spot Ikan
        const fishIcon = L.divIcon({
            className: 'custom-fish-icon',
            html: `<div class="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center"><i data-lucide="fish" class="text-white w-5 h-5"></i></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Fungsi Pencarian Lokasi
        function handleSearch(e) {
            if(e.key === 'Enter') searchLocation();
        }

        function startVoiceSearch() {
            if (!('webkitSpeechRecognition' in window)) {
                alert("Browser tidak mendukung fitur suara.");
                return;
            }
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'id-ID';
            recognition.start();
            
            const btn = document.getElementById('mic-btn');
            btn.classList.add('text-red-500', 'animate-pulse');

            recognition.onresult = function(event) {
                const text = event.results[0][0].transcript;
                document.getElementById('search-input').value = text;
                searchLocation();
            };
            recognition.onend = () => btn.classList.remove('text-red-500', 'animate-pulse');
        }

        function searchLocation() {
            const query = document.getElementById('search-input').value;
            if(!query) return;
            
            const btn = document.getElementById('search-btn');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>';

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    if(data && data.length > 0) {
                        const lat = parseFloat(data[0].lat);
                        const lon = parseFloat(data[0].lon);
                        
                        // 1. Hapus marker pencarian sebelumnya (jika ada) biar map bersih
                        if(searchMarker) map.removeLayer(searchMarker);

                        // 2. Buat Icon Pin Merah ala Google Maps
                        const redPin = L.divIcon({
                            className: 'bg-transparent',
                            html: `<div class="relative -mt-10 flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-2xl"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
                                    <div class="w-4 h-1.5 bg-black/30 blur-sm rounded-full"></div>
                                   </div>`,
                            iconSize: [46, 46],
                            iconAnchor: [23, 46], // Ujung bawah pin pas di koordinat
                            popupAnchor: [0, -45]
                        });

                        // 3. Tambahkan ke Peta & Buka Popup Nama Lokasi
                        searchMarker = L.marker([lat, lon], {icon: redPin}).addTo(map)
                            .bindPopup(`<b class="text-slate-900 text-sm">${data[0].display_name.split(',')[0]}</b>`).openPopup();

                        map.flyTo([lat, lon], 13);
                    } else {
                        alert("Lokasi tidak ditemukan");
                    }
                })
                .catch(() => alert("Gagal mencari lokasi"))
                .finally(() => btn.innerHTML = originalContent);
        }

        // Fungsi Street View: Membuka koordinat di Google Street View
        function openStreetView(lat, lng) {
            const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
            window.open(url, '_blank');
        }

        function openStreetViewFromPanel() {
            if(tempLatlng) openStreetView(tempLatlng.lat, tempLatlng.lng);
        }
        
        function openStreetViewFromDetail() {
            if(currentDetailSpot) openStreetView(currentDetailSpot.lat, currentDetailSpot.lng);
        }

        // --- HIGH-PERFORMANCE WEATHER ANIMATION (CANVAS) ---
        const canvas = document.getElementById('weather-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId = null;
        let wxInterval = null;
        let currentWxType = null;
        let storm = null;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
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
                this.y += this.speed;
                if (this.y > canvas.height) {
                    if (this.splash) particles.push(new Splash(this.x));
                    this.y = -this.length; this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.beginPath(); ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.length * 0.25, this.y + this.length); // Tilt
                ctx.strokeStyle = `rgba(147, 197, 253, ${this.opacity})`; ctx.lineWidth = this.width; ctx.stroke();
            }
        }

        class Splash {
            constructor(x) { this.x = x; this.y = canvas.height; this.radius = 20 + Math.random() * 20; this.maxRadius = this.radius * 1.5; this.life = 0; this.maxLife = 20; this.isDead = false; }
            update() { this.life++; if (this.life >= this.maxLife) this.isDead = true; }
            draw() {
                const p = this.life / this.maxLife;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * p, Math.PI, 2 * Math.PI, false);
                ctx.strokeStyle = `rgba(147, 197, 253, ${0.8 * (1 - p)})`; ctx.lineWidth = 2; ctx.stroke();
            }
        }

        class SnowFlake {
            constructor() { this.x = Math.random() * canvas.width; this.y = -Math.random() * 20; this.size = 10 + Math.random() * 15; this.speed = 1 + Math.random() * 2; this.sway = 0.5 + Math.random() * 0.5; this.swaySpeed = 0.02 + Math.random() * 0.01; this.angle = 0; }
            update() { this.y += this.speed; this.angle += this.swaySpeed; this.x += Math.sin(this.angle) * this.sway; if (this.y > canvas.height) { this.y = -20; this.x = Math.random() * canvas.width; } }
            draw() { ctx.font = `${this.size}px Arial`; ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + this.size / 30})`; ctx.fillText('❄', this.x, this.y); }
        }

        class WindLine {
            constructor() { this.x = -150; this.y = Math.random() * canvas.height; this.length = 150; this.speed = 15 + Math.random() * 10; }
            update() { this.x += this.speed; if (this.x > canvas.width + 50) { this.x = -150; this.y = Math.random() * canvas.height; } }
            draw() {
                const g = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
                g.addColorStop(0, 'rgba(255, 255, 255, 0)'); g.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)'); g.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.length, this.y); ctx.stroke();
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            // Add a gradient mask at the top to create a "hidden screen" effect
            const isLight = document.body.classList.contains('light-mode');
            const maskColor = isLight ? '248, 250, 252' : '2, 6, 23';
            const topMask = ctx.createLinearGradient(0, 0, 0, 80); // 80px fade area
            topMask.addColorStop(0, `rgba(${maskColor}, 1)`);
            topMask.addColorStop(0.5, `rgba(${maskColor}, 0.8)`);
            topMask.addColorStop(1, `rgba(${maskColor}, 0)`);
            ctx.fillStyle = topMask;
            ctx.fillRect(0, 0, canvas.width, 80);
        }

        function startWeatherEffect(type) {
            if(currentWxType === type) return;
            stopWeatherEffect();
            currentWxType = type;

            // Pastikan canvas muncul di atas panel full-screen
            canvas.style.zIndex = "2147483647";
            canvas.style.pointerEvents = "none";

            if (type === 'rain') for (let i = 0; i < 150; i++) particles.push(new RainDrop());
            else if (type === 'snow') for (let i = 0; i < 50; i++) particles.push(new SnowFlake());
            else if (type === 'wind') for (let i = 0; i < 10; i++) particles.push(new WindLine());
            else if (type === 'storm') {
                for (let i = 0; i < 200; i++) particles.push(new RainDrop());
                storm = { flashOpacity: 0 };
            }

            if (!animationFrameId) animate();
        }

        function stopWeatherEffect() {
            if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
            particles = [];
            storm = null;
            currentWxType = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.zIndex = "0"; // Reset z-index saat stop
        }

        // 3. Auth Logic
        // (MODIFIKASI: Login Dinonaktifkan - Aplikasi Tanpa Profil)
        function handleAuth(type) {
            console.log("Auth system disabled.");
        }

        // Langsung inisialisasi aplikasi (Bypass Login)
        setTimeout(() => initApp(), 100);

        // --- AUTO RECONNECT HANDLER (Fitur Baru) ---
        // Mendeteksi saat internet nyala kembali
        window.addEventListener('online', () => {
            console.log("Internet Connected: Refreshing Data...");
            
            // --- FIX: RECOVERY ICON JIKA SEBELUMNYA OFFLINE ---
            if (window.lucide && window.lucide.isFallback) {
                console.log("Reloading Lucide Library...");
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/lucide@latest';
                script.onload = () => {
                    // Library asli termuat, timpa mock object dan render ulang
                    lucide.createIcons(); 
                };
                document.head.appendChild(script);
            }

            // 1. Notifikasi Visual
            const toast = document.createElement('div');
            toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl z-[3000] flex items-center gap-2 animate-bounce";
            toast.innerHTML = `<i data-lucide="wifi" class="w-4 h-4"></i> Online: Memuat Ulang Data...`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            lucide.createIcons();

            // 2. Coba ambil ulang lokasi & cuaca jika sebelumnya gagal
            getUserWeather();

            // 3. Coba ambil ulang data spot dari Cloud (Google Sheets)
            loadSpots();

            // 4. Coba nyalakan ulang layer peta yang mungkin mati karena offline
            loadLayerPreferences();
            
            // 5. Refresh tampilan peta (Tiles) agar bagian abu-abu hilang
            if(typeof map !== 'undefined') {
                map.eachLayer(layer => {
                    if(layer._url) layer.redraw();
                });
            }
        });

        window.addEventListener('offline', () => {
            const toast = document.createElement('div');
            toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[3000] flex items-center gap-2";
            toast.innerHTML = `<i data-lucide="wifi-off" class="w-4 h-4"></i> Koneksi Terputus`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            lucide.createIcons();
        });

        function initApp() {
            // Set user default (Guest) agar fungsi penyimpanan tetap berjalan
            currentUser = { email: 'Guest', uid: 'guest_user' };
            
            // Sembunyikan overlay login & tampilkan konten utama
            const authOverlay = document.getElementById('auth-overlay');
            if(authOverlay) authOverlay.classList.add('hidden');
            
            const appContent = document.getElementById('app-content');
            if(appContent) appContent.classList.remove('hidden');
            
            const emailEl = document.getElementById('user-display-email');
            if(emailEl) emailEl.innerText = "Guest Mode";
            
            // PERBAIKAN: Refresh ukuran peta agar tidak error/abu-abu saat muncul
            setTimeout(() => { if(typeof map !== 'undefined') map.invalidateSize(); }, 100);
            
            // Pre-load the AI model in the background for faster analysis later
            getAiWorker().postMessage({ type: 'init' });

            getUserWeather(); // Ambil cuaca lokasi user saat ini
            loadSpots();
            setTimeout(initScrollDots, 500); // Init dots setelah layout render
            setTimeout(initTour, 1500); // Mulai tour otomatis untuk user baru
            setTimeout(initCompass, 1000); // Inisialisasi Kompas Digital
            setTimeout(loadLayerPreferences, 2000); // Mengembalikan layer peta yang tersimpan
        }

        function logout() {
            // Tidak ada logout di mode tanpa login
            console.log("Logout disabled");
        }

        // 4. Spot Management
        
        // Ganti logika klik peta: Munculkan Panel Cuaca dulu
        map.on('click', e => {
            tempLatlng = e.latlng;
            
            // Tambahkan Marker Pin pada lokasi yang diklik
            if (selectionMarker) map.removeLayer(selectionMarker);
            
            const pinIcon = L.divIcon({
                className: 'bg-transparent',
                html: `<div class="relative -mt-8 flex flex-col items-center animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-lg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
                        <div class="w-3 h-1 bg-black/30 blur-sm rounded-full mt-[-2px]"></div>
                       </div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });
            selectionMarker = L.marker(e.latlng, {icon: pinIcon}).addTo(map);
            
            showLocationPanel(e.latlng);
        });

        let userLatlng = null;
        let userLocationMarker = null; // Marker lokasi user custom
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
                    map.flyTo([lat, lng], 15);
                    
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
                                map.flyTo([lat, lng], 12);
                                
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
                    // checkWeatherAnimation(currentUserWeatherCode, currentUserWindSpeed); // Disabled: Jangan auto-start di peta
                }
            } catch(e) {
                const infoEl = document.getElementById('user-weather-info');
                if(infoEl) infoEl.innerText = "Cuaca Offline";
            }
        }

        function checkWeatherAnimation(code, windSpeed = 0) {
            // Priority: Storm > Snow > Rain > Wind
            if([95, 96, 99].includes(code)) { startWeatherEffect('storm'); return; }
            if([71, 73, 75, 77, 85, 86].includes(code)) { startWeatherEffect('snow'); return; }
            if([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) { startWeatherEffect('rain'); return; }
            if(windSpeed > 20) { startWeatherEffect('wind'); return; }
            
            stopWeatherEffect();
        }

        let currentRouteLine = null; // Menyimpan garis rute
        let currentRouteSteps = []; // Menyimpan langkah-langkah rute

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
            panel.style.setProperty('background-color', '#0f172a', 'important'); // Pastikan background solid (Slate-900)
            panel.style.setProperty('padding-bottom', '80px', 'important'); // Tambahan padding bawah agar konten paling bawah tidak mentok
            
            // FIX: Hapus lengkungan pada elemen anak (konten dalam panel)
            Array.from(panel.children).forEach(child => {
                child.style.setProperty('border-radius', '0', 'important');
                child.style.setProperty('max-height', 'none', 'important'); // CRITICAL: Hapus batasan tinggi wrapper
                child.style.setProperty('height', 'auto', 'important'); // Biarkan konten memanjang
                child.style.setProperty('min-height', '100%', 'important');
                child.classList.remove('rounded-t-[2rem]', 'rounded-t-3xl', 'rounded-2xl', 'rounded-3xl', 'overflow-hidden');
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
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latlng.lat}&longitude=${latlng.lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode,wave_height,windspeed_10m,winddirection_10m,relativehumidity_2m,surface_pressure,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,sunrise,sunset,uv_index_max&timezone=auto`);
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

        // Fungsi Update UI Cuaca (Dipisah agar bisa dipanggil saat ganti bahasa)
        function updateWeatherUI(data) {
            if(!data || !data.current_weather) return;
            
            const lang = localStorage.getItem('appLang') || 'id';
            const dt = dynamicTranslations[lang];
            
            // --- NEW: Create and Populate iPhone-style Header ---
            const panelContent = document.querySelector('#location-panel > div'); // Target the main content div of the panel
            if (panelContent) {
                let header = document.getElementById('new-weather-header');
                if (!header) {
                    header = document.createElement('div');
                    header.id = 'new-weather-header';
                    header.className = 'flex flex-col items-center text-white pt-4 pb-6 px-4 text-center';
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
            const code = wx.weathercode;
            
            // Mapping Kode ke Deskripsi
            let desc = dt.weather[code] || dt.weather[0]; // Default Cerah
            // Mapping kasar jika kode tidak ada di list utama
            if(!dt.weather[code]) {
                if(code > 3) desc = dt.weather[2]; // Berawan
                if(code > 50) desc = dt.weather[61]; // Hujan
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
                checkWeatherAnimation(code, wx.windspeed);
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
            let hourlyContainer = document.getElementById('hourly-forecast-container');
            const existingScroll = document.getElementById('weather-scroll');
            const dotsContainer = document.getElementById('scroll-dots');

            if (!hourlyContainer && existingScroll) {
                const referenceNode = dotsContainer || existingScroll;

                // Buat container untuk summary text di atas forecast
                if (!hourlySummaryContainer) {
                    hourlySummaryContainer = document.createElement('div');
                    hourlySummaryContainer.id = 'hourly-summary-container';
                    hourlySummaryContainer.className = "px-4 pb-3 text-xs text-slate-200 border-b border-white/10 mb-3 leading-relaxed";
                    if(referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(hourlySummaryContainer, referenceNode.nextSibling);
                    }
                }

                // Buat container untuk forecast per jam
                hourlyContainer = document.createElement('div');
                hourlyContainer.id = 'hourly-forecast-container';
                // Styling: Horizontal scroll, spacing, border top for separation
                hourlyContainer.className = "flex items-stretch gap-x-2 px-4 overflow-x-auto no-scrollbar pb-4";
                
                // Insert setelah container summary
                if(hourlySummaryContainer && hourlySummaryContainer.parentNode) {
                    hourlySummaryContainer.parentNode.insertBefore(hourlyContainer, hourlySummaryContainer.nextSibling);
                }
            }

            if (hourlyContainer && data.hourly && data.hourly.time && data.daily) {
                hourlyContainer.innerHTML = ''; // Clear only the new container

                // NEW: Populate Summary Text
                if (hourlySummaryContainer) {
                    const currentCode = wx.weathercode;
                    const maxWind = data.daily.windspeed_10m_max[0];
                    let summaryText = `${dt.weather[currentCode] || 'Cuaca bervariasi'}. `;

                    summaryText += `Embusan angin hari ini hingga <strong>${maxWind} km/j</strong>.`;
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
                        item.innerHTML = `<div class="text-xs ${textWeight}">${timeText}</div><i data-lucide="${icon}" class="w-6 h-6 ${iconColorClass} drop-shadow-lg my-1.5"></i><div class="text-lg font-bold text-white">${event.temp}°</div>`;
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
                const list = document.getElementById('forecast-list');
                list.innerHTML = ''; // Clear

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

            // Render Summary Text
            const dailyCode = currentWeatherData.daily.weathercode[dayIndex];
            const isSnow = [71, 73, 75, 77, 85, 86].includes(dailyCode);
            const rainSum = currentWeatherData.daily.precipitation_sum[dayIndex];
            
            let summary = `<div class="flex items-center gap-2"><i data-lucide="info" class="text-blue-400 w-4 h-4"></i> <p>Total presipitasi: ${rainSum}mm. `;
            if(rainSum > 5) summary += "Siapkan jas hujan.";
            else summary += "Cuaca relatif kering.";
            summary += "</p></div>";
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

        // --- FAVORITE SYSTEM ---
        function toggleFavorite() {
            if(!currentDetailSpot) return;
            
            // Gunakan key unik (lat,lng) untuk identifikasi
            const key = currentDetailSpot.lat + ',' + currentDetailSpot.lng;
            let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            // Cek apakah sudah ada
            const index = favs.findIndex(f => (f.lat + ',' + f.lng) === key);
            
            if(index >= 0) {
                favs.splice(index, 1); // Hapus
            } else {
                favs.push(currentDetailSpot); // Tambah
            }
            
            localStorage.setItem('favorites', JSON.stringify(favs));
            updateFavoriteBtn();
        }

        function updateFavoriteBtn() {
            if(!currentDetailSpot) return;
            const key = currentDetailSpot.lat + ',' + currentDetailSpot.lng;
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            const isFav = favs.some(f => (f.lat + ',' + f.lng) === key);
            
            const btn = document.getElementById('btn-favorite');
            if(isFav) {
                btn.innerHTML = '<i data-lucide="heart" class="w-6 h-6 fill-red-500 text-red-500"></i>';
            } else {
                btn.innerHTML = '<i data-lucide="heart" class="w-6 h-6 text-white"></i>';
            }
            lucide.createIcons();
        }

        // --- FITUR BARU: EKSPOR GPX (Untuk Fishfinder) ---
        function exportFavoritesToGPX() {
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            if(favs.length === 0) {
                alert("Belum ada spot favorit untuk diekspor.");
                return;
            }

            let gpx = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx version="1.1" creator="FishingSpotApp">`;

            favs.forEach(spot => {
                gpx += `
  <wpt lat="${spot.lat}" lon="${spot.lng}">
    <name>${(spot.name || 'Spot').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</name>
    <desc>${spot.comment || 'Spot Mancing'}</desc>
    <sym>Fishing Hot Spot Map Symbol</sym>
  </wpt>`;
            });

            gpx += `
</gpx>`;

            const blob = new Blob([gpx], { type: 'application/gpx+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fishing_spots_${new Date().toISOString().slice(0,10)}.gpx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // --- FAVORITES LIST FUNCTIONS ---
        function openFavorites() {
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            const list = document.getElementById('favorites-list');
            list.innerHTML = '';
            
            if(favs.length === 0) {
                list.innerHTML = '<div class="text-center text-slate-500 py-8 flex flex-col items-center gap-2"><i data-lucide="heart-off" class="w-8 h-8 opacity-50"></i><p>Belum ada spot favorit.<br>Klik ikon hati pada detail spot untuk menyimpan.</p></div>';
            } else {
                // Tambahkan Tombol Export GPX di atas list jika ada data
                const exportBtn = document.createElement('button');
                exportBtn.className = "w-full mb-4 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg";
                exportBtn.innerHTML = '<i data-lucide="download" class="w-4 h-4"></i> Ekspor ke GPX (Garmin/GPS)';
                exportBtn.onclick = exportFavoritesToGPX;
                list.appendChild(exportBtn);

                favs.forEach(spot => {
                    const item = document.createElement('div');
                    item.className = "bg-slate-800/50 p-3 rounded-xl border border-white/5 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors group";
                    item.onclick = () => {
                        closeFavorites();
                        const key = spot.lat + ',' + spot.lng;
                        if(groupedSpots[key]) {
                            openSpotDetail(groupedSpots[key]);
                            map.flyTo([spot.lat, spot.lng], 16);
                        } else {
                            openSpotDetail([spot]);
                            map.flyTo([spot.lat, spot.lng], 16);
                        }
                    };
                    
                    const img = spot.photo || 'https://via.placeholder.com/100?text=Fish';
                    
                    item.innerHTML = `
                        <img src="${img}" class="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-white/10 group-hover:scale-105 transition-transform">
                        <div>
                            <h4 class="font-bold text-sm text-white line-clamp-1">${spot.name}</h4>
                            <p class="text-[10px] text-slate-400 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${parseFloat(spot.lat).toFixed(4)}, ${parseFloat(spot.lng).toFixed(4)}</p>
                        </div>
                    `;
                    list.appendChild(item);
                });
            }
            document.getElementById('favoritesModal').classList.remove('translate-y-full');
            lucide.createIcons();
        }

        function closeFavorites() {
            document.getElementById('favoritesModal').classList.add('translate-y-full');
        }

        // --- LEGEND FUNCTIONS ---
        function openLegend() { document.getElementById('legendModal').classList.remove('translate-y-full'); lucide.createIcons(); }
        function closeLegend() { document.getElementById('legendModal').classList.add('translate-y-full'); }

        // Dictionary Kategori Habitat Ikan (Air Tawar vs Air Asin)
        const fishTranslations = {
            // Kategori Air Tawar
            'tench': 'Ikan Air Tawar', 'goldfish': 'Ikan Air Tawar', 'carp': 'Ikan Air Tawar', 
            'trout': 'Ikan Air Tawar', 'pike': 'Ikan Air Tawar', 'sturgeon': 'Ikan Air Tawar', 
            'gar': 'Ikan Air Tawar', 'bass': 'Ikan Air Tawar', 'catfish': 'Ikan Air Tawar',

            // Kategori Air Asin
            'shark': 'Ikan Air Asin', 'ray': 'Ikan Air Asin', 'stingray': 'Ikan Air Asin', 
            'barracouta': 'Ikan Air Asin', 'marlin': 'Ikan Air Asin', 'anemone': 'Ikan Air Asin', 
            'seahorse': 'Ikan Air Asin', 'whaleshark': 'Ikan Air Asin', 'hammerhead': 'Ikan Air Asin', 
            'lionfish': 'Ikan Air Asin', 'puffer': 'Ikan Air Asin', 'eel': 'Ikan Air Asin', 
            'rock beauty': 'Ikan Air Asin', 'clownfish': 'Ikan Air Asin', 'coho': 'Ikan Air Asin', 
            'crab': 'Hewan Air Asin', 'lobster': 'Hewan Air Asin'
        };

        function setRating(n) {
            document.getElementById('spotRating').value = n;
            const stars = document.querySelectorAll('.star-btn');
            stars.forEach((btn, index) => {
                if(index < n) {
                    btn.classList.add('text-yellow-400');
                    btn.classList.remove('text-slate-600');
                } else {
                    btn.classList.remove('text-yellow-400');
                    btn.classList.add('text-slate-600');
                }
            });
        }

        // Helper: Konversi Koordinat DMS (EXIF) ke Desimal
        function convertDMSToDD(dms, ref) {
            if(!dms || dms.length < 3) return null;
            let dd = dms[0] + dms[1]/60 + dms[2]/3600;
            if (ref === "S" || ref === "W") dd = dd * -1;
            return dd;
        }

        function handleNoGPS(svPreview, saveBtn) {
            showCustomAlert(
                "Lokasi GPS Tidak Ditemukan",
                "Foto ini tidak memiliki data lokasi (GPS).<br>Untuk <b>menambah spot baru</b>, foto wajib memiliki informasi lokasi.",
                "map-pin-off",
                "red"
            );
            saveBtn.innerText = "Foto Tidak Valid";
            saveBtn.disabled = true;
            saveBtn.classList.add('bg-slate-600', 'hover:bg-slate-600', 'cursor-not-allowed');
            saveBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');

            tempLatlng = null;
        }

        // --- IMAGE PREVIEW FUNCTIONS ---
        let currentObjectUrl = null; // Variabel global untuk manajemen memori gambar

        async function previewImage(input) {
            const file = input.files[0];
            if(!file) return;

            // 1. Memory Optimization: Use Blob URL & revoke old one (CRITICAL FOR IPHONE)
            if(currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = URL.createObjectURL(file);

            // Show preview immediately (lighter than FileReader)
            const imgPreview = document.getElementById('imagePreview');
            imgPreview.src = currentObjectUrl;
            document.getElementById('imagePreviewContainer').classList.remove('hidden');
            document.getElementById('upload-placeholder').classList.add('hidden');

            // 2. Auto-detect fish name (AI) - with resize to prevent crash
            const nameInput = document.getElementById('spotName');
            if (nameInput.value.trim() === '') {
                nameInput.placeholder = isAiReady ? "Menganalisa gambar..." : "Memuat AI & Menganalisa...";
                try {
                    const detectedName = await detectFish(file);
                    if (detectedName) {
                        nameInput.value = detectedName;
                    }
                } catch (e) {
                    console.error("AI detection failed:", e);
                } finally {
                    nameInput.placeholder = "Nama Spot/Ikan";
                }
            }

            // 3. Auto-detect location from photo (EXIF GPS) - ONLY for new spots
            if(!isContributionMode) { 
                const svPreview = document.getElementById('sv-preview');
                const saveBtn = document.getElementById('btnSaveSpot');
                const lang = localStorage.getItem('appLang') || 'id';

                if(svPreview) svPreview.innerHTML = `<div class="flex items-center gap-2 text-yellow-400 animate-pulse"><i data-lucide="loader" class="w-4 h-4 animate-spin"></i> <span class="text-xs font-bold">Mencari lokasi di foto...</span></div>`;
                lucide.createIcons();

                // Add a small delay for UI to render before heavy EXIF processing
                setTimeout(() => {
                    if (typeof EXIF === 'undefined') {
                        console.warn("EXIF library missing");
                        handleNoGPS(svPreview, saveBtn);
                        return;
                    }
                    EXIF.getData(file, function() {
                        const lat = EXIF.getTag(this, "GPSLatitude");
                        const lng = EXIF.getTag(this, "GPSLongitude");
                        
                        if(lat && lng) {
                            const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
                            const lngRef = EXIF.getTag(this, "GPSLongitudeRef") || "E";
                            const latDec = convertDMSToDD(lat, latRef);
                            const lngDec = convertDMSToDD(lng, lngRef);
                            
                            if(latDec && lngDec) {
                                // GPS Found & Valid
                                tempLatlng = { lat: latDec, lng: lngDec };
                                map.flyTo([latDec, lngDec], 16);
                                
                                // Update visual marker
                                if(selectionMarker) map.removeLayer(selectionMarker);
                                const pinIcon = L.divIcon({ className: 'bg-transparent', html: `<div class="relative -mt-8 flex flex-col items-center animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-lg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg><div class="w-3 h-1 bg-black/30 blur-sm rounded-full mt-[-2px]"></div></div>`, iconSize: [32, 32], iconAnchor: [16, 32] });
                                selectionMarker = L.marker([latDec, lngDec], {icon: pinIcon}).addTo(map);

                                // Enable save button
                                saveBtn.disabled = false;
                                saveBtn.classList.remove('bg-slate-600', 'hover:bg-slate-600', 'cursor-not-allowed');
                                saveBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                                saveBtn.innerText = translations[lang].btn_save_cloud;

                                // Reverse geocode to show address
                                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latDec}&lon=${lngDec}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        const addr = data.display_name ? data.display_name.split(',').slice(0, 2).join(',') : "Alamat tidak ditemukan";
                                        if(svPreview) svPreview.innerHTML = `<p class="text-[10px] text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> Lokasi Foto Ditemukan!</p><p class="text-[10px] text-white font-bold">${addr}</p><p class="text-[9px] text-slate-500">Koordinat: ${latDec.toFixed(5)}, ${lngDec.toFixed(5)}</p>`;
                                        lucide.createIcons();
                                    })
                                    .catch(() => {
                                        if(svPreview) svPreview.innerHTML = `<p class="text-[10px] text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> Lokasi dari Foto!</p><p class="text-[10px] text-slate-500">Koordinat: ${latDec.toFixed(5)}, ${lngDec.toFixed(5)}</p>`;
                                        lucide.createIcons();
                                    });
                            } else {
                                handleNoGPS(svPreview, saveBtn);
                            }
                        } else {
                            handleNoGPS(svPreview, saveBtn);
                        }
                    });
                }, 200);
            }
        }

        function clearImage() {
            document.getElementById('spotPhoto').value = ''; // Reset input file
            document.getElementById('imagePreviewContainer').classList.add('hidden');
            document.getElementById('upload-placeholder').classList.remove('hidden');
            if(currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = null;
            }
        }

        function openAddModal(isContribution = false) {
            closeLocationPanel(); // Tutup panel bawah
            document.getElementById('addModal').classList.remove('translate-y-full');
            isContributionMode = isContribution; // Set flag mode
            
            const saveBtn = document.getElementById('btnSaveSpot');
            const svPreview = document.getElementById('sv-preview');

            if(!isContribution) {
                // Mode: ADD NEW SPOT
                // Reset form
                document.getElementById('spotName').classList.remove('hidden');
                document.getElementById('spotName').value = '';
                document.getElementById('spotRating').value = '';
                document.getElementById('spotWeight').value = '';
                document.getElementById('spotComment').value = '';
                setRating(0); // Reset stars
                clearImage();
                document.getElementById('addModalTitle').innerHTML = `<i data-lucide="map-pin" class="text-blue-500"></i> <span data-i18n="modal_add_title">Tambah Spot</span>`;
                
                // Disable save button, force user to select photo with GPS
                saveBtn.disabled = true;
                saveBtn.classList.add('bg-slate-600', 'hover:bg-slate-600', 'cursor-not-allowed');
                saveBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
                saveBtn.innerText = "Pilih Foto Dengan Lokasi";

                svPreview.classList.remove('hidden');
                svPreview.innerHTML = `<div class="bg-slate-800 p-2 rounded-lg shrink-0"><i data-lucide="alert-circle" class="w-5 h-5 text-yellow-400"></i></div><div><p class="text-xs font-bold text-white uppercase mb-0.5">Wajib Foto dengan GPS</p><p class="text-[10px] text-slate-400 leading-relaxed">Hanya foto yang memiliki data lokasi GPS yang bisa diunggah.</p></div>`;
                lucide.createIcons();
            } else {
                // Mode: ADD REVIEW (spot already exists)
                // Save button must be active
                document.getElementById('spotName').classList.add('hidden');
                saveBtn.disabled = false;
                saveBtn.classList.remove('bg-slate-600', 'hover:bg-slate-600', 'cursor-not-allowed');
                saveBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                document.getElementById('btnSaveSpot').innerText = "Posting";
                
                // Sembunyikan info GPS karena tidak wajib untuk ulasan
                svPreview.classList.add('hidden');
            }
            // Re-apply translation to ensure button text is correct
            changeLanguage(localStorage.getItem('appLang') || 'id');
            lucide.createIcons();
        }

        function closeModal() { document.getElementById('addModal').classList.add('translate-y-full'); }

        // Fungsi Kompresi Gambar (Mencegah Crash di iPhone)
        function compressImage(file, maxWidth = 1000, quality = 0.7) {
            return new Promise((resolve, reject) => {
                const img = document.createElement('img');
                const url = URL.createObjectURL(file);
                img.src = url;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
                    } else {
                        if (height > maxWidth) { width *= maxWidth / height; height = maxWidth; }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        URL.revokeObjectURL(url);
                        if(blob) resolve(blob);
                        else reject(new Error("Compression failed"));
                    }, 'image/jpeg', quality);
                };
                img.onerror = (e) => {
                    URL.revokeObjectURL(url);
                    reject(e);
                };
            });
        }

        // Fungsi Validasi Lokasi (Cek apakah Air atau Darat)
        async function checkLocationValidity(lat, lng) {
            try {
                // Gunakan Nominatim untuk cek tipe lokasi
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                const data = await res.json();
                
                const type = (data.type || '').toLowerCase();
                const category = (data.category || '').toLowerCase();
                const displayName = (data.display_name || '').toLowerCase();
                
                // 1. Whitelist: Jika terdeteksi air, langsung lolos
                const waterKeywords = ['water', 'lake', 'river', 'sea', 'ocean', 'pond', 'reservoir', 'stream', 'canal', 'bay', 'coast', 'beach', 'dam', 'wetland', 'harbor', 'wharf', 'pier'];
                const idKeywords = ['danau', 'sungai', 'laut', 'pantai', 'waduk', 'kali', 'bendungan', 'embung', 'rawa', 'teluk', 'samudra', 'air', 'dermaga', 'muara'];
                
                if (waterKeywords.includes(type) || waterKeywords.includes(category)) return { valid: true };
                if (waterKeywords.some(k => displayName.includes(k)) || idKeywords.some(k => displayName.includes(k))) return { valid: true };

                // 2. Blacklist: Jika terdeteksi daratan keras (Gunung, Gedung, Jalan)
                const mountainTypes = ['peak', 'volcano', 'mountain', 'hill', 'ridge', 'cliff', 'saddle', 'wood', 'forest', 'grassland'];
                if (mountainTypes.includes(type)) return { valid: false, reason: `Lokasi terdeteksi sebagai ${type} (Daratan/Gunung). Harap pilih lokasi perairan.` };
                
                if (category === 'building') return { valid: false, reason: "Lokasi terdeteksi sebagai Bangunan." };
                
                return { valid: true }; // Lolos jika tidak masuk blacklist (untuk mengakomodasi GPS yang kurang akurat di pinggir sungai)
            } catch(e) { return { valid: true }; } // Skip jika offline
        }

        async function saveSpotCloud() {
            const name = document.getElementById('spotName').value;
            const rating = document.getElementById('spotRating').value;
            const weight = document.getElementById('spotWeight').value;
            const comment = document.getElementById('spotComment').value;
            const fileInput = document.getElementById('spotPhoto');
            const originalFile = fileInput.files[0];
            let fileToUpload = originalFile;

            if(!name && !isContributionMode) { 
                showCustomAlert("Form Belum Lengkap", "<b>Nama Spot / Ikan</b> wajib diisi.", "pencil", "yellow");
                return;
            }

            if(!tempLatlng) {
                showCustomAlert("Lokasi Belum Dipilih", "Silakan pilih lokasi di peta atau unggah foto dengan data GPS.", "map-pin", "yellow");
                return;
            }

            // For contributions, a comment or a photo is required.
            if(isContributionMode && !comment && !originalFile) {
                showCustomAlert("Ulasan Kosong", "Mohon tambahkan <b>foto atau komentar</b> untuk memberikan ulasan pada spot ini.", "message-square", "yellow");
                return;
            }
            const btn = document.getElementById('btnSaveSpot');
            const oldText = btn.innerText;
            
            // 0. Validasi Lokasi (Anti-Gunung/Darat)
            btn.innerHTML = '<i data-lucide="map-pin" class="w-3 h-3 inline mr-1 animate-bounce"></i> Cek Lokasi...';
            lucide.createIcons();
            btn.disabled = true;
            
            const locCheck = await checkLocationValidity(tempLatlng.lat, tempLatlng.lng);
            if(!locCheck.valid) {
                const proceed = confirm(`⚠️ Peringatan Lokasi\n\n${locCheck.reason}\nSistem mendeteksi ini bukan perairan.\n\nApakah Anda yakin lokasi ini benar (misal: Danau di Gunung)?`);
                if(!proceed) {
                    btn.innerText = oldText;
                    btn.disabled = false;
                    return;
                }
            }
            
            // 0.5. Kompresi Gambar (PENTING: Mencegah Crash Memori iPhone)
            if (originalFile) {
                btn.innerText = "Memproses...";
                btn.disabled = true;
                try {
                    // Kompres ke max 1000px, kualitas 0.7 (Sangat ringan & aman untuk upload)
                    fileToUpload = await compressImage(originalFile, 1000, 0.7);
                } catch (e) {
                    console.warn("Gagal kompres, pakai file asli", e);
                }
            }
            
            // 1. Validasi AI (Jika ada file)
            if(fileToUpload) {
                btn.innerHTML = '<i data-lucide="scan" class="w-3 h-3 inline mr-1 animate-pulse"></i> Menganalisa...';
                lucide.createIcons();
                btn.disabled = true;

                try {
                    const isFish = await detectFish(fileToUpload);
                    if(!isFish) {
                        showCustomAlert(
                            "Gambar Ditolak", 
                            "Sistem AI mendeteksi gambar ini <b>bukan ikan</b>.<br>Mohon unggah foto hasil pancingan yang valid.",
                            "shield-x",
                            "red"
                        );
                        btn.innerText = oldText;
                        btn.disabled = false;
                        return; // Stop process
                    }
                } catch(e) {
                    console.error("AI Error, skipping validation:", e);
                }
                btn.innerText = "Menyimpan...";
            }

            // 2. Upload Gambar ke ImgBB (Hosting Gratis)
            let photoUrl = "";
            if (fileToUpload) {
                btn.innerText = "Mengupload Gambar...";
                try {
                    const formData = new FormData();
                    formData.append("image", fileToUpload, "image.jpg"); // Tambahkan nama file untuk Blob
                    
                    // Kirim ke ImgBB
                    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                        method: "POST",
                        body: formData
                    });
                    const data = await res.json();
                    
                    if(data.success) {
                        photoUrl = data.data.url; // Dapat Link Gambar!
                    } else {
                        throw new Error("Gagal upload ke ImgBB");
                    }
                } catch(e) {
                    alert("Gagal upload gambar. Pastikan API Key ImgBB benar.");
                    btn.innerText = "Simpan ke Cloud"; btn.disabled = false;
                    return;
                }
            }

            // 3. Simpan Data ke Google Sheets
            btn.innerText = "Posting...";
            const spotData = {
                name: name,
                lat: tempLatlng.lat,
                lng: tempLatlng.lng,
                photo: photoUrl,
                uid: currentUser.email,
                createdAt: new Date().toISOString(),
                rating: rating,
                comment: comment,
                weight: weight || 0
            };

            // Kirim data ke Google Apps Script
            if(GOOGLE_SCRIPT_URL.startsWith("http")) {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    body: JSON.stringify(spotData)
                }).then(() => {
                    loadSpots(); // Reload semua spot untuk update grouping
                    closeModal();
                    
                    // Tampilkan detail spot baru (ala Instagram)
                    openSpotDetail([spotData]);
                    map.flyTo([spotData.lat, spotData.lng], 16);
                    
                    btn.innerText = "Posting"; btn.disabled = false;
                }).catch(err => {
                    console.error(err);
                    alert("Gagal koneksi ke Google Sheet. Cek URL Script.");
                    btn.innerText = "Posting"; btn.disabled = false;
                });
            } else {
                // Fallback LocalStorage jika URL belum diisi
                let local = JSON.parse(localStorage.getItem('spots') || '[]');
                local.push(spotData);
                localStorage.setItem('spots', JSON.stringify(local));
                loadSpots();
                closeModal();
                
                // Tampilkan detail spot baru (ala Instagram)
                openSpotDetail([spotData]);
                map.flyTo([spotData.lat, spotData.lng], 16);
                
                btn.innerText = "Posting"; btn.disabled = false;
            }
        }

        function detectFish(file) {
            return new Promise((resolve) => {
                const img = document.createElement('img');
                const objectURL = URL.createObjectURL(file);
                img.src = objectURL;
                
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const MAX_SIZE = 224;
                    
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                    } else {
                        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const imageData = ctx.getImageData(0, 0, width, height);
                    URL.revokeObjectURL(objectURL);

                    const worker = getAiWorker();

                    const handleMessage = (e) => {
                        const { type, predictions, message } = e.data;
                        worker.removeEventListener('message', handleMessage);

                        if (type === 'result') {
                            console.log("AI Predictions:", predictions);
                            const fishKeywords = ['fish', 'shark', 'ray', 'eel', 'trout', 'salmon', 'bass', 'pike', 'carp', 'tench', 'barracouta', 'coho', 'gar', 'sturgeon', 'marlin', 'anemone', 'seahorse', 'goldfish', 'whaleshark', 'hammerhead', 'crab', 'lobster', 'lionfish'];
                            const match = predictions.find(p => fishKeywords.some(k => p.className.toLowerCase().includes(k)));

                            if (match) {
                                if (match.probability < 0.2) { resolve("Ikan (Jenis Tidak Pasti)"); return; }
                                let name = match.className.split(',')[0].toLowerCase();
                                for (const [eng, id] of Object.entries(fishTranslations)) {
                                    if (name.includes(eng)) { name = id; break; }
                                }
                                resolve(name.charAt(0).toUpperCase() + name.slice(1));
                            } else {
                                resolve(null);
                            }
                        } else if (type === 'error') {
                            console.error("AI Worker Error:", message);
                            resolve(null);
                        }
                    };

                    worker.addEventListener('message', handleMessage);
                    worker.postMessage({ imageData: { data: imageData.data, width: imageData.width, height: imageData.height } });
                };
                
                img.onerror = () => {
                    URL.revokeObjectURL(objectURL);
                    resolve(null);
                }
            });
        }

        // Helper: Tentukan Warna & Icon berdasarkan Berat Terbesar
        function getSpotStyle(maxWeight) {
            // Base classes (Solid Colors)
            let solidColor = 'bg-blue-600';
            let ringColor = 'ring-blue-400/80'; // Ring lebih tebal/terang
            let typeClass = 'marker-blue'; // For CSS targeting
            let pulse = '';
            let shadowClass = 'shadow-[0_0_30px_rgba(59,130,246,0.8)]'; // Default Blue Glow Strong
            
            if (maxWeight >= 10) { // Besar (> 10kg) -> MERAH
                solidColor = 'bg-red-600';
                ringColor = 'ring-red-500/80';
                typeClass = 'marker-red';
                pulse = 'animate-pulse';
                shadowClass = 'shadow-[0_0_40px_rgba(225,29,72,0.9)]'; // Red Glow Strong
            } else if (maxWeight >= 3) { // Sedang (3kg - 10kg) -> KUNING/ORANGE
                solidColor = 'bg-yellow-500';
                ringColor = 'ring-yellow-400/80';
                typeClass = 'marker-yellow';
                shadowClass = 'shadow-[0_0_35px_rgba(234,179,8,0.8)]'; // Yellow Glow Strong
            }

            return L.divIcon({
                className: 'custom-fish-icon',
                html: `
                    <div class="relative group flex flex-col items-center">
                        <div class="fish-marker-body ${typeClass} w-11 h-11 ${solidColor} rounded-full border-[3px] border-white ring-4 ${ringColor} ${shadowClass} flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${pulse}">
                            <!-- Glossy Effect -->
                            <div class="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 to-transparent opacity-100 pointer-events-none"></div>
                            <!-- Icon -->
                            <i data-lucide="fish" class="text-white w-6 h-6 drop-shadow-md relative z-20"></i>
                            <!-- Notification Dot for Monster -->
                            ${maxWeight >= 10 ? '<div class="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm z-30"><div class="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div></div>' : ''}
                        </div>
                        <!-- Pin Point / Shadow -->
                        <div class="w-1 h-3 bg-gradient-to-b from-gray-400 to-transparent opacity-50 -mt-1"></div>
                        <div class="w-8 h-2 bg-black/30 blur-sm rounded-[100%] absolute bottom-[-4px] group-hover:scale-75 transition-transform duration-300"></div>
                    </div>
                `,
                iconSize: [44, 56],
                iconAnchor: [22, 56],
                popupAnchor: [0, -50]
            });
        }

        // Fungsi Render Marker (Updated untuk Grouping)
        function addMarker(key, group) {
            // Ambil data utama dari entri pertama atau yang paling baru
            const mainSpot = group[0];
            const count = group.length;
            
            // Hitung rata-rata rating
            let totalRating = 0;
            let ratingCount = 0;
            
            // Cari Berat Terbesar di Spot Ini
            let maxWeight = 0;

            group.forEach(g => {
                if(g.rating) { totalRating += parseInt(g.rating); ratingCount++; }
                if(g.weight) { 
                    const w = parseFloat(g.weight);
                    if(w > maxWeight) maxWeight = w;
                }
            });
            const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : "Baru";

            // Cari foto terbaik (yang ada fotonya)
            const coverPhoto = group.find(g => g.photo)?.photo || '';

            // Tentukan Icon berdasarkan Max Weight
            const dynamicIcon = getSpotStyle(maxWeight);

            // ID unik untuk elemen alamat
            const addrId = 'addr-' + Math.random().toString(36).substr(2, 9);

            const popupHtml = `
                <div class="w-64 bg-slate-900/90 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-2xl overflow-hidden pb-1">
                    ${coverPhoto ? `<div class="h-36 w-full relative group cursor-pointer" onclick="openSpotDetailByKey('${key}')">
                        <img src="${coverPhoto}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        <div class="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1"><i data-lucide="image" class="w-3 h-3"></i> ${count}</div>
                    </div>` : '<div class="h-16 bg-gradient-to-r from-blue-600 to-purple-600 relative"><div class="absolute -bottom-6 left-4 w-12 h-12 bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center"><i data-lucide="fish" class="text-blue-400 w-6 h-6"></i></div></div>'}
                    
                    <div class="px-4 pt-3 pb-3">
                        <h4 class="font-black text-lg text-white leading-tight mb-1 truncate">${mainSpot.name}</h4>
                        
                        <div class="flex items-center gap-1 text-[10px] text-slate-400 mb-2">
                            <i data-lucide="map-pin" class="w-3 h-3"></i> <span id="${addrId}">Memuat lokasi...</span>
                        </div>
                        
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-1 text-xs text-yellow-400 font-bold"><i data-lucide="star" class="w-3 h-3 fill-current"></i> ${avgRating}</div>
                            ${maxWeight > 0 ? `<div class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1"><i data-lucide="trophy" class="w-3 h-3"></i> ${maxWeight} kg</div>` : ''}
                        </div>
                        
                        <button onclick="openSpotDetailByKey('${key}')" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-blue-300 hover:text-white text-xs py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            LIHAT DETAIL
                        </button>
                    </div>
                </div>
            `;
            
            // Simpan maxWeight di options marker untuk filtering nanti
            const marker = L.marker([mainSpot.lat, mainSpot.lng], {icon: dynamicIcon, maxWeight: maxWeight}).addTo(map).bindPopup(popupHtml);
            
            // Event saat popup dibuka: Fetch Nama Lokasi
            marker.on('popupopen', () => {
                lucide.createIcons(); // Fix: Render ikon di dalam popup saat dibuka
                const el = document.getElementById(addrId);
                if(el && el.innerText === "Memuat lokasi...") {
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${mainSpot.lat}&lon=${mainSpot.lng}`)
                        .then(res => res.json())
                        .then(data => {
                            const addr = data.address;
                            let locName = "";
                            
                            // Prioritas Nama: Desa > Kecamatan > Kota
                            if(addr.village) locName = addr.village;
                            else if(addr.hamlet) locName = addr.hamlet;
                            else if(addr.town) locName = addr.town;
                            else if(addr.city) locName = addr.city;
                            else if(addr.county) locName = addr.county;
                            
                            // Tambahkan detail kedua jika ada (misal: Desa, Kota)
                            if(locName) {
                                if(addr.city && locName !== addr.city) locName += `, ${addr.city}`;
                                else if(addr.county && locName !== addr.county) locName += `, ${addr.county}`;
                            } else {
                                locName = "Lokasi Terpencil";
                            }

                            el.innerText = locName;
                        })
                        .catch(() => {
                            el.innerText = `${parseFloat(mainSpot.lat).toFixed(4)}, ${parseFloat(mainSpot.lng).toFixed(4)}`;
                        });
                }
            });

            allMarkers.push(marker);
            
            lucide.createIcons(); // Refresh icon di dalam popup
        }

        // Helper function untuk membuka detail dari popup (menggunakan key global)
        function openSpotDetailByKey(key) {
            if(groupedSpots[key]) {
                openSpotDetail(groupedSpots[key]);
            }
        }

        function openSpotDetail(group) {
            const main = group[0];
            currentDetailSpot = main; // Simpan referensi untuk "Tambah Kontribusi"
            
            // Hitung Stats
            let totalR = 0, countR = 0;
            let maxW = 0;
            group.forEach(g => { if(g.rating) { totalR += parseInt(g.rating); countR++; } });
            group.forEach(g => { if(g.weight && parseFloat(g.weight) > maxW) maxW = parseFloat(g.weight); });
            
            const avg = countR > 0 ? (totalR / countR).toFixed(1) : "0.0";
            
            // Populate UI
            document.getElementById('detail-name').innerText = main.name;
            document.getElementById('detail-count').innerText = group.length;
            document.getElementById('detail-max-weight').innerText = maxW > 0 ? maxW + " kg" : "-";
            document.getElementById('detail-rating-text').innerText = `(${avg} dari ${countR} ulasan)`;
            updateFavoriteBtn(); // Update status tombol favorit
            
            document.getElementById('detail-img').src = group.find(g => g.photo)?.photo || 'https://via.placeholder.com/400x200?text=No+Image';
            
            // Render Stars
            const starsContainer = document.getElementById('detail-rating-stars');
            starsContainer.innerHTML = '';
            for(let i=1; i<=5; i++) {
                starsContainer.innerHTML += `<i data-lucide="star" class="w-4 h-4 ${i <= Math.round(avg) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}"></i>`;
            }

            // Render Comments List
            const list = document.getElementById('detail-comments');
            list.innerHTML = '';
            
            // Urutkan dari yang terbaru
            group.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Pisahkan data: Ada Foto vs Hanya Teks
            const withPhotos = group.filter(g => g.photo);
            const textOnly = group.filter(g => !g.photo);

            // 1. BAGIAN KOMENTAR TEKS (Accordion / Bisa dibuka-tutup)
            if(textOnly.length > 0) {
                const accId = 'acc-' + Math.random().toString(36).substr(2,5);
                list.innerHTML += `
                    <div class="mb-6 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
                        <button onclick="document.getElementById('${accId}').classList.toggle('hidden')" class="w-full p-4 flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-colors">
                            <span class="text-xs font-bold text-slate-300 flex items-center gap-2">
                                <i data-lucide="message-square" class="w-4 h-4 text-blue-400"></i> 
                                Komentar Tanpa Foto (${textOnly.length})
                            </span>
                            <i data-lucide="chevron-down" class="w-4 h-4 text-slate-500"></i>
                        </button>
                        <div id="${accId}" class="hidden divide-y divide-white/5">
                            ${textOnly.map(g => `
                                <div class="p-3">
                                    <div class="flex justify-between items-start mb-1">
                                        <span class="text-[10px] font-bold text-slate-400">${g.uid.split('@')[0]}</span>
                                        <span class="text-[9px] text-slate-600">${new Date(g.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    ${g.rating ? `<div class="flex text-yellow-400 scale-75 origin-left mb-1">${Array(parseInt(g.rating)).fill('<i data-lucide="star" class="w-3 h-3 fill-current"></i>').join('')}</div>` : ''}
                                    <p class="text-xs text-slate-300 mt-1">${g.comment || '-'}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // 2. BAGIAN FOTO (Grid Katalog 2 Kolom)
            if(withPhotos.length > 0) {
                let grid = `<div class="grid grid-cols-2 gap-3">`;
                withPhotos.forEach(g => {
                    const stars = g.rating ? `<div class="flex text-yellow-400 scale-75 origin-left mb-1">${Array(parseInt(g.rating)).fill('<i data-lucide="star" class="w-3 h-3 fill-current"></i>').join('')}</div>` : '';
                    const weight = g.weight && g.weight > 0 ? `<div class="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-md font-bold border border-emerald-500/30 flex items-center gap-1"><i data-lucide="fish" class="w-3 h-3"></i> ${g.weight}kg</div>` : '';
                    
                    grid += `
                        <div class="bg-slate-900 rounded-xl border border-white/5 overflow-hidden flex flex-col shadow-lg">
                            <div class="relative aspect-[4/5] bg-slate-800 group cursor-pointer" onclick="openImageLightbox('${g.photo}')">
                                <img src="${g.photo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                                ${weight}
                                <div class="absolute bottom-2 left-2">
                                    <p class="text-[9px] font-bold text-white shadow-black drop-shadow-md">${g.uid.split('@')[0]}</p>
                                </div>
                            </div>
                            <div class="p-3 flex-1 flex flex-col">
                                ${stars}
                                <p class="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">${g.comment || 'Tanpa keterangan'}</p>
                            </div>
                        </div>
                    `;
                });
                grid += `</div>`;
                list.innerHTML += grid;
            }

            document.getElementById('spotDetailModal').classList.remove('hidden');
            
            // --- FIX: Tombol Close Spot Detail ---
            const modal = document.getElementById('spotDetailModal');
            let closeBtn = document.getElementById('spot-floating-close');
            if (!closeBtn) {
                const originalBtn = modal.querySelector('button[onclick*="closeSpotDetail"]');
                if (originalBtn) {
                    closeBtn = originalBtn;
                    closeBtn.id = 'spot-floating-close';
                    document.body.appendChild(closeBtn);
                    
                    closeBtn.style.position = 'fixed';
                    closeBtn.style.top = '20px';
                    closeBtn.style.right = '20px';
                    closeBtn.style.zIndex = '10000';
                    closeBtn.className = "bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-full p-2 hover:bg-red-500/20 transition-all text-white";
                }
            }
            if (closeBtn) {
                closeBtn.classList.remove('hidden');
            }
            
            lucide.createIcons();
        }

        function closeSpotDetail() { 
            document.getElementById('spotDetailModal').classList.add('hidden'); 
            const closeBtn = document.getElementById('spot-floating-close');
            if(closeBtn) closeBtn.classList.add('hidden');
        }

        function addContribution() {
            if(currentDetailSpot) {
                tempLatlng = { lat: Number(currentDetailSpot.lat), lng: Number(currentDetailSpot.lng) };
                document.getElementById('spotName').value = currentDetailSpot.name;
                document.getElementById('spotWeight').value = ''; // Reset berat untuk kontribusi baru
                
                // Update UI Modal untuk Mode Kontribusi
                document.getElementById('addModalTitle').innerHTML = `<i data-lucide="message-circle" class="text-blue-500"></i> Tambah Ulasan`;
                document.getElementById('btnSaveSpot').innerText = "Kirim Ulasan";
                
                closeSpotDetail();
                openAddModal(true); // Pass true menandakan ini mode kontribusi
            }
        }

        async function loadSpots() {
            // Bersihkan marker lama (kecuali user & search)
            allMarkers.forEach(m => map.removeLayer(m));
            allMarkers = [];
            
            // Reset grouping global
            groupedSpots = {};

            // 1. Ambil Data LocalStorage (sebagai base)
            let local = JSON.parse(localStorage.getItem('spots') || '[]');
            local.forEach(item => {
                const key = item.spotId || (item.lat + ',' + item.lng);
                if(!groupedSpots[key]) groupedSpots[key] = [];
                groupedSpots[key].push(item);
            });

            // 2. Ambil Data Google Sheets (Async) & Merge
            if(GOOGLE_SCRIPT_URL.startsWith("http")) {
                try {
                    const res = await fetch(GOOGLE_SCRIPT_URL);
                    const data = await res.json();
                    
                    data.forEach(item => {
                        const key = item.spotId || (item.lat + ',' + item.lng);
                        if(!groupedSpots[key]) groupedSpots[key] = [];
                        groupedSpots[key].push(item);
                    });
                    
                } catch(e) { console.log("Gagal load Sheet:", e); }
            }
            
            // 3. Render Semua Marker dari Grouping yang sudah terkumpul
            Object.keys(groupedSpots).forEach(key => addMarker(key, groupedSpots[key]));
            
            lucide.createIcons();
            handleZoomEffect(); // Update tampilan setelah load
        }

        function locateUser() {
            map.locate({setView: true, maxZoom: 15, enableHighAccuracy: true});
        }
        
        map.on('locationfound', e => {
            // Hapus marker lokasi lama jika ada agar tidak menumpuk
            if (userLocationMarker) map.removeLayer(userLocationMarker);
            
            // Cleanup legacy markers (jika ada sisa dari versi lama)
            map.eachLayer(layer => {
                if(layer instanceof L.CircleMarker && layer.options.color === '#3b82f6') {
                    map.removeLayer(layer);
                }
            });

            // Icon Lokasi User Keren (Pulsing Blue Dot)
            const userIcon = L.divIcon({
                className: 'bg-transparent',
                html: `
                    <div class="relative flex items-center justify-center w-16 h-16">
                        <div class="absolute w-12 h-12 bg-blue-500 rounded-full opacity-40 animate-ping"></div>
                        <div class="relative w-5 h-5 bg-blue-600 border-[3px] border-white rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10"></div>
                    </div>
                `,
                iconSize: [64, 64],
                iconAnchor: [32, 32]
            });

            userLocationMarker = L.marker(e.latlng, {icon: userIcon, zIndexOffset: 1000}).addTo(map);
            
            // PERBAIKAN: Update data cuaca saat lokasi GPS ditemukan via tombol
            // Ini memastikan cuaca tidak lagi menggunakan data IP Address lama
            userLatlng = e.latlng;
            localStorage.setItem('lastLat', e.latlng.lat);
            localStorage.setItem('lastLng', e.latlng.lng);
            fetchUserWeather(e.latlng.lat, e.latlng.lng);
        });

        map.on('locationerror', e => {
            // Handler jika user menolak atau GPS mati saat tombol ditekan
            if (e.code === 1) {
                alert("⚠️ Akses Lokasi Ditolak\n\nBrowser memblokir lokasi. Silakan ketuk ikon gembok di address bar > Izin > Lokasi: Izinkan/Allow, lalu coba lagi.");
            } else {
                alert("⚠️ Lokasi Tidak Ditemukan\n\nPastikan GPS aktif dan sinyal stabil.");
            }
        });

        // --- FITUR BARU: CARI SPOT TERDEKAT ---
        function findNearestSpot() {
            // 1. Cek apakah lokasi user sudah ada
            if (!userLatlng) {
                alert("Lokasi Anda belum ditemukan. Aktifkan GPS dan coba lagi.");
                locateUser(); // Coba aktifkan pencarian lokasi
                return;
            }

            // 2. Cek apakah sudah ada spot di peta
            if (allMarkers.length === 0) {
                alert("Belum ada spot yang dimuat di peta. Mohon tunggu sebentar.");
                return;
            }

            let nearestMarker = null;
            let minDistance = Infinity;

            // 3. Hitung jarak ke setiap spot
            allMarkers.forEach(marker => {
                const spotLatLng = marker.getLatLng();
                const distance = userLatlng.distanceTo(spotLatLng);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestMarker = marker;
                }
            });

            // 4. Arahkan ke spot terdekat
            if (nearestMarker) {
                const spotLatLng = nearestMarker.getLatLng();
                map.flyTo(spotLatLng, 16); // Zoom lebih dekat
                nearestMarker.openPopup();

                // Gambar garis lurus dari user ke spot
                if(currentRouteLine) map.removeLayer(currentRouteLine);
                currentRouteLine = L.polyline([userLatlng, spotLatLng], { color: '#10b981', weight: 5, opacity: 0.8, dashArray: '10, 5' }).addTo(map);
            } else {
                alert("Tidak dapat menemukan spot terdekat.");
            }
        }

        // --- LIGHTBOX FUNCTIONS ---
        function openImageLightbox(url) {
            document.getElementById('lightbox-img').src = url;
            document.getElementById('lightboxModal').classList.remove('hidden');
        }
        
        function closeImageLightbox() {
            document.getElementById('lightboxModal').classList.add('hidden');
            setTimeout(() => { document.getElementById('lightbox-img').src = ''; }, 300);
        }

        // --- CUSTOM ALERT MODAL ---
        function showCustomAlert(title, message, icon = 'alert-triangle', color = 'red') {
            const modal = document.getElementById('customAlertModal');
            document.getElementById('alert-title').innerText = title;
            document.getElementById('alert-message').innerHTML = message; // Use innerHTML to allow for <b> tags

            const iconEl = document.getElementById('alert-icon');
            iconEl.setAttribute('data-lucide', icon);

            const iconContainer = document.getElementById('alert-icon-container');
            const closeBtn = document.getElementById('alert-button');
            const modalContent = modal.querySelector('.glass');
            
            // Reset classes
            iconContainer.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4';
            iconEl.className = 'w-8 h-8';
            closeBtn.className = 'w-full py-3 rounded-xl font-bold transition-all shadow-lg text-white';
            modalContent.className = 'glass w-full max-w-sm p-8 rounded-[2rem] animate-in zoom-in-90 duration-300 relative m-4 shadow-2xl text-center';

            if (color === 'red') {
                modalContent.classList.add('border-red-500/30');
                iconContainer.classList.add('bg-red-500/20', 'border-red-500/30');
                iconEl.classList.add('text-red-400');
                closeBtn.classList.add('bg-red-600', 'hover:bg-red-500');
            } else if (color === 'yellow') {
                modalContent.classList.add('border-yellow-500/30');
                iconContainer.classList.add('bg-yellow-500/20', 'border-yellow-500/30');
                iconEl.classList.add('text-yellow-400');
                closeBtn.classList.add('bg-yellow-600', 'hover:bg-yellow-500');
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            lucide.createIcons();
        }

        function closeCustomAlert() {
            const modal = document.getElementById('customAlertModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // --- SCROLL DOTS INDICATOR ---
        function initScrollDots() {
            const container = document.getElementById('weather-scroll');
            const dotsContainer = document.getElementById('scroll-dots');
            if(!container || !dotsContainer) return;
            
            // Hitung estimasi halaman berdasarkan lebar container dan item
            const itemWidth = 112; // min-w-[100px] + gap (approx)
            const containerWidth = container.clientWidth || window.innerWidth;
            const totalItems = 9; // Jumlah kartu cuaca (Added SST)
            const totalWidth = totalItems * itemWidth;
            const pages = Math.ceil(totalWidth / containerWidth);
            
            let html = '';
            for(let i=0; i<pages; i++) {
                html += `<div class="h-1.5 rounded-full transition-all duration-300 ${i===0 ? 'bg-white w-4' : 'bg-slate-600 w-1.5'}" id="dot-${i}"></div>`;
            }
            dotsContainer.innerHTML = html;
            container.onscroll = updateScrollDots;
        }

        function updateScrollDots() {
            const container = document.getElementById('weather-scroll');
            if(!container) return;
            
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const page = Math.round(scrollLeft / width);
            
            const dots = document.getElementById('scroll-dots').children;
            for(let i=0; i<dots.length; i++) {
                if(i === page) {
                    dots[i].classList.remove('bg-slate-600', 'w-1.5');
                    dots[i].classList.add('bg-white', 'w-4');
                } else {
                    dots[i].classList.add('bg-slate-600', 'w-1.5');
                    dots[i].classList.remove('bg-white', 'w-4');
                }
            }
        }
        
        // --- NEW MAP SETTINGS & LAYERS FUNCTIONS ---
        function openMapSettings() {
            document.getElementById('mapSettingsModal').classList.remove('translate-y-full');
            if(typeof updateOfflineList === 'function') updateOfflineList(); // Refresh list saat menu dibuka
            lucide.createIcons();
        }

        function closeMapSettings() {
            document.getElementById('mapSettingsModal').classList.add('translate-y-full');
        }

        // --- FITUR BARU: KOMPAS DIGITAL ---
        function initCompass() {
            // Cek agar tidak double render
            if(document.getElementById('map-compass-control')) return;

            const CompassControl = L.Control.extend({
                options: { position: 'topright' },
                onAdd: function(map) {
                    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                    container.id = 'map-compass-control';
                    container.style.backgroundColor = '#0f172a';
                    container.style.border = '1px solid rgba(255,255,255,0.1)';
                    container.style.borderRadius = '50%';
                    container.style.width = '44px';
                    container.style.height = '44px';
                    container.style.display = 'flex';
                    container.style.alignItems = 'center';
                    container.style.justifyContent = 'center';
                    container.style.cursor = 'pointer';
                    container.style.marginTop = '80px'; // Turunkan posisi agar tidak tertutup search bar
                    container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    
                    // Ikon Kompas Custom (Jarum Merah = Utara)
                    container.innerHTML = `
                        <div id="compass-icon" class="transition-transform duration-300">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-md">
                                <path d="M12 2L16 12H8L12 2Z" fill="#ef4444"/> <!-- Utara (Merah) -->
                                <path d="M12 22L8 12H16L12 22Z" fill="#e2e8f0"/> <!-- Selatan (Putih) -->
                                <circle cx="12" cy="12" r="2" fill="#0f172a"/>
                                <text x="12" y="7.5" font-family="sans-serif" font-size="3.5" font-weight="900" fill="white" text-anchor="middle">N</text>
                            </svg>
                        </div>`;
                    
                    // Handler Klik (Penting untuk Izin iOS)
                    container.onclick = function() {
                        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                            // Khusus iOS 13+ (Butuh Izin User)
                            DeviceOrientationEvent.requestPermission()
                                .then(response => {
                                    if (response === 'granted') {
                                        window.addEventListener('deviceorientation', handleOrientation);
                                        alert("Kompas Aktif! Putar HP Anda.");
                                    } else {
                                        alert("Izin Kompas Ditolak.");
                                    }
                                })
                                .catch(console.error);
                        } else {
                            // Android / Browser Biasa
                            window.addEventListener('deviceorientation', handleOrientation);
                            alert("Kompas Diaktifkan (Jika sensor tersedia).");
                        }
                    };
                    return container;
                }
            });
            map.addControl(new CompassControl());
            lucide.createIcons();
        }

        function handleOrientation(e) {
            const icon = document.getElementById('compass-icon');
            if(!icon) return;
            
            let heading = 0;
            if(e.webkitCompassHeading) heading = e.webkitCompassHeading; // iOS
            else if(e.alpha) heading = 360 - e.alpha; // Android (Fallback)
            
            // Putar ikon berlawanan arah heading agar jarum selalu menunjuk Utara
            icon.style.transform = `rotate(${-heading}deg)`;
        }

        function setBaseMap(type) {
            if (typeof map === 'undefined') return;
            
            // Update UI Buttons
            const btnSat = document.getElementById('btn-map-sat');
            const btnStreet = document.getElementById('btn-map-street');
            const btnOcean = document.getElementById('btn-map-ocean');

            // Reset borders
            [btnSat, btnStreet, btnOcean].forEach(btn => {
                if(btn) { btn.classList.remove('border-blue-500'); btn.classList.add('border-transparent'); }
            });
            
            if(type === 'satellite') {
                map.removeLayer(streetLayer); map.removeLayer(oceanLayer); map.addLayer(satLayer);
                isSat = true;
                if(btnSat) { btnSat.classList.add('border-blue-500'); btnSat.classList.remove('border-transparent'); }
            } else if(type === 'street') {
                map.removeLayer(satLayer); map.removeLayer(oceanLayer); map.addLayer(streetLayer);
                isSat = false;
                if(btnStreet) { btnStreet.classList.add('border-blue-500'); btnStreet.classList.remove('border-transparent'); }
            } else if(type === 'ocean') {
                map.removeLayer(satLayer); map.removeLayer(streetLayer); map.addLayer(oceanLayer);
                isSat = false;
                if(btnOcean) { btnOcean.classList.add('border-blue-500'); btnOcean.classList.remove('border-transparent'); }
            }
            
            // Re-add overlay if exists (because base layer change might hide it)
            Object.values(activeLayers).forEach(layer => {
                if(layer.bringToFront) layer.bringToFront();
            });
        }

        function getGibsDate(daysAgo = 1) {
            const d = new Date();
            d.setDate(d.getDate() - daysAgo);
            return d.toISOString().split('T')[0];
        }

        // --- LAYER PERSISTENCE (SIMPAN PENGATURAN PETA) ---
        function updateLayerStorage() {
            const active = [];
            document.querySelectorAll('input[id^="toggle-"]').forEach(el => {
                if(el.checked) active.push(el.id.replace('toggle-', ''));
            });
            localStorage.setItem('activeMapLayers', JSON.stringify(active));
        }

        // --- HELPER: LEGEND / INDIKATOR PETA ---
        function showLegend(type) {
            let legend = document.getElementById('map-legend-container');
            if(!legend) {
                legend = document.createElement('div');
                legend.id = 'map-legend-container';
                legend.className = 'fixed bottom-24 left-4 z-[1000] bg-slate-900/90 p-3 rounded-xl border border-white/10 shadow-xl backdrop-blur-md max-w-[200px] animate-in slide-in-from-left-5 duration-300';
                document.body.appendChild(legend);
            }
            
            let content = '';
            if(type === 'sst') {
                content = `
                    <h5 class="text-xs font-bold text-white mb-2 flex items-center gap-1"><i data-lucide="thermometer" class="w-3 h-3 text-red-400"></i> Suhu Laut (SST)</h5>
                    <div class="h-2 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-red-500 rounded-full mb-1"></div>
                    <div class="flex justify-between text-[9px] text-slate-300 font-mono">
                        <span>0°C</span><span>15°</span><span>32°C</span>
                    </div>`;
            } else if(type === 'chlorophyll') {
                content = `
                    <h5 class="text-xs font-bold text-white mb-2 flex items-center gap-1"><i data-lucide="sprout" class="w-3 h-3 text-green-400"></i> Klorofil (Plankton)</h5>
                    <div class="h-2 w-full bg-gradient-to-r from-blue-800 via-green-500 to-yellow-300 rounded-full mb-1"></div>
                    <div class="flex justify-between text-[9px] text-slate-300 font-mono">
                        <span>Sedikit</span><span>Sedang</span><span>Subur</span>
                    </div>`;
            }
            
            if(content) {
                legend.innerHTML = content;
                legend.classList.remove('hidden');
                lucide.createIcons();
            }
        }

        function hideLegend() {
            const legend = document.getElementById('map-legend-container');
            if(legend) legend.classList.add('hidden');
        }

        function loadLayerPreferences() {
            try {
                const saved = JSON.parse(localStorage.getItem('activeMapLayers') || '[]');
                saved.forEach(type => {
                    const toggle = document.getElementById(`toggle-${type}`);
                    if(toggle && !toggle.checked) {
                        toggle.checked = true;
                        toggleLayer(type); // Aktifkan layer
                    }
                });
            } catch(e) { console.log("Error restoring layers", e); }
        }

        async function toggleLayer(type) {
            const toggle = document.getElementById(`toggle-${type}`);
            if(!toggle) return;
            
            const isChecked = toggle.checked;
            updateLayerStorage(); // Simpan status terbaru setiap kali di-klik

            // 1. Jika dimatikan (Uncheck)
            if(!isChecked) {
                if(activeLayers[type]) {
                    map.removeLayer(activeLayers[type]);
                    delete activeLayers[type];
                }
                // Sembunyikan legenda otomatis
                hideLegend();
                return;
            }

            // 2. Jika dinyalakan (Check)
            // OPENWEATHERMAP LAYERS (Wind) - Butuh API Key
            if(type === 'wind') {
                if(OWM_API_KEY === "YOUR_OWM_API_KEY" || !OWM_API_KEY) {
                    alert("⚠️ Fitur Peta Angin Memerlukan API Key");
                    toggle.checked = false;
                    updateLayerStorage();
                    return;
                }
                
                if(!map.getPane('weatherPane')) {
                    map.createPane('weatherPane');
                    map.getPane('weatherPane').style.zIndex = 300;
                    map.getPane('weatherPane').style.pointerEvents = 'none';
                }

                activeLayers[type] = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`, {
                    pane: 'weatherPane',
                    opacity: 0.7
                }).addTo(map);
                
                const toast = document.createElement('div');
                toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                toast.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Layer Angin Ditampilkan`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                lucide.createIcons();
                return;
            }

            // EARTHQUAKE LAYER (USGS Feed)
            if(type === 'quake') {
                try {
                    // Mengambil data gempa > 2.5 magnitudo dalam 24 jam terakhir
                    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
                    const data = await res.json();
                    
                    activeLayers[type] = L.geoJSON(data, {
                        pointToLayer: (feature, latlng) => {
                            const mag = feature.properties.mag;
                            // Warna: Merah (>5), Orange (>4), Kuning (Sisanya)
                            const color = mag >= 5 ? '#ef4444' : (mag >= 4 ? '#f97316' : '#eab308');
                            return L.circleMarker(latlng, {
                                radius: Math.max(4, mag * 2.5), // Radius dinamis berdasarkan kekuatan gempa
                                fillColor: color,
                                color: "#fff",
                                weight: 1,
                                opacity: 0.8,
                                fillOpacity: 0.6
                            });
                        },
                        onEachFeature: (feature, layer) => {
                            const p = feature.properties;
                            const d = new Date(p.time).toLocaleString();
                            layer.bindPopup(`<div class="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 min-w-[180px] shadow-xl"><h4 class="font-bold text-sm text-white flex items-center gap-2"><i data-lucide="activity" class="w-4 h-4 text-red-500"></i> Gempa M ${p.mag.toFixed(1)}</h4><p class="text-xs text-slate-300 mt-1 leading-relaxed">${p.place}</p><p class="text-[10px] text-slate-500 mt-2 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${d}</p></div>`);
                            layer.on('popupopen', () => lucide.createIcons());
                        }
                    }).addTo(map);

                    const toast = document.createElement('div');
                    toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                    toast.innerHTML = `<i data-lucide="activity" class="w-4 h-4 text-red-500"></i> Data Gempa Ditampilkan`;
                    document.body.appendChild(toast);
                    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                    lucide.createIcons();
                } catch(e) {
                    alert("Gagal memuat data gempa.");
                    toggle.checked = false;
                    updateLayerStorage();
                }
                return;
            }

            // OPENSEAMAP LAYER (Navigasi Laut)
            if(type === 'seamap') {
                activeLayers[type] = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
                    opacity: 1.0
                }).addTo(map);

                const toast = document.createElement('div');
                toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                toast.innerHTML = `<i data-lucide="anchor" class="w-4 h-4 text-orange-400"></i> Peta Navigasi Laut`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                lucide.createIcons();
                return;
            }

            // PRESSURE LAYER (Tekanan Udara)
            if(type === 'pressure') {
                if(OWM_API_KEY === "YOUR_OWM_API_KEY" || !OWM_API_KEY) {
                    alert("Fitur ini butuh API Key OpenWeatherMap."); toggle.checked = false; updateLayerStorage(); return;
                }
                activeLayers[type] = L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`, {
                    opacity: 0.6
                }).addTo(map);

                const toast = document.createElement('div');
                toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                toast.innerHTML = `<i data-lucide="gauge" class="w-4 h-4 text-purple-400"></i> Peta Tekanan Udara`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                lucide.createIcons();
                return;
            }

            // FISH HEATMAP LAYER
            if(type === 'fish_heat') {
                if(!L.heatLayer) {
                    alert("Plugin Heatmap belum dimuat.");
                    toggle.checked = false;
                    updateLayerStorage();
                    return;
                }
                
                let heatPoints = [];
                Object.values(groupedSpots).forEach(group => {
                    group.forEach(spot => {
                        let intensity = 0.5;
                        if(spot.weight && parseFloat(spot.weight) > 0) {
                            intensity = Math.min(parseFloat(spot.weight) / 20, 1.0);
                        }
                        heatPoints.push([spot.lat, spot.lng, intensity]);
                    });
                });

                if(heatPoints.length === 0) {
                    alert("Belum ada data spot untuk membuat heatmap.");
                    toggle.checked = false;
                    updateLayerStorage();
                    return;
                }

                activeLayers[type] = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 17, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'} }).addTo(map);
                
                const toast = document.createElement('div');
                toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                toast.innerHTML = `<i data-lucide="scan-line" class="w-4 h-4 text-pink-400"></i> Heatmap Ikan Aktif`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                lucide.createIcons();
                return;
            }

            // SST (Sea Surface Temperature) LAYER - NASA GIBS (Free)
            if(type === 'sst') {
                const dateStr = getGibsDate(3); // Data 3 hari lalu (biasanya sudah matang)
                activeLayers[type] = L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GHRSST_L4_MUR_Sea_Surface_Temperature/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`, { 
                    pane: 'gibsPane', // Gunakan pane khusus
                    opacity: 0.5, // Sedikit lebih transparan agar peta dasar terlihat
                    maxNativeZoom: 9, // Batas zoom asli tiles NASA
                    maxZoom: 20,      // Izinkan zoom lebih dalam (stretch)
                    attribution: 'NASA GIBS'
                }).addTo(map);
                
                showLegend('sst'); // Tampilkan Indikator Warna
                const toast = document.createElement('div'); toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2"; toast.innerHTML = `<i data-lucide="thermometer-sun" class="w-4 h-4 text-indigo-400"></i> Peta Suhu Aktif`; document.body.appendChild(toast); setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 4000); lucide.createIcons(); return;
            }

            // CHLOROPHYLL LAYER - NASA GIBS (Free)
            if(type === 'chlorophyll') {
                // Gunakan Data BULANAN (Monthly) agar pasti ada isinya (tidak bolong-bolong)
                const d = new Date(); d.setMonth(d.getMonth() - 1); d.setDate(1); // Ambil tanggal 1 bulan lalu
                const dateStr = d.toISOString().split('T')[0];
                
                activeLayers[type] = L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_L3_Chlorophyll_a_4km_Month/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`, { 
                    pane: 'gibsPane', // Gunakan pane khusus
                    opacity: 0.6,
                    maxNativeZoom: 9,
                    maxZoom: 20,
                    attribution: 'NASA GIBS'
                }).addTo(map);
                
                showLegend('chlorophyll'); // Tampilkan Indikator Warna
                const toast = document.createElement('div'); toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2"; toast.innerHTML = `<i data-lucide="sprout" class="w-4 h-4 text-emerald-400"></i> Peta Klorofil Aktif`; document.body.appendChild(toast); setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 4000); lucide.createIcons(); return;
            }

            // BATHYMETRY LAYER (GEBCO)
            if(type === 'bathymetry') {
                // Gunakan Esri Ocean Basemap sebagai Overlay (Semi-Transparan) - Lebih cepat & detail
                activeLayers[type] = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
                    opacity: 0.5,
                    attribution: 'Esri Ocean'
                }).addTo(map);

                const toast = document.createElement('div');
                toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                toast.innerHTML = `<i data-lucide="waves" class="w-4 h-4 text-cyan-400"></i> Peta Kedalaman Aktif`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                lucide.createIcons();
                return;
            }

            try {
                const res = await fetch(`https://api.rainviewer.com/public/weather-maps.json?_=${Date.now()}`);
                const data = await res.json();
                
                // Normalisasi Host
                let host = data.host || 'https://tilecache.rainviewer.com';
                if(host.endsWith('/')) host = host.slice(0, -1);
                
                let tileUrl = '';

                if(type === 'rain') {
                    // Radar: Gunakan frame ke-2 terakhir agar lebih stabil (jika ada)
                    if(data.radar && data.radar.past && data.radar.past.length > 0) {
                        const idx = data.radar.past.length > 1 ? data.radar.past.length - 2 : 0;
                        const item = data.radar.past[idx];
                        tileUrl = `${host}${item.path}/256/{z}/{x}/{y}/2/1_1.png`;
                    }
                } else if(type === 'clouds') {
                    // Satellite: Gunakan frame terakhir
                    if(data.satellite && data.satellite.infrared && data.satellite.infrared.length > 0) {
                        const item = data.satellite.infrared[data.satellite.infrared.length - 1];
                        tileUrl = `${host}${item.path}/256/{z}/{x}/{y}/0/1_1.png`;
                    }
                }

                if(tileUrl) {
                    // FIX: Gunakan Pane khusus agar layer cuaca pasti di atas peta dasar tapi di bawah marker
                    if(!map.getPane('weatherPane')) {
                        map.createPane('weatherPane');
                        map.getPane('weatherPane').style.zIndex = 300; // BaseMap=200, Marker=600
                        map.getPane('weatherPane').style.pointerEvents = 'none'; // Klik tembus ke peta
                    }

                    activeLayers[type] = L.tileLayer(tileUrl, { 
                        pane: 'weatherPane',
                        opacity: 0.7
                    }).addTo(map);

                    // Feedback Visual (Toast)
                    const toast = document.createElement('div');
                    toast.className = "fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-xl z-[2000] flex items-center gap-2";
                    toast.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Layer ${type === 'rain' ? 'Hujan' : 'Awan'} Ditampilkan`;
                    document.body.appendChild(toast);
                    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 3000);
                    lucide.createIcons();
                } else {
                    alert("Data cuaca tidak tersedia saat ini.");
                    toggle.checked = false;
                    updateLayerStorage();
                }

            } catch(e) {
                console.error(e);
                alert("Gagal memuat peta cuaca. Cek koneksi internet.");
                toggle.checked = false;
                updateLayerStorage();
            }
        }

        // --- WINDY EMBED FUNCTIONS ---
        function openWindy() {
            const center = map.getCenter();
            const url = `https://embed.windy.com/embed2.html?lat=${center.lat}&lon=${center.lng}&detailLat=${center.lat}&detailLon=${center.lng}&width=650&height=450&zoom=${Math.max(3, map.getZoom())}&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;
            
            document.getElementById('windy-frame').src = url;
            document.getElementById('windyModal').classList.remove('translate-y-full');
            closeMapSettings(); // Tutup menu setting
        }

        function closeWindy() {
            document.getElementById('windyModal').classList.add('translate-y-full');
            setTimeout(() => { document.getElementById('windy-frame').src = ''; }, 300); // Reset iframe agar tidak berat
        }

        // --- AI INSIGHT FUNCTION (New) ---
        function showMetricInsight(type) {
            // Trigger Animation saat diklik
            if(currentWeatherData && currentWeatherData.current_weather) {
                const wx = currentWeatherData.current_weather;
                if(type === 'weather') checkWeatherAnimation(wx.weathercode, wx.windspeed);
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

        // --- OFFLINE MAP SYSTEM (Service Worker & Downloader) ---
        if ('serviceWorker' in navigator) {
            // PERBAIKAN: Kode penghapus Service Worker dihapus agar cache offline tetap awet.
            // Jika Anda memiliki file sw.js, browser akan menggunakannya untuk cache aset.
        }

        // Helper: Konversi LatLng ke Tile Coordinate
        function latLngToTile(lat, lng, zoom) {
            const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
            const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
            return { x, y };
        }

        async function downloadOfflineMap() {
            const btn = document.getElementById('btn-download-map');
            
            if (!('caches' in window)) {
                alert("Browser tidak mendukung fitur offline (Cache API).");
                return;
            }

            // 1. Input Nama Area
            const name = prompt("Beri nama untuk area ini (misal: Bali Selatan):", "Area " + new Date().toLocaleDateString());
            if (name === null) return; // Batal jika user tekan Cancel
            const mapName = name || "Area Tanpa Nama";

            const originalText = btn.innerHTML;
            
            // 1. Cek Batas Map & Zoom
            const bounds = map.getBounds();
            const minZoom = map.getZoom();
            const maxZoom = Math.min(minZoom + 2, 17); // Download sampai 2 level lebih detail (Max 17)
            
            btn.disabled = true;
            btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Menghitung...`;
            lucide.createIcons();

            const tiles = [];
            
            // 2. Tentukan URL Layer Aktif (Satelit / Laut / Jalan)
            let urlTemplate = "";
            if(isSat) {
                urlTemplate = "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
            } else if (map.hasLayer(oceanLayer)) {
                urlTemplate = "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}";
            } else {
                urlTemplate = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            }

            // 3. Generate Daftar URL Tile
            for (let z = minZoom; z <= maxZoom; z++) {
                const minTile = latLngToTile(bounds.getNorth(), bounds.getWest(), z);
                const maxTile = latLngToTile(bounds.getSouth(), bounds.getEast(), z);
                
                for (let x = minTile.x; x <= maxTile.x; x++) {
                    for (let y = minTile.y; y <= maxTile.y; y++) {
                        // Gunakan logika subdomain Leaflet (a, b, c) agar cocok dengan request peta
                        const s = ['a','b','c'][(x + y) % 3];
                        const url = urlTemplate.replace('{x}', x).replace('{y}', y).replace('{z}', z).replace('{s}', s);
                        tiles.push(url);
                    }
                }
            }

            // Estimasi Ukuran (Asumsi rata-rata 25KB per tile)
            const estSizeMB = (tiles.length * 25 / 1024).toFixed(1);

            if(tiles.length > 1000) {
                if(!confirm(`Area ini mencakup ${tiles.length} tiles (Estimasi ~${estSizeMB} MB). Lanjutkan download?`)) {
                    btn.innerHTML = originalText; btn.disabled = false; lucide.createIcons(); return;
                }
            }

            // 4. Proses Download & Cache
            try {
                // Gunakan nama cache unik per area agar bisa dihapus terpisah
                const mapId = Date.now();
                const cacheKey = `offline-map-${mapId}`;
                const cache = await caches.open(cacheKey);
                let count = 0;
                const batchSize = 10; // Download per 10 file agar tidak lag
                
                for (let i = 0; i < tiles.length; i += batchSize) {
                    const batch = tiles.slice(i, i + batchSize);
                    await Promise.all(batch.map(url => fetch(url, { mode: 'no-cors' }).then(res => cache.put(url, res))));
                    
                    count += batch.length;
                    btn.innerHTML = `<span class="animate-pulse">Downloading... ${Math.min(count, tiles.length)}/${tiles.length}</span>`;
                }
                
                // Simpan Metadata ke LocalStorage
                const meta = {
                    id: mapId,
                    name: mapName,
                    date: new Date().toLocaleDateString(),
                    count: tiles.length,
                    size: estSizeMB,
                    cacheKey: cacheKey
                };
                const savedMaps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
                savedMaps.push(meta);
                localStorage.setItem('offlineMaps', JSON.stringify(savedMaps));
                
                if(typeof updateOfflineList === 'function') updateOfflineList(); // Refresh list
                alert(`✅ Area "${mapName}" berhasil didownload!`);
            } catch (e) {
                console.error(e);
                alert("Gagal download. Pastikan koneksi internet stabil saat mendownload.");
            } finally {
                btn.innerHTML = originalText; btn.disabled = false; lucide.createIcons();
            }
        }

        // Fungsi Menampilkan Daftar Peta Offline
        function updateOfflineList() {
            const list = document.getElementById('offline-maps-list');
            if(!list) return;
            
            const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
            list.innerHTML = '';
            
            if(maps.length === 0) {
                list.innerHTML = '<p class="text-[10px] text-slate-500 text-center italic py-2">Belum ada peta offline tersimpan.</p>';
                return;
            }

            maps.forEach(map => {
                const size = map.size || ((map.count * 25) / 1024).toFixed(1);
                const item = document.createElement('div');
                item.className = "bg-slate-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-colors";
                item.innerHTML = `
                    <div>
                        <p class="text-xs font-bold text-white">${map.name}</p>
                        <p class="text-[10px] text-slate-400">${map.count} tiles • ~${size} MB • ${map.date}</p>
                    </div>
                    <button onclick="deleteOfflineMap(${map.id})" class="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors" aria-label="Hapus">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                `;
                list.appendChild(item);
            });
            lucide.createIcons();
        }

        // Fungsi Hapus Peta Offline
        async function deleteOfflineMap(id) {
            if(!confirm("Hapus area offline ini?")) return;
            
            const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
            const target = maps.find(m => m.id === id);
            
            if(target) {
                // 1. Hapus Cache Fisik
                if('caches' in window) {
                    try {
                        await caches.delete(target.cacheKey);
                    } catch(e) { console.log("Cache delete error", e); }
                }
                
                // 2. Hapus Metadata
                const newMaps = maps.filter(m => m.id !== id);
                localStorage.setItem('offlineMaps', JSON.stringify(newMaps));
                
                updateOfflineList();
            }
        }

        // Init dots saat load & resize
        window.addEventListener('resize', initScrollDots);

        // --- ONBOARDING TOUR SYSTEM ---
        let currentTourStep = 0;
        const tourSteps = [
            {
                target: null, // Center screen
                title: "Selamat Datang!",
                desc: "Aplikasi ini membantu Anda menemukan spot mancing terbaik, cek cuaca laut, dan menyimpan lokasi rahasia Anda.",
                icon: "anchor"
            },
            {
                target: "#search-input",
                title: "Cari Lokasi",
                desc: "Ketik nama desa, pantai, atau koordinat untuk langsung menuju lokasi tujuan mancing Anda.",
                icon: "search"
            },
            {
                target: "button[onclick='openMapSettings()']",
                title: "Layer & Offline Map",
                desc: "Ganti tampilan ke Satelit, cek suhu air (SST), atau <b>Download Peta Offline</b> agar aman saat sinyal hilang di laut.",
                icon: "layers"
            },
            {
                target: "button[onclick='showUserWeatherPanel()']",
                title: "Cek Cuaca & Ombak",
                desc: "Lihat prediksi tinggi ombak, kecepatan angin, dan pasang surut air laut sebelum berangkat.",
                icon: "cloud-sun"
            },
            {
                target: "button[onclick='locateUser()']",
                title: "Lokasi Saya",
                desc: "Tekan tombol ini untuk memusatkan peta ke posisi GPS Anda saat ini.",
                icon: "navigation"
            },
            {
                target: "button[onclick='findNearestSpot()']",
                title: "Spot Terdekat",
                desc: "Bingung mau mancing di mana? Biarkan aplikasi mencarikan spot terdekat dari posisi Anda.",
                icon: "locate-fixed"
            },
            {
                target: "button[onclick='openAddModal()']",
                title: "Simpan Spot",
                desc: "Klik tombol ini untuk menyimpan hasil pancingan. Atau <b>Tekan Lama di Peta</b> untuk menandai lokasi secara manual.",
                icon: "map-pin"
            },
            {
                target: "button[onclick='openFavorites()']",
                title: "Favorit",
                desc: "Simpan spot yang Anda sukai agar mudah diakses kembali nanti.",
                icon: "heart"
            },
            {
                target: "button[onclick='openLegend()']",
                title: "Pengaturan",
                desc: "Ubah bahasa, tema tampilan, atau lihat panduan ikon di sini.",
                icon: "settings"
            }
        ];

        function initTour() {
            // Cek apakah user sudah pernah melihat tour
            if(localStorage.getItem('hasSeenTour')) return;
            
            currentTourStep = 0;
            document.getElementById('tour-highlight').classList.remove('hidden');
            document.getElementById('tour-tooltip').classList.remove('hidden');
            showTourStep();
        }

        function showTourStep() {
            const step = tourSteps[currentTourStep];
            const highlight = document.getElementById('tour-highlight');
            const tooltip = document.getElementById('tour-tooltip');
            
            // Update Konten
            document.getElementById('tour-title').innerText = step.title;
            document.getElementById('tour-desc').innerHTML = step.desc;
            document.getElementById('tour-icon').setAttribute('data-lucide', step.icon);
            document.getElementById('tour-step-count').innerText = `${currentTourStep + 1}/${tourSteps.length}`;
            
            // Update Tombol Navigasi (Back & Finish)
            const nextBtn = document.getElementById('tour-next-btn');
            const prevBtn = document.getElementById('tour-prev-btn');
            
            if(currentTourStep === 0) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }

            if(currentTourStep === tourSteps.length - 1) {
                nextBtn.innerText = "Selesai";
                nextBtn.classList.replace('bg-blue-600', 'bg-emerald-600');
                nextBtn.classList.replace('hover:bg-blue-500', 'hover:bg-emerald-500');
            } else {
                nextBtn.innerText = "Lanjut";
                nextBtn.classList.replace('bg-emerald-600', 'bg-blue-600');
                nextBtn.classList.replace('hover:bg-emerald-500', 'hover:bg-blue-500');
            }
            
            lucide.createIcons();

            // Positioning Logic
            if(step.target) {
                const targetEl = document.querySelector(step.target);
                if(targetEl) {
                    const rect = targetEl.getBoundingClientRect();
                    const padding = 8;
                    
                    // Pindahkan Highlight Box
                    highlight.style.top = `${rect.top - padding}px`;
                    highlight.style.left = `${rect.left - padding}px`;
                    highlight.style.width = `${rect.width + (padding*2)}px`;
                    highlight.style.height = `${rect.height + (padding*2)}px`;
                    
                    // Pindahkan Tooltip (Otomatis cari posisi aman)
                    const tooltipRect = tooltip.getBoundingClientRect();
                    let top = rect.top - tooltipRect.height - 20; // Default di atas
                    if(top < 20) top = rect.bottom + 20; // Kalau mentok atas, pindah ke bawah
                    
                    let left = rect.left + (rect.width/2) - (tooltipRect.width/2);
                    // Jaga agar tidak keluar layar kiri/kanan
                    if(left < 10) left = 10;
                    if(left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 10;

                    tooltip.style.top = `${top}px`;
                    tooltip.style.left = `${left}px`;
                    tooltip.style.transform = 'none';
                }
            } else {
                // Posisi Tengah (Welcome Screen)
                highlight.style.top = '50%'; highlight.style.left = '50%'; highlight.style.width = '0px'; highlight.style.height = '0px';
                tooltip.style.top = '50%'; tooltip.style.left = '50%'; tooltip.style.transform = 'translate(-50%, -50%)';
            }
            
            // Animasi Masuk
            tooltip.classList.remove('active');
            setTimeout(() => tooltip.classList.add('active'), 50);
        }

        function nextTourStep() {
            if(currentTourStep < tourSteps.length - 1) {
                currentTourStep++;
                showTourStep();
            } else {
                endTour();
            }
        }

        function prevTourStep() {
            if(currentTourStep > 0) {
                currentTourStep--;
                showTourStep();
            }
        }

        function endTour() {
            document.getElementById('tour-highlight').classList.add('hidden');
            document.getElementById('tour-tooltip').classList.add('hidden');
            localStorage.setItem('hasSeenTour', 'true'); // Simpan status agar tidak muncul lagi
        }

        function resetTour() {
            localStorage.removeItem('hasSeenTour'); // Hapus status "sudah dilihat"
            closeLegend(); // Tutup menu pengaturan
            initTour(); // Mulai tour dari awal
        }
