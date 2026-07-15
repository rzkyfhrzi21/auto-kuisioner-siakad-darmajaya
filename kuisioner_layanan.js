// Auto Questionnaire Filler Script v7.0 - Iframe Approach
// Paste SEKALI, berjalan otomatis sampai halaman akhir.
// By: @rzkydev666 & @pandxy.ocs
// Fix: tombol Lanjutkan (<a> tag) terdeteksi dengan benar.
// Fix: validasi URL iframe agar tidak nyasar ke halaman lain.

(function() {
    'use strict';

    if (window !== window.top) return;

    // ─── INPUT KONFIGURASI ────────────────────────────────────────────────────
    let inputStart = prompt("Mulai dari halaman ke-berapa?", "1");
    if (inputStart === null) return;
    const startPage = parseInt(inputStart, 10);

    let inputEnd = prompt("Sampai halaman ke-berapa (Akhir)?", "13");
    if (inputEnd === null) return;
    const endPage = parseInt(inputEnd, 10);

    if (isNaN(startPage) || isNaN(endPage) || startPage <= 0 || startPage > endPage) {
        alert("Input halaman tidak valid!");
        return;
    }

    let inputScore = prompt("Nilai kuesioner (1 = terendah, 10 = tertinggi):", "10");
    if (inputScore === null) return;
    const targetScore = parseInt(inputScore, 10);

    if (isNaN(targetScore) || targetScore <= 0) {
        alert("Nilai tidak valid!");
        return;
    }

    // ─── BUAT IFRAME (Script tetap hidup, hanya iframe yang navigasi) ─────────
    const iframe = document.createElement('iframe');
    iframe.src = window.location.href;
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:9998;';
    document.body.appendChild(iframe);

    // ─── KOTAK STATUS ─────────────────────────────────────────────────────────
    const box = document.createElement('div');
    box.id = '_af_box';
    box.style.cssText = [
        'position:fixed', 'top:20px', 'right:20px', 'z-index:99999',
        'padding:14px 20px', 'border-radius:10px', 'font-family:sans-serif',
        'font-size:13px', 'line-height:1.7',
        'background:rgba(0,70,128,0.95)', 'color:#fff',
        'box-shadow:0 4px 20px rgba(0,0,0,0.4)', 'min-width:250px',
        'pointer-events:none'
    ].join(';');
    box.innerHTML = `<b>⏳ Memulai...</b>`;
    document.body.appendChild(box);

    // ─── FUNGSI TAMPILKAN NOTIF SELESAI ──────────────────────────────────────
    // iframeEl diteruskan agar bisa dihapus dari DOM saat user tutup toast
    function showDoneToast(iframeEl) {
        // Overlay gelap di belakang card
        const overlay = document.createElement('div');
        overlay.style.cssText = [
            'position:fixed','top:0','left:0','width:100vw','height:100vh',
            'background:rgba(0,0,0,0.45)','z-index:999998',
            'backdrop-filter:blur(3px)'
        ].join(';');
        document.body.appendChild(overlay);

        // Card utama
        const toast = document.createElement('div');
        toast.style.cssText = [
            'position:fixed','top:50%','left:50%',
            'transform:translate(-50%,-50%)',
            'z-index:999999','width:90%','max-width:400px',
            'border-radius:20px','font-family:sans-serif',
            'background:#fff','color:#1a1a2e',
            'box-shadow:0 20px 60px rgba(0,0,0,0.35)',
            'overflow:hidden'
        ].join(';');

        toast.innerHTML = `
            <!-- Header gradient -->
            <div style="
                background:linear-gradient(135deg,#004680,#0074cc);
                padding:28px 30px 22px;
                position:relative;
                text-align:center;
            ">
                <!-- Tombol X pojok kanan atas -->
                <button id="_af_close_btn" style="
                    position:absolute;top:12px;right:14px;
                    width:30px;height:30px;
                    background:rgba(255,255,255,0.15);
                    border:1px solid rgba(255,255,255,0.3);
                    border-radius:50%;color:#fff;
                    font-size:15px;line-height:1;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:background 0.2s;
                " title="Tutup">✕</button>

                <div style="font-size:44px;margin-bottom:10px">🎉</div>
                <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px">Pengisian Selesai!</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6">
                    <b>${endPage - startPage + 1} halaman</b> berhasil diisi otomatis<br>
                    dengan nilai <b>${targetScore}</b>.
                </div>
            </div>

            <!-- Body putih -->
            <div style="padding:20px 24px;">
                <!-- Credit IG -->
                <div style="text-align:center;margin-bottom:16px;">
                    <div style="
                        font-size:11px;font-weight:600;letter-spacing:0.5px;
                        text-transform:uppercase;color:#9e9e9e;margin-bottom:10px;
                    ">Dibuat karena keresahan mahasiswa 😂</div>
                    <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">
                        <a href="https://www.instagram.com/rzkydev666" target="_blank" style="
                            display:inline-flex;align-items:center;gap:5px;
                            background:#f5f7ff;color:#1a237e;
                            font-weight:600;font-size:11.5px;
                            padding:5px 12px;border-radius:6px;
                            text-decoration:none;border:1px solid #dde3f8;
                            letter-spacing:0.2px;
                        "><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>@rzkydev666</a>
                        <a href="https://www.instagram.com/pandxy.ocs" target="_blank" style="
                            display:inline-flex;align-items:center;gap:5px;
                            background:#f5f7ff;color:#1a237e;
                            font-weight:600;font-size:11.5px;
                            padding:5px 12px;border-radius:6px;
                            text-decoration:none;border:1px solid #dde3f8;
                            letter-spacing:0.2px;
                        "><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>@pandxy.ocs</a>
                        <a href="https://www.instagram.com/hmd.alnk" target="_blank" style="
                            display:inline-flex;align-items:center;gap:5px;
                            background:#f5f7ff;color:#1a237e;
                            font-weight:600;font-size:11.5px;
                            padding:5px 12px;border-radius:6px;
                            text-decoration:none;border:1px solid #dde3f8;
                            letter-spacing:0.2px;
                        "><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>@hmd.alnk</a>
                    </div>
                </div>

                <!-- Hint submit manual -->
                <div style="
                    background:linear-gradient(135deg,rgba(0,70,128,0.06),rgba(0,116,204,0.06));
                    border:1px solid rgba(0,70,128,0.15);
                    border-radius:8px;padding:10px 14px;
                    font-size:11.5px;color:#004680;
                    text-align:center;margin-bottom:14px;
                ">
                    👆 Tutup notif ini, lalu klik <b>Kirim / Simpan</b> di form.
                </div>

                <!-- Disclaimer -->
                <div style="
                    background:#fff8e1;border:1px solid #ffe082;
                    border-radius:8px;padding:10px 14px;
                    font-size:10.5px;color:#795548;
                    line-height:1.6;text-align:center;
                ">
                    ⚠️ Kami tidak bertanggung jawab atas segala konsekuensi
                    yang timbul akibat penggunaan tools ini oleh pihak manapun.
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Tombol ✕ di pojok kanan atas header
        const closeBtn = toast.querySelector('#_af_close_btn');
        if (closeBtn) {
            closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = 'rgba(255,255,255,0.3)');
            closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'rgba(255,255,255,0.15)');
            closeBtn.addEventListener('click', () => {
                toast.remove();
                overlay.remove();
                // Iframe tetap hidup — user bisa lihat form terisi & klik Kirim
            });
        }

        // Klik area gelap di luar card untuk tutup
        overlay.addEventListener('click', () => {
            toast.remove();
            overlay.remove();
            // Iframe tetap hidup — user bisa lihat form terisi & klik Kirim
        });
    }


    let currentPage = startPage;
    // Nomor bagian terakhir yang sudah diproses (dari teks "Bagian X dari 13")
    // Ini dipakai untuk memastikan halaman benar-benar sudah pindah sebelum diproses
    let lastBagian = startPage - 1;

    // Helper: ambil nomor "Bagian" dari teks di halaman iframe
    function getBagianNumber(doc) {
        // Coba berbagai selector yang ada di HTML SEVIMA
        const el = doc.querySelector('[data-cy="jml-bagian"], .bagian, .deskripsi, .desk-kategori .bagian');
        if (!el) return 0;
        const m = el.textContent.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
    }

    // ─── PROSES SETIAP HALAMAN ────────────────────────────────────────────────
    iframe.onload = function () {

        // Validasi: pastikan iframe ada di halaman kuesioner, bukan halaman lain
        let iframeUrl = '';
        try {
            iframeUrl = iframe.contentWindow.location.href;
        } catch (e) {
            // cross-origin — abaikan
            return;
        }

        const isKuesionerPage = /data_angket|angket/i.test(iframeUrl);
        if (!isKuesionerPage) {
            // Iframe nyasar ke halaman lain — paksa kembali ke URL kuesioner
            console.warn('[AutoFill] Iframe nyasar ke:', iframeUrl, '— memuat ulang ke URL kuesioner.');
            iframe.src = window.location.href;
            return;
        }

        // Semua halaman sudah selesai
        if (currentPage > endPage) {
            box.style.background = 'rgba(22,101,52,0.95)';
            box.innerHTML = `🎉 Selesai! Halaman ${startPage}–${endPage} diproses.`;
            setTimeout(() => alert(`Selesai! Semua ${endPage - startPage + 1} halaman sudah diisi.`), 500);
            return;
        }

        const doc = iframe.contentDocument || iframe.contentWindow.document;
        box.innerHTML = `⏳ Menunggu halaman ${currentPage}/${endPage} termuat...`;

        // Poll: tunggu sampai teks "Bagian X dari 13" berubah ke nomor yang kita harapkan
        // Ini jauh lebih andal daripada timer, karena berbasis konten nyata di halaman
        let attempts = 0;
        const poll = setInterval(() => {
            attempts++;

            const bagianNow = getBagianNumber(doc);
            const radios    = doc.querySelectorAll('input[type="radio"]');
            const textareas = doc.querySelectorAll('textarea');
            const rows      = doc.querySelectorAll('tr');

            // Halaman dianggap siap jika:
            // 1. Nomor "Bagian" sudah sesuai dengan currentPage, ATAU
            // 2. Ada radio/textarea yang muncul dan bagian bukan halaman lama
            const pageReady = (bagianNow === currentPage) ||
                              (bagianNow > lastBagian && (radios.length > 0 || textareas.length > 0)) ||
                              attempts > 40;

            box.innerHTML = `⏳ Menunggu halaman ${currentPage}/${endPage}...<br>` +
                            `<span style="font-size:11px;opacity:0.7">Terdeteksi: Bagian ${bagianNow}</span>`;

            if (pageReady) {
                clearInterval(poll);
                lastBagian = bagianNow || currentPage;

                // ── ISI RADIO BUTTON ──────────────────────────────────────────
                let filled = 0;

                // Cara 1: per baris tabel <tr>
                rows.forEach(row => {
                    const rr = row.querySelectorAll('input[type="radio"]');
                    if (!rr.length) return;
                    let pick = Array.from(rr).find(r => parseInt(r.value, 10) === targetScore);
                    if (!pick) {
                        let idx = Math.min(targetScore - 1, rr.length - 1);
                        pick = rr[Math.max(0, idx)];
                    }
                    if (pick && !pick.checked) {
                        pick.checked = true;
                        pick.click();
                        pick.dispatchEvent(new Event('change', { bubbles: true }));
                        pick.dispatchEvent(new Event('input',  { bubbles: true }));
                        filled++;
                    }
                });

                // Cara 2 (fallback): kelompokkan berdasarkan atribut name
                if (filled === 0 && radios.length > 0) {
                    const groups = {};
                    radios.forEach(r => {
                        if (!groups[r.name]) groups[r.name] = [];
                        groups[r.name].push(r);
                    });
                    Object.values(groups).forEach(g => {
                        let pick = g.find(r => parseInt(r.value, 10) === targetScore);
                        if (!pick) pick = g[Math.max(0, Math.min(targetScore - 1, g.length - 1))];
                        if (pick && !pick.checked) {
                            pick.checked = true;
                            pick.click();
                            pick.dispatchEvent(new Event('change', { bubbles: true }));
                            filled++;
                        }
                    });
                }

                // ── ISI TEXTAREA ──────────────────────────────────────────────
                textareas.forEach(ta => {
                    if (!ta.value.trim()) {
                        ta.value = targetScore >= 8
                            ? "Pelayanan sangat baik dan memuaskan."
                            : targetScore >= 5
                                ? "Pelayanan cukup baik, namun perlu ditingkatkan."
                                : "Pelayanan kurang memuaskan, mohon diperbaiki.";
                        ta.dispatchEvent(new Event('input',  { bubbles: true }));
                        ta.dispatchEvent(new Event('change', { bubbles: true }));
                        filled++;
                    }
                });

                // ── ISI TEXT INPUT ────────────────────────────────────────────
                doc.querySelectorAll('input[type="text"]').forEach(ti => {
                    if (!ti.value.trim()) {
                        ti.value = targetScore >= 6 ? "Baik" : "Kurang";
                        ti.dispatchEvent(new Event('input',  { bubbles: true }));
                        ti.dispatchEvent(new Event('change', { bubbles: true }));
                        filled++;
                    }
                });

                box.innerHTML = `✅ Halaman ${currentPage}/${endPage} terisi (${filled} item, Nilai: ${targetScore})`;

                // ── HALAMAN TERAKHIR: isi, hentikan semua deteksi, tampilkan notif ──
                if (currentPage >= endPage) {
                    // 🛑 Hentikan script sepenuhnya — lepas onload
                    // Iframe TIDAK dihapus agar user bisa melihat form terisi & submit manual
                    iframe.onload = null;

                    // Update status box (hijau) — auto hilang setelah 3 detik
                    box.style.transition = 'opacity 0.5s';
                    box.style.background = 'rgba(22,101,52,0.95)';
                    box.innerHTML = [
                        `<b>🎉 Pengisian Selesai!</b>`,
                        `Halaman ${startPage}–${endPage} ✅`,
                        `Nilai: ${targetScore}`,
                        `<span style="font-size:11px;opacity:0.7">@rzkydev666 · @pandxy.ocs · @hmd.alnk</span>`
                    ].join('<br>');

                    // Auto fade-out status box hijau setelah 3 detik
                    setTimeout(() => {
                        box.style.opacity = '0';
                        setTimeout(() => box.remove(), 500);
                    }, 3000);

                    // Tampilkan card notif — tetap sampai user tutup
                    // Teruskan referensi iframe agar bisa dikelola saat toast ditutup
                    setTimeout(() => showDoneToast(iframe), 600);
                    return;
                }

                // ── CARI TOMBOL LANJUTKAN ─────────────────────────────────────
                // Cari dari semua jenis elemen: <button>, <a>, <input>
                // KECUALI yang ada di dalam header / nav / navbar
                const isInNav = el => !!el.closest(
                    'header, nav, #header, .navbar, .sidebar, [id*="sidebar"], [id*="menu"], #menu'
                );

                let lanjutBtn = null;
                const candidates = doc.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
                for (const el of candidates) {
                    if (isInNav(el)) continue;
                    const txt = (el.textContent || el.value || '').trim().toLowerCase();
                    if (txt === 'lanjutkan' || txt === 'lanjut' || txt === 'next' ||
                        txt.startsWith('lanjutkan') || txt.startsWith('lanjut')) {
                        lanjutBtn = el;
                        break;
                    }
                }

                if (lanjutBtn) {
                    box.innerHTML = `✅ Halaman ${currentPage} terisi.<br>⏩ Pindah ke halaman ${currentPage + 1}...`;
                    console.log('[AutoFill] Klik:', lanjutBtn.tagName, lanjutBtn.textContent.trim());

                    setTimeout(() => {
                        lanjutBtn.click();
                        currentPage++;
                        // Tidak perlu isProcessing — onload berikutnya akan dicek via teks "Bagian"
                    }, 1500);

                } else {
                    box.style.background = 'rgba(153,27,27,0.95)';
                    box.innerHTML = `⚠️ Tombol Lanjutkan tidak ditemukan (halaman ${currentPage}).`;
                    setTimeout(() => alert(
                        `Tombol "Lanjutkan" tidak ditemukan di halaman ${currentPage}.\nSilakan klik manual lalu tunggu halaman berikutnya.`
                    ), 800);
                }
            }
        }, 500);
    };

})();
