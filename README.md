# Auto Kuesioner SIAKAD Darmajaya

![Lazy Student](https://img.shields.io/badge/dibuat%20karena-keresahan%20mahasiswa-blueviolet)
![Version](https://img.shields.io/badge/version-7.0-blue)
![Platform](https://img.shields.io/badge/platform-SEVIMA-brightgreen)

> Dibuat karena keresahan mahasiswa 😂  
> by [@rzkydev666](https://instagram.com/rzkydev666) · [@pandxy.ocs](https://instagram.com/pandxy.ocs) · [@hmd.alnk](https://instagram.com/hmd.alnk)

---

## 📋 Deskripsi

Script otomatisasi pengisian kuesioner pada SIAKAD **Institut Informatika dan Bisnis Darmajaya** (platform SEVIMA). Cukup **copy-paste sekali**, script akan mengisi seluruh halaman kuesioner secara otomatis tanpa perlu mengeklik apapun.

Tersedia **2 script** untuk 2 jenis kuesioner yang berbeda:

| Script | Jenis Kuesioner | Halaman | Skala |
|--------|----------------|---------|-------|
| `kuisioner_layanan.js` | Kuesioner Layanan (non-dosen) | Multi halaman (1–13) | 1–10 |
| `kuisioner_dosen.js` | EDOM — Evaluasi Dosen | 1 halaman | 1–5 (Sangat Baik otomatis) |

---

## ✨ Fitur

### `kuisioner_layanan.js`
- 🔄 **Auto-pilot multi halaman** — mengisi halaman 1 sampai 13 secara estafet menggunakan teknik *iframe* (script tetap hidup, hanya iframe yang navigasi)
- 🎯 **Kustomisasi halaman** — atur halaman awal & akhir (berguna jika terputus di tengah)
- 🔢 **Pilih nilai bebas (1–10)** — input angka dan script memilih nilai yang sesuai di setiap soal
- 📝 **Auto-isi textarea** — mengisi kolom saran/kritik dengan teks yang sesuai nilai
- ⏳ **Anti-lag** — sistem polling menunggu konten halaman termuat sebelum mengisi
- 🔍 **Deteksi halaman cerdas** — membaca teks *"Bagian X dari 13"* untuk memastikan halaman benar-benar sudah berpindah sebelum mulai mengisi
- 🛑 **Stop otomatis** di halaman terakhir — tidak mengeklik tombol Simpan/Kirim secara otomatis

### `kuisioner_dosen.js`
- ⚡ **Langsung isi tanpa prompt** — paste dan semua soal langsung terisi
- ✅ **Auto pilih Sangat Baik** untuk semua pertanyaan
- 📝 **Auto-isi kolom Kritik & Saran**
- 🛑 **Berhenti setelah isi** — tidak mengeklik tombol Kirimkan

### Keduanya
- 🎉 **Notifikasi selesai** bergaya — card profesional muncul di tengah layar saat selesai
- 🔗 **Link IG kreator** bisa diklik langsung dari card notif
- ⚠️ **Disclaimer** tampil di card notif

---

## 🚀 Cara Menggunakan

### Kuesioner Layanan (`kuisioner_layanan.js`)

1. Buka halaman kuesioner layanan di SIAKAD:  
   `https://siakad.darmajaya.ac.id/siakad/data_angket/add/layanan/...`
2. Tekan `F12` → pilih tab **Console**
3. Copy seluruh isi `kuisioner_layanan.js`, paste ke Console, tekan **Enter**
4. Isi pop-up yang muncul:
   - **Halaman Awal** — mulai dari halaman berapa (contoh: `1`)
   - **Halaman Akhir** — sampai halaman berapa (contoh: `13`)
   - **Nilai** — angka 1–10 (contoh: `10`)
5. Duduk santai, script mengisi otomatis halaman demi halaman 🎉
6. Di halaman terakhir, tutup card notif lalu klik **Simpan/Kirim** secara manual

### Kuesioner Dosen EDOM (`kuisioner_dosen.js`)

1. Buka halaman kuesioner dosen EDOM di SIAKAD:  
   `https://siakad.darmajaya.ac.id/siakad/data_angket/add/edom/...`
2. Tekan `F12` → pilih tab **Console**
3. Copy seluruh isi `kuisioner_dosen.js`, paste ke Console, tekan **Enter**
4. Script langsung mengisi semua soal dengan **Sangat Baik** ✅
5. Tutup card notif lalu klik **Kirimkan** secara manual

---

## ⚠️ Disclaimer

Script ini dibuat murni untuk keperluan **edukasi dan otomatisasi pribadi**.  
**Kami tidak bertanggung jawab** atas segala konsekuensi yang timbul akibat penggunaan tools ini oleh pihak manapun.  
Pastikan Anda memahami kebijakan akademik institusi Anda sebelum menggunakan script ini.

---

## 📁 Struktur File

```
AutoKuesioner/
├── kuisioner_layanan.js   # Script untuk kuesioner layanan (multi halaman)
├── kuisioner_dosen.js     # Script untuk kuesioner EDOM dosen (1 halaman)
└── README.md
```

---

## 📜 Lisensi

Proyek ini menggunakan [MIT License](LICENSE). Bebas dipakai dan dimodifikasi.
