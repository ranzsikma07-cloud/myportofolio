/* =========================================================
   1. PRE-LOADER
========================================================= */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const preloaderText = document.getElementById('preloaderText');
  const codeText = 'dev';
  let i = 0;

  if (preloaderText) {
    const typeCode = setInterval(() => {
      preloaderText.textContent = codeText.slice(0, i + 1);
      i++;
      if (i === codeText.length) clearInterval(typeCode);
    }, 150);
  }

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('is-hidden');
    }, 1400);
  }
});

/* =========================================================
   2. TOGGLE TEMA GELAP / TERANG
========================================================= */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = htmlEl.getAttribute('data-theme') === 'light';
    htmlEl.setAttribute('data-theme', isLight ? 'dark' : 'light');
  });
}

/* =========================================================
   3. NAVBAR: BURGER MENU (RESPONSIF)
========================================================= */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

if (burgerBtn && navMenu) {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
  });
}

document.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    if (burgerBtn && navMenu) {
      burgerBtn.classList.remove('is-active');
      navMenu.classList.remove('is-open');
    }

    document.querySelectorAll('.navbar__link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* =========================================================
   4. EFEK MENGETIK (TYPEWRITER) PADA NAMA DI HERO
========================================================= */
const typewriterEl = document.getElementById('typewriter');
const namaDepan = 'Muhamad Faridz Marwan'; // Sudah disesuaikan dengan nama Anda
let twIndex = 0;

function ketikNama() {
  if (typewriterEl && twIndex <= namaDepan.length) {
    typewriterEl.textContent = namaDepan.slice(0, twIndex);
    twIndex++;
    setTimeout(ketikNama, 90);
  }
}
setTimeout(ketikNama, 1500);

/* =========================================================
   5. KARTU FOTO 3D TILT + GLARE
========================================================= */
const tiltCard = document.getElementById('tiltCard');

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    const glare = tiltCard.querySelector('.tilt-card__glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.25), transparent 60%)`;
    }
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });

  tiltCard.addEventListener('touchstart', () => {
    tiltCard.style.transform = 'rotateX(6deg) rotateY(-6deg) scale(1.02)';
  });
  tiltCard.addEventListener('touchend', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

/* =========================================================
   6. AOS (ANIMATE ON SCROLL)
========================================================= */
const aosElements = document.querySelectorAll('[data-aos]');

if (aosElements.length > 0) {
  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          aosObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  aosElements.forEach((el) => aosObserver.observe(el));
}

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
    if (lightboxImage && img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    }
    if (lightboxCaption && img) {
      lightboxCaption.textContent = thumb.dataset.certTitle || img.alt;
    }
    if (lightbox) {
      lightbox.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  });
});

function tutupLightbox() {
  if (lightbox) {
    lightbox.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', tutupLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', tutupLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') tutupLightbox();
});

/* =========================================================
   8. FORMULIR KONTAK (INTEGRASI WEB3FORMS)
========================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Sedang mengirim pesan...';
      formStatus.style.color = '#3b82f6';
    }

    const formData = new FormData(contactForm);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        if (formStatus) {
          formStatus.textContent = 'Pesan berhasil terkirim! Terima kasih.';
          formStatus.style.color = '#10b981';
        }
        contactForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent = json.message || 'Gagal mengirim pesan.';
          formStatus.style.color = '#ef4444';
        }
      }
    })
    .catch(error => {
      if (formStatus) {
        formStatus.textContent = 'Terjadi kesalahan koneksi.';
        formStatus.style.color = '#ef4444';
      }
    });
  });
}

/* =========================================================
   9. TAHUN OTOMATIS DI FOOTER
========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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