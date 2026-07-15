// Auto Kuesioner EDOM Dosen v1.0 - Direct Fill (Single Page)
// Paste SEKALI di halaman kuesioner EDOM Dosen Darmajaya.
// Tidak perlu klik apapun setelah isi — cukup klik Kirimkan secara manual.
// By: @rzkydev666 & @pandxy.ocs & @hmd.alnk

(function () {
    'use strict';
    if (window !== window.top) return;

    // Pilih index 0 setelah sort ascending = Sangat Baik (terverifikasi dari test)
    const targetIndex = 0;
    const scoreLabel  = 'Sangat Baik';
    const targetScore = 5;

    // ─── STATUS BOX (pojok kanan atas) ───────────────────────────────────────
    const box = document.createElement('div');
    box.style.cssText = [
        'position:fixed', 'top:20px', 'right:20px', 'z-index:99999',
        'padding:14px 20px', 'border-radius:10px', 'font-family:sans-serif',
        'font-size:13px', 'line-height:1.7',
        'background:rgba(0,70,128,0.95)', 'color:#fff',
        'box-shadow:0 4px 20px rgba(0,0,0,0.4)', 'min-width:250px',
        'pointer-events:none', 'transition:opacity 0.5s'
    ].join(';');
    box.innerHTML = '<b>⏳ Mengisi kuesioner dosen...</b>';
    document.body.appendChild(box);

    // ─── FUNGSI TOAST SELESAI ─────────────────────────────────────────────────
    const igStyle = `
        display:inline-flex;align-items:center;gap:5px;
        background:#f5f7ff;color:#1a237e;
        font-weight:600;font-size:11.5px;
        padding:5px 12px;border-radius:6px;
        text-decoration:none;border:1px solid #dde3f8;
        letter-spacing:0.2px;
    `;
    const igSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>`;

    function showDoneToast() {
        // Overlay gelap + blur di belakang card
        const overlay = document.createElement('div');
        overlay.style.cssText = [
            'position:fixed', 'top:0', 'left:0', 'width:100vw', 'height:100vh',
            'background:rgba(0,0,0,0.45)', 'z-index:999998',
            'backdrop-filter:blur(3px)'
        ].join(';');
        document.body.appendChild(overlay);

        // Card utama
        const toast = document.createElement('div');
        toast.style.cssText = [
            'position:fixed', 'top:50%', 'left:50%',
            'transform:translate(-50%,-50%)',
            'z-index:999999', 'width:90%', 'max-width:400px',
            'border-radius:20px', 'font-family:sans-serif',
            'background:#fff', 'color:#1a1a2e',
            'box-shadow:0 20px 60px rgba(0,0,0,0.35)',
            'overflow:hidden'
        ].join(';');

        toast.innerHTML = `
            <!-- Header gradient biru -->
            <div style="
                background:linear-gradient(135deg,#004680,#0074cc);
                padding:28px 30px 22px;position:relative;text-align:center;
            ">
                <!-- Tombol ✕ pojok kanan atas -->
                <button id="_af_close_btn" style="
                    position:absolute;top:12px;right:14px;
                    width:30px;height:30px;
                    background:rgba(255,255,255,0.15);
                    border:1px solid rgba(255,255,255,0.3);
                    border-radius:50%;color:#fff;
                    font-size:15px;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:background 0.2s;
                ">✕</button>

                <div style="font-size:44px;margin-bottom:10px">🎉</div>
                <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px">Kuesioner Terisi!</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6">
                    Semua soal diisi otomatis dengan nilai<br>
                    <b>Sangat Baik ✅</b>
                </div>
            </div>

            <!-- Body putih -->
            <div style="padding:20px 24px;">
                <!-- Hint klik Kirimkan -->
                <div style="
                    background:linear-gradient(135deg,rgba(0,70,128,0.06),rgba(0,116,204,0.06));
                    border:1px solid rgba(0,70,128,0.15);
                    border-radius:8px;padding:10px 14px;
                    font-size:11.5px;color:#004680;
                    text-align:center;margin-bottom:14px;
                ">
                    👆 Tutup notif ini, lalu klik <b>Kirimkan</b> di form untuk menyelesaikan.
                </div>

                <!-- Credit IG -->
                <div style="text-align:center;margin-bottom:14px;">
                    <div style="
                        font-size:11px;font-weight:600;letter-spacing:0.5px;
                        text-transform:uppercase;color:#9e9e9e;margin-bottom:10px;
                    ">Dibuat karena keresahan mahasiswa 😂</div>
                    <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">
                        <a href="https://www.instagram.com/rzkydev666" target="_blank" style="${igStyle}">${igSvg}@rzkydev666</a>
                        <a href="https://www.instagram.com/pandxy.ocs" target="_blank" style="${igStyle}">${igSvg}@pandxy.ocs</a>
                        <a href="https://www.instagram.com/hmd.alnk"   target="_blank" style="${igStyle}">${igSvg}@hmd.alnk</a>
                    </div>
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

        // Event: tombol ✕
        const closeBtn = toast.querySelector('#_af_close_btn');
        if (closeBtn) {
            closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = 'rgba(255,255,255,0.3)');
            closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'rgba(255,255,255,0.15)');
            closeBtn.addEventListener('click', () => { toast.remove(); overlay.remove(); });
        }
        // Event: klik area gelap
        overlay.addEventListener('click', () => { toast.remove(); overlay.remove(); });
    }

    // ─── ISI FORM (auto-detect jumlah soal) ─────────────────────────────────
    let filledRadio = 0;
    let filledText  = 0;

    // Exclude elemen di dalam header/nav/sidebar
    const isInNav = el => !!el.closest('header, nav, #header, .navbar, .sidebar');

    // 1. Radio buttons — auto-detect semua grup berdasarkan atribut name
    const radios = Array.from(document.querySelectorAll('input[type="radio"][name]'))
                       .filter(r => !isInNav(r));
    const groups = {};
    radios.forEach(r => {
        if (!groups[r.name]) groups[r.name] = [];
        groups[r.name].push(r);
    });

    const totalRadioGroups = Object.keys(groups).length;

    Object.values(groups).forEach(g => {
        const sorted = [...g].sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
        const idx    = Math.min(targetIndex, sorted.length - 1);
        const pick   = sorted[idx];
        if (pick && !pick.checked) {
            pick.checked = true;
            pick.click();
            pick.dispatchEvent(new Event('change', { bubbles: true }));
            pick.dispatchEvent(new Event('input',  { bubbles: true }));
            filledRadio++;
        }
    });

    // 2. Textarea & text input — auto-detect semua yang ada di form
    const textElements = Array.from(document.querySelectorAll('textarea, input[type="text"]'))
                              .filter(el => !isInNav(el));

    textElements.forEach(el => {
        if (!el.value.trim()) {
            el.value = 'Pengajaran sangat baik dan memuaskan. Semoga terus dipertahankan.';
            el.dispatchEvent(new Event('input',  { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            filledText++;
        }
    });

    const totalFilled = filledRadio + filledText;

    // ─── UPDATE STATUS BOX & TAMPILKAN TOAST ─────────────────────────────────
    box.style.background = 'rgba(22,101,52,0.95)';
    box.innerHTML = [
        `<b>🎉 Selesai!</b>`,
        `Terdeteksi: ${totalRadioGroups} soal radio + ${textElements.length} teks`,
        `Terisi: ${totalFilled} item · Nilai: ${scoreLabel}`,
        `<span style="font-size:11px;opacity:0.7">@rzkydev666 · @pandxy.ocs · @hmd.alnk</span>`
    ].join('<br>');

    // Auto fade-out status box hijau setelah 3 detik
    setTimeout(() => {
        box.style.opacity = '0';
        setTimeout(() => box.remove(), 500);
    }, 3000);

    // Tampilkan card notif — tetap sampai user tutup
    setTimeout(() => showDoneToast(), 600);

})();
