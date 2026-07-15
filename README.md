# Kuesioner Filler (SEVIMA Platform / Darmajaya)

![Lazy Student](https://img.shields.io/badge/made%20for-lazy%20students-blueviolet)

## Deskripsi

Kuesioner Filler adalah script otomatisasi untuk mempermudah dan mempercepat pengisian kuesioner pada website kampus yang menggunakan platform **SEVIMA** (contoh: `siakad.darmajaya.ac.id`). 

Dengan script versi terbaru ini, Anda tidak perlu lagi mengisi kuesioner satu per satu secara manual, atau bahkan mengeklik pindah halaman. Script ini akan **berjalan secara mandiri** (seperti *auto-pilot*) mengisi dari halaman pertama hingga terakhir dengan mulus.

### 🌟 Fitur Utama
1. **Otomatis Pindah Halaman:** Script ini menggunakan teknik *iframe* sehingga bisa mengisi berpuluh-puluh halaman kuesioner secara estafet hanya dengan **1 kali copy-paste**.
2. **Kustomisasi Halaman:** Anda dapat menentukan mulai dari halaman ke-berapa dan berhenti di halaman ke-berapa (sangat berguna jika Anda terputus di tengah jalan).
3. **Pilih Nilai Anda (1-10):** Anda bebas menentukan angka kuesionernya. Jika Anda menginput angka `10`, script akan memilih bulatan nilai tertinggi. 
4. **Pengisian Teks Otomatis Bersentimen:** Script secara pintar akan menyesuaikan komentar saran/kritik (pada kotak *textarea*) sesuai dengan nilai yang Anda berikan:
   - Nilai Tinggi (8-10): *"Pelayanan sangat baik dan memuaskan."*
   - Nilai Sedang (5-7): *"Pelayanan cukup baik, namun perlu ditingkatkan."*
   - Nilai Rendah (1-4): *"Pelayanan kurang memuaskan, mohon diperbaiki ke depannya."*
5. **Anti-Error Internet Lambat (Sistem Polling):** Memiliki kemampuan menunggu loading halaman, sehingga script tidak akan "nge-bug" atau "terlewat" meskipun koneksi internet Anda sedang buruk.

---

## Cara Menggunakan

1. Buka halaman pengisian kuesioner di SIAKAD Anda (misal: `https://siakad.darmajaya.ac.id/siakad/data_angket/...`).
2. Klik Kanan di sembarang tempat, lalu pilih **Inspect** (atau tekan `F12` pada keyboard).
3. Pilih tab **Console** di jendela yang baru saja terbuka.
4. Buka file `fill.js` dari repositori ini, salin **seluruh** baris kodenya.
5. Tempelkan (*paste*) kode tersebut ke dalam layar **Console**, lalu tekan **Enter**.
6. Akan muncul beberapa pertanyaan *pop-up*:
   - Masukkan **Halaman Awal** (contoh: `1`).
   - Masukkan **Halaman Akhir** (contoh: `13`).
   - Masukkan **Nilai Kuesioner** yang ingin diberikan (contoh: `10`).
7. Duduk manis, saksikan keajaiban script ini mengisi halaman demi halaman untuk Anda!

**Catatan:** *Disclaimer* bahwa script ini murni ditujukan sebagai bahan edukasi dan otomatisasi pribadi. Pastikan Anda membaca dan paham konsekuensi etika dari penggunaannya di institusi Anda.

## Kontribusi

Punya ide untuk membuatnya lebih pintar? Anda bebas melakukan fork dan *pull request*! 

## Lisensi

Proyek ini menggunakan [MIT License](LICENSE). Silakan pakai dan ubah kodenya sesuka hati Anda.
