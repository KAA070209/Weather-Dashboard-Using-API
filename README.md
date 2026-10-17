# Weather Dashboard Using API

Dashboard cuaca **SkyPulse** — aplikasi web modern dan responsif yang menampilkan kondisi cuaca real-time, prakiraan, peta radar interaktif, dan metrik cuaca mendalam. Dibangun dengan **React + Vite** dan mengonsumsi **OpenWeatherMap API**. Proyek ini dibuat untuk **Task 4 (Medium) – Weather Dashboard Using API**.

> Semua data cuaca diambil secara langsung dari OpenWeatherMap API.

---

## Ringkasan Proyek

| Item | Keterangan |
| --- | --- |
| **Program** | Internship Project — Auspify Technologies |
| **Peserta** | Muhammad Azka Sa'adi Nabhan |
| **Posisi** | Frontend Development Intern |
| **Kategori** | Task 4 (Medium) — Weather Dashboard Using API |
| **Demo** | https://weather.azkadev.my.id |
| **Repositori** | https://github.com/KAA070209/Weather-Dashboard-Using-API |

---

## Fitur

| Fitur | Deskripsi |
| --- | --- |
| **Sidebar Navigation** | Berpindah antar halaman (Dashboard, Radar & Peta, Prakiraan, Kualitas Udara, Analitik, Pengaturan) tanpa reload penuh. |
| **Pencarian Kota** | Mencari kondisi cuaca berdasarkan nama kota global. |
| **Cuaca Saat Ini** | Suhu, kondisi, koordinat, suhu terasa (*feels like*), suhu maks/min, tekanan, kelembapan, dan jarak pandang. |
| **Prakiraan 24 Jam** | Kartu per jam dengan suhu, peluang hujan, dan **grafik spline SVG** yang digambar manual. |
| **Prakiraan 7 Hari** | Rangkuman harian (suhu maks/min, ikon, deskripsi, bar visual) dari data prakiraan 5 hari/3 jam. |
| **Siklus Matahari & Bulan** | Busur visual posisi matahari (terbit/terbenam), sisa waktu siang, dan info fase bulan. |
| **Metrik Mendalam** | Kartu Kelembapan, Tekanan, Jarak Pandang, dan Angin + kompas dengan indikator berwarna. |
| **Radar & Peta** | Peta interaktif (Leaflet) dengan layer OpenWeatherMap (Hujan, Awan, Angin, Suhu, Tekanan), marker kota, dan pencarian lokasi. |
| **Kota Favorit** | Daftar kota pantauan dengan kondisi & suhu terkini, serta opsi menambah kota baru. |
| **Notifikasi** | Panel notifikasi otomatis (suhu tinggi, angin kencang, kelembapan tinggi, jarak pandang rendah, prakiraan hujan) dengan *tandai dibaca* dan *hapus semua*. |
| **Pengalih Satuan** | Tombol °C / °F pada header. |
| **Loading & Error State** | Overlay loading saat mengambil data dan banner error saat kota tidak ditemukan / API gagal. |
| **Responsive Layout** | Sidebar off-canvas pada layar HP dengan tombol menu. |

### Halaman yang Tersedia

1. **Dashboard** — ringkasan lengkap: cuaca saat ini, prakiraan jam, siklus matahari, metrik, prakiraan 7 hari, dan kota favorit.
2. **Radar & Peta** — peta interaktif dengan pemilihan layer cuaca dan marker kota.
3. **Prakiraan Jam & 7 Hari** — fokus pada prakiraan per jam dan harian.
4. **Kualitas Udara & Kesehatan** — menampilkan data cuaca terkait (kelembapan, jarak pandang, suhu); data AQI/UV penuh memerlukan langganan premium.
5. **Analitik** — ringkasan rata-rata suhu/kelembapan/angin dari data prakiraan.
6. **Pengaturan** — pengaturan unit suhu, daftar kota favorit, dan informasi sistem.

---

## Teknologi

