/* =========================================================
   1. PRE-LOADER
   Menampilkan efek mengetik singkat lalu menyembunyikan
   layar pre-loader saat halaman selesai dimuat.
========================================================= */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const preloaderText = document.getElementById('preloaderText');
  const codeText = 'dev';
  let i = 0;

  const typeCode = setInterval(() => {
    preloaderText.textContent = codeText.slice(0, i + 1);
    i++;
    if (i === codeText.length) clearInterval(typeCode);
  }, 150);

  // Beri jeda sedikit agar animasi bar & teks sempat terlihat
  setTimeout(() => {
    preloader.classList.add('is-hidden');
  }, 1400);
});

/* =========================================================
   2. TOGGLE TEMA GELAP / TERANG
   Tema disimpan di atribut data-theme pada <html> dan
   diingat lewat variabel di memori selama sesi berjalan.
========================================================= */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isLight = htmlEl.getAttribute('data-theme') === 'light';
  htmlEl.setAttribute('data-theme', isLight ? 'dark' : 'light');
});

/* =========================================================
   3. NAVBAR: BURGER MENU (RESPONSIF)
========================================================= */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('is-active');
  navMenu.classList.toggle('is-open');
});

// Tutup menu saat salah satu link diklik (khusus tampilan mobile)
document.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('is-active');
    navMenu.classList.remove('is-open');

    document.querySelectorAll('.navbar__link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* =========================================================
   4. EFEK MENGETIK (TYPEWRITER) PADA NAMA DI HERO
========================================================= */
const typewriterEl = document.getElementById('typewriter');
const namaDepan = 'Rangga Wijaya';
let twIndex = 0;

function ketikNama() {
  if (twIndex <= namaDepan.length) {
    typewriterEl.textContent = namaDepan.slice(0, twIndex);
    twIndex++;
    setTimeout(ketikNama, 90);
  }
}
setTimeout(ketikNama, 1500); // mulai setelah pre-loader selesai

/* =========================================================
   5. KARTU FOTO 3D TILT + GLARE
   Kartu miring mengikuti posisi kursor (mouse) dan
   miring otomatis mengikuti gyroscope-like tap di HP.
========================================================= */
const tiltCard = document.getElementById('tiltCard');

tiltCard.addEventListener('mousemove', (e) => {
  const rect = tiltCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Rotasi maksimum 12 derajat ke tiap arah
  const rotateY = ((x - centerX) / centerX) * 12;
  const rotateX = ((centerY - y) / centerY) * 12;

  tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

  // Posisi glare/kilauan mengikuti kursor
  const glare = tiltCard.querySelector('.tilt-card__glare');
  glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.25), transparent 60%)`;
});

tiltCard.addEventListener('mouseleave', () => {
  tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

// Dukungan tap sederhana di perangkat sentuh: sedikit miring lalu kembali
tiltCard.addEventListener('touchstart', () => {
  tiltCard.style.transform = 'rotateX(6deg) rotateY(-6deg) scale(1.02)';
});
tiltCard.addEventListener('touchend', () => {
  tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

/* =========================================================
   6. AOS (ANIMATE ON SCROLL) — Intersection Observer API
   Elemen dengan atribut [data-aos] akan mendapat kelas
   .in-view saat 15% bagiannya terlihat di layar, lalu
   CSS transition di style.css yang menjalankan animasinya.
========================================================= */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        aosObserver.unobserve(entry.target); // animasi cukup sekali
      }
    });
  },
  { threshold: 0.15 }
);

aosElements.forEach((el) => aosObserver.observe(el));

/* =========================================================
   7. LIGHTBOX / MODAL SERTIFIKAT
========================================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

document.querySelectorAll('.cert-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const img = thumb.querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = thumb.dataset.certTitle || img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // kunci scroll saat modal terbuka
  });
});

function tutupLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', tutupLightbox);
lightboxBackdrop.addEventListener('click', tutupLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') tutupLightbox();
});

/* =========================================================
   8. FORMULIR KONTAK (SIMULASI PENGIRIMAN)
   Catatan: ini hanya simulasi front-end. Untuk pengiriman
   sungguhan, hubungkan ke layanan seperti Formspree, EmailJS,
   atau backend milikmu sendiri.
========================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  formStatus.textContent = 'Mengirim pesan...';

  setTimeout(() => {
    formStatus.textContent = `Terima kasih! Pesan kamu sudah tersimpan (simulasi front-end).`;
    contactForm.reset();
  }, 900);
});

/* =========================================================
   9. TAHUN OTOMATIS DI FOOTER
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   10. NAVBAR AKTIF SESUAI SCROLL POSITION
========================================================= */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navbar__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});