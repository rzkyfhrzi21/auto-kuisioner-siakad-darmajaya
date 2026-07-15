// Auto Questionnaire Filler Script (Otomatis & Fleksibel)
// - Bisa pilih Halaman Awal & Akhir
// - Bisa input Nilai Kuesioner (1-10 dsb)

(function() {
    'use strict';

    if (window !== window.top) return;

    // 1. Minta input Halaman Awal
    let inputStart = prompt("Mulai dari halaman ke-berapa?", "1");
    if (inputStart === null) return;
    const startPage = parseInt(inputStart, 10);

    // 2. Minta input Halaman Akhir
    let inputEnd = prompt("Sampai halaman ke-berapa (Akhir)?", "13");
    if (inputEnd === null) return;
    const endPage = parseInt(inputEnd, 10);

    if (isNaN(startPage) || isNaN(endPage) || startPage <= 0 || startPage > endPage) {
        alert("Input halaman tidak valid!");
        return;
    }

    // 3. Minta input Nilai Kuesioner
    let inputScore = prompt("Masukkan nilai kuesioner yang ingin diisi (contoh: 10 untuk nilai tertinggi, 1 untuk terendah)", "10");
    if (inputScore === null) return;
    const targetScore = parseInt(inputScore, 10);

    if (isNaN(targetScore) || targetScore <= 0) {
        alert("Nilai kuesioner tidak valid!");
        return;
    }

    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    const iframe = document.createElement('iframe');
    iframe.src = window.location.href; 
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.zIndex = '1';
    document.body.appendChild(iframe);

    const statusBox = document.createElement('div');
    statusBox.style.position = 'fixed';
    statusBox.style.top = '20px';
    statusBox.style.right = '20px';
    statusBox.style.padding = '15px 20px';
    statusBox.style.backgroundColor = 'rgba(0, 70, 128, 0.9)'; 
    statusBox.style.color = '#fff';
    statusBox.style.borderRadius = '8px';
    statusBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    statusBox.style.zIndex = '999999';
    statusBox.style.fontFamily = 'sans-serif';
    statusBox.style.fontWeight = 'bold';
    statusBox.innerHTML = `⏳ Memulai Proses...`;
    document.body.appendChild(statusBox);

    let currentPage = startPage;

    iframe.onload = function() {
        if (currentPage > endPage) {
            statusBox.innerHTML = `🎉 Selesai! Halaman ${startPage} s/d ${endPage} diproses.`;
            
            setTimeout(() => {
                if (confirm(`Pengisian Kuesioner Selesai untuk halaman ${startPage} hingga ${endPage}!\nKlik OK untuk memuat ulang halaman ke tampilan normal.`)) {
                    window.location.reload(); 
                }
            }, 2000);
            return;
        }

        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            statusBox.innerHTML = `⏳ Menunggu kuesioner halaman ${currentPage} termuat...`;

            let attempts = 0;
            const waitForContent = setInterval(() => {
                attempts++;
                
                const rows = doc.querySelectorAll('tr');
                const radios = doc.querySelectorAll('input[type="radio"]');
                const textareas = doc.querySelectorAll('textarea');
                
                if (radios.length > 0 || textareas.length > 0 || attempts > 20) {
                    clearInterval(waitForContent); 
                    
                    let filledCount = 0;
                    
                    // --- MENGISI RADIO BUTTON BERDASARKAN INPUT NILAI ---
                    rows.forEach(row => {
                        const radiosInRow = row.querySelectorAll('input[type="radio"]');
                        if (radiosInRow.length > 0) {
                            // Coba cari berdasarkan atribut "value" (jika value HTML-nya berurutan angka)
                            let targetRadio = Array.from(radiosInRow).find(r => parseInt(r.value, 10) === targetScore);
                            
                            // Jika tidak ketemu by value, gunakan indeks urutan dari kiri ke kanan
                            if (!targetRadio) {
                                let targetIndex = targetScore - 1;
                                // Jika input nilai melebihi jumlah opsi (misal isi 10 tapi opsinya cuma 8)
                                if (targetIndex >= radiosInRow.length) targetIndex = radiosInRow.length - 1;
                                if (targetIndex < 0) targetIndex = 0;
                                
                                targetRadio = radiosInRow[targetIndex];
                            }

                            if (targetRadio && !targetRadio.checked) {
                                targetRadio.click();
                                targetRadio.checked = true;
                                targetRadio.dispatchEvent(new Event('change', { bubbles: true }));
                                targetRadio.dispatchEvent(new Event('input', { bubbles: true }));
                                filledCount++;
                            }
                        }
                    });

                    // (Fallback) Jika radio tidak di dalam TR
                    if (filledCount === 0 && radios.length > 0) {
                        const groups = {};
                        radios.forEach(r => {
                            if (!groups[r.name]) groups[r.name] = [];
                            groups[r.name].push(r);
                        });
                        Object.values(groups).forEach(group => {
                            let targetRadio = group.find(r => parseInt(r.value, 10) === targetScore);
                            if (!targetRadio) {
                                let targetIndex = targetScore - 1;
                                if (targetIndex >= group.length) targetIndex = group.length - 1;
                                if (targetIndex < 0) targetIndex = 0;
                                targetRadio = group[targetIndex];
                            }

                            if (targetRadio && !targetRadio.checked) {
                                targetRadio.click();
                                targetRadio.checked = true;
                                targetRadio.dispatchEvent(new Event('change', { bubbles: true }));
                                filledCount++;
                            }
                        });
                    }

                    // --- MENGISI TEXTAREA ---
                    textareas.forEach(ta => {
                        if (!ta.value || ta.value.trim() === '') {
                            // Sesuaikan sentimen kalimat berdasarkan nilai kuesioner
                            if (targetScore >= 8) {
                                ta.value = "Pelayanan sangat baik dan memuaskan.";
                            } else if (targetScore >= 5) {
                                ta.value = "Pelayanan cukup baik, namun perlu ditingkatkan.";
                            } else {
                                ta.value = "Pelayanan kurang memuaskan, mohon diperbaiki ke depannya.";
                            }
                            ta.dispatchEvent(new Event('input', { bubbles: true }));
                            ta.dispatchEvent(new Event('change', { bubbles: true }));
                            filledCount++;
                        }
                    });

                    // --- MENGISI TEXT INPUT ---
                    const textInputs = doc.querySelectorAll('input[type="text"]');
                    textInputs.forEach(ti => {
                        if (!ti.value || ti.value.trim() === '') {
                            ti.value = targetScore >= 6 ? "Baik" : "Kurang";
                            ti.dispatchEvent(new Event('input', { bubbles: true }));
                            ti.dispatchEvent(new Event('change', { bubbles: true }));
                            filledCount++;
                        }
                    });

                    statusBox.innerHTML = `✅ Form ${currentPage} terisi (Nilai: ${targetScore}).<br>Mencari tombol lanjut...`;

                    // --- CARI TOMBOL LANJUTKAN / SIMPAN / SELESAI ---
                    const buttons = doc.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
                    let lanjutButton = null;
                    
                    for (const btn of buttons) {
                        const text = (btn.textContent || btn.value || '').trim().toLowerCase();
                        if (text === 'lanjutkan' || text.includes('lanjutkan') || 
                            text === 'simpan' || text.includes('simpan') || 
                            text === 'selesai' || text.includes('selesai') || 
                            text === 'kirim' || text.includes('kirim') || 
                            text === 'submit' || text.includes('submit')) {
                            lanjutButton = btn;
                            break;
                        }
                    }

                    if (lanjutButton) {
                        statusBox.innerHTML = `✅ Form ${currentPage} terisi.<br>Mengklik [${lanjutButton.textContent.trim()}]...`;
                        
                        setTimeout(() => {
                            lanjutButton.click(); 
                            currentPage++;
                        }, 1500);
                    } else {
                        statusBox.innerHTML = `⚠️ Selesai di halaman ${currentPage}. Tombol lanjut tidak ditemukan.`;
                        setTimeout(() => {
                            if (confirm(`Tombol untuk lanjut/simpan tidak ditemukan pada halaman ${currentPage}.\nApakah Anda ingin memuat ulang halaman kembali ke normal?`)) {
                                window.location.reload(); 
                            }
                        }, 2000);
                    }
                }
            }, 500); 

        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            statusBox.innerHTML = `⚠️ Terjadi kesalahan jaringan.`;
            setTimeout(() => {
                if (confirm(`Sistem terhenti di halaman ${currentPage} karena masalah jaringan/koneksi.\nMuat ulang halaman sekarang?`)) {
                    window.location.reload(); 
                }
            }, 2000);
        }
    };
})();
