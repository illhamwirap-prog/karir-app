# Karir — Aplikasi Loker

Aplikasi loker mobile (iOS & Android) dibangun dengan React Native + Expo,
satu basis kode untuk kedua platform.

## Fitur yang sudah jadi
- Cari & filter loker (kategori, tipe kerja, lokasi)
- Detail loker lengkap dengan syarat
- Simpan loker favorit (tersimpan permanen di perangkat)
- Form lamar kerja + riwayat lamaran (tersimpan permanen di perangkat)
- Data loker masih **mock/contoh** — lihat bagian "Menyambungkan ke data asli"

---

## 1. Coba dulu di HP kamu (paling cepat, gratis)

1. Install Node.js (versi 18+) di komputer: https://nodejs.org
2. Buka terminal di folder `karir-app`, jalankan:
   ```
   npm install
   npx expo start
   ```
3. Install aplikasi **Expo Go** dari App Store / Play Store di HP kamu.
4. Scan QR code yang muncul di terminal pakai Expo Go (Android) atau
   kamera bawaan (iOS). Aplikasi langsung jalan di HP kamu — belum
   perlu akun developer apa pun di tahap ini.

## 2. Build jadi file instalasi asli (.apk / .aab / .ipa)

Pakai **EAS Build** (layanan build resmi dari Expo, gratis untuk kuota terbatas):

```
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
eas build --platform ios
```

- Build Android bisa langsung jadi `.apk` (untuk dites manual) atau `.aab`
  (wajib untuk submit ke Play Store).
- Build iOS **wajib punya akun Apple Developer** (US$99/tahun) karena
  Apple mewajibkan aplikasi ditandatangani dengan sertifikat resmi.
  `eas build` akan memandu kamu membuat sertifikat ini otomatis.

## 3. Submit ke toko aplikasi

**Google Play Store**
1. Daftar akun Google Play Console (bayar sekali, ~US$25): https://play.google.com/console
2. Buat aplikasi baru, isi nama "Karir", deskripsi, ikon, screenshot.
3. Upload file `.aab` hasil `eas build --platform android`.
4. Isi kebijakan privasi (wajib) dan konten rating, lalu submit untuk
   ditinjau. Biasanya beberapa jam sampai beberapa hari.

**Apple App Store**
1. Daftar Apple Developer Program (US$99/tahun): https://developer.apple.com
2. Bisa langsung submit dari terminal:
   ```
   eas submit --platform ios
   ```
3. Lengkapi listing di App Store Connect (ikon, screenshot, deskripsi).
4. Submit untuk App Review — biasanya 1–3 hari.

## 4. Menyambungkan ke data asli (biar loker gak hardcode)

Saat ini semua loker ada di `src/data/jobs.js`. Supaya perusahaan bisa
posting loker beneran dan lamaran tersimpan di server (bukan cuma di
HP pelamar), kamu perlu backend. Opsi tercepat: **Supabase**
(gratis untuk mulai, tinggal bikin project di supabase.com), lalu:
- Ganti isi `src/data/jobs.js` dengan pemanggilan API Supabase
- Ganti `AppDataContext.js` supaya simpan/lamar kerja mengirim data ke
  Supabase, bukan cuma `AsyncStorage`
- Tambahkan login (Supabase Auth) supaya tiap pengguna punya akun

Kalau kamu sudah siap ke tahap ini, kirim URL & API key project
Supabase kamu — bisa dibantu sambungkan langsung.

## 5. Ganti ikon & nama tampilan

- Ikon: siapkan file 1024×1024 PNG, taruh di `src/assets/icon.png`,
  lalu di `app.json` tambahkan `"icon": "./src/assets/icon.png"`.
- Nama & warna splash sudah diatur di `app.json` (`"name": "Karir"`).