| Teknologi | Kegunaan |
| --- | --- |
| **React 19** | Membangun UI berbasis komponen |
| **Vite 8** | Development server & bundler |
| **Leaflet + React-Leaflet 5** | Peta radar & layer cuaca interaktif |
| **OpenWeatherMap API** | Sumber data cuaca, prakiraan, tile peta, dan geocoding |
| **JavaScript (ESM)** | Logika aplikasi |
| **CSS** | Styling bertema gelap & responsive design |
| **Oxlint** | Linter kode |
| **Vercel** | Deployment aplikasi |

---

## Integrasi API

Aplikasi memakai **OpenWeatherMap Free API** (`https://api.openweathermap.org`):

| Endpoint | Kegunaan |
| --- | --- |
| `/data/2.5/weather` | Cuaca saat ini berdasarkan nama kota |
| `/data/2.5/forecast` | Prakiraan 5 hari / per 3 jam |
| `/geo/1.0/direct` | Geocoding nama lokasi → koordinat (halaman Radar) |
| `/map/{layer}_new/{z}/{x}/{y}.png` | Tile layer peta cuaca (hujan, awan, angin, suhu, tekanan) |

Data API dipetakan ke struktur komponen aplikasi. Jika kota tidak ditemukan (404) atau API key tidak valid (401), aplikasi menampilkan **banner error** yang informatif.

---

## Menjalankan Proyek

Pastikan **Node.js 18+** sudah terpasang.

```bash
# 1. Install dependency
npm install

# 2. Jalankan development server (buka http://localhost:5173)
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Pratinjau hasil build
npm run preview
```

### Skrip yang Tersedia

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan Vite development server dengan HMR. |
| `npm run build` | Membangun bundel produksi ke folder `dist/`. |
| `npm run preview` | Menjalankan pratinjau hasil build produksi. |
| `npm run lint` | Menjalankan Oxlint pada kode sumber. |

---

## Struktur Folder

```text
task 4/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AlertBanner.jsx          # banner error
│   │   ├── CurrentWeather.jsx       # cuaca saat ini
│   │   ├── DailyForecast.jsx        # prakiraan 7 hari
│   │   ├── FavoriteCities.jsx       # kota favorit
│   │   ├── Footer.jsx               # footer status
│   │   ├── Header.jsx               # header + pengalih unit + notifikasi
│   │   ├── HourlyForecast.jsx       # prakiraan jam + grafik spline
│   │   ├── MetricsGrid.jsx          # metrik cuaca mendalam
│   │   ├── Notifications.jsx        # panel notifikasi
│   │   ├── RadarMap.jsx             # peta radar interaktif (Leaflet)
│   │   ├── Sidebar.jsx              # navigasi sidebar
│   │   └── SunCycle.jsx             # siklus matahari & bulan
│   ├── utils/
│   │   └── weatherIcons.js          # pemetaan kode cuaca → ikon & deskripsi
│   ├── App.jsx                      # logika utama, fetch API, routing halaman internal
│   ├── main.jsx                     # entry point React
│   └── index.css                    # style global
├── index.html                       # entry HTML
├── vite.config.js
└── package.json
```

> **Catatan:** file `script.js` dan `style.css` di root adalah versi awal aplikasi (vanilla JavaScript) dan **sudah tidak dipakai**. Versi aktif berada di dalam folder `src/`.

---

## Deployment

Aplikasi di-deploy ke **Vercel**:

```bash
npm run build
# unggah folder dist/ ke Vercel, atau hubungkan repositori ke Vercel
```

---

## Catatan & Batasan

- **Pengalih satuan (°C/°F):** saat ini hanya mengubah label satuan pada tampilan; permintaan API selalu menggunakan `units=metric`. Untuk konversi penuh, ubah parameter `units` pada `fetchWeather` di `src/App.jsx`.
- **Kunci API** (`API_KEY` di `src/App.jsx` dan `src/components/RadarMap.jsx`) masih ditulis langsung di kode. Untuk produksi, sebaiknya dipindahkan ke **environment variable** (`.env`) agar tidak terekspos.
- Halaman **Kualitas Udara** dan **Analitik** menampilkan data terbatas karena endpoint AQI/UV penuh memerlukan langganan premium OpenWeatherMap.
- Data fase bulan dan beberapa label sistem (mis. "MQTT v3.1") bersifat konseptual untuk kebutuhan tampilan.
