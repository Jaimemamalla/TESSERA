/* ════════════════════════════════════════════════
   TESSERA · Finanzas y capital humano — main.js
   ════════════════════════════════════════════════ */

/* ── Referencias DOM ── */
const nav       = document.getElementById('mainNav');
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');
const scrollBar = document.getElementById('scroll-bar');

/* ── Barra de progreso de scroll ── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
}, { passive: true });

/* ── Nav: clase scrolled ── */
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ══════════════════════════════════════════════════
   NAV ADAPTABLE: claro/oscuro según sección de fondo
   ══════════════════════════════════════════════════ */
const sectionThemes = {
  'top':         'dark',
  'about':       'light',
  'servicios':   'light',
  'metodologia': 'dark',
  'entregable':  'light',
  'casos':       'light',
  'contacto':    'dark',
};

function setNavTheme(theme) {
  if (theme === 'light') {
    nav.classList.add('nav-light');
    nav.classList.remove('nav-dark');
  } else {
    nav.classList.add('nav-dark');
    nav.classList.remove('nav-light');
  }
}

setNavTheme('dark');

const themeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id    = entry.target.id;
    const theme = sectionThemes[id];
    if (theme) setNavTheme(theme);
  });
}, {
  threshold: 0,
  rootMargin: '-50px 0px -85% 0px'
});

Object.keys(sectionThemes).forEach(id => {
  const el = document.getElementById(id);
  if (el) themeObs.observe(el);
});

/* ── Parallax Optimizado (requestAnimationFrame) ── */
const heroVideo = document.querySelector('.hero-video');
let isTicking = false;

if (heroVideo) {
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroVideo.style.transform = `translateY(${y * 0.4}px)`;
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}

/* ── Menú móvil (A11y Mejorado) ── */
function toggleMobile() {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open); // A11y Update
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false'); // A11y Update
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobile();
});

/* ── Reveal al hacer scroll ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── stat-box: línea lateral animada ── */
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-box').forEach(el => statObs.observe(el));

/* ── Count-up ── */
function countUp(el, target, duration) {
  requestAnimationFrame(t0 => {
    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(t0);
  });
}

const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUp(e.target, +e.target.dataset.target, 1200);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count-anim').forEach(el => animObs.observe(el));

/* ── Barras de progreso (Lógica limpia sin SetTimeout) ── */
const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Leer data-width del HTML pero el retraso lo maneja el CSS
      e.target.querySelectorAll('.progress-fill').forEach((bar) => {
        bar.style.width = bar.dataset.width + '%';
      });
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ps = document.querySelector('.progress-section');
if (ps) progObs.observe(ps);

/* ── Timeline horizontal (Lógica limpia sin SetTimeout) ── */
const htObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    // Al añadir la clase 'animated', el CSS se encarga de los delays y animaciones de forma nativa
    e.target.classList.add('animated');

    const dots  = e.target.querySelectorAll('.h-dot');
    const steps = e.target.querySelectorAll('.h-step');

    /* Hover: ilumina el nombre del paso correspondiente */
    dots.forEach((dot, i) => {
      dot.addEventListener('mouseenter', () => {
        steps[i]?.querySelector('.h-step-name')?.style.setProperty('color', 'var(--yellow)');
      });
      dot.addEventListener('mouseleave', () => {
        steps[i]?.querySelector('.h-step-name')?.style.removeProperty('color');
      });
    });

    htObs.unobserve(e.target);
  });
}, { threshold: 0.25 });

const ht = document.getElementById('hTimeline');
if (ht) htObs.observe(ht);

/* ── Vídeos de sección — lazy load al entrar en viewport ── */
const sectionVideos = document.querySelectorAll('.section-video');
if (sectionVideos.length) {
  const videoObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const video = e.target;
        if (!video.getAttribute('data-loaded')) {
          video.setAttribute('data-loaded', '1');
          video.load();
          video.play().catch(() => {});
        }
        videoObs.unobserve(video);
      }
    });
  }, { threshold: 0.1 });
  sectionVideos.forEach(v => videoObs.observe(v));
}

/* ── Contadores del hero (proof-count) ── */
document.querySelectorAll('.proof-count').forEach((el, idx) => {
  const target = +el.dataset.target;
  const delay  = 1100 + idx * 300; /* escalonado: 1.1s, 1.4s, 1.7s */
  setTimeout(() => countUp(el, target, 900), delay);
});

/* ══════════════════════════════════════════════════
   CAROUSEL DE TESTIMONIOS
   ══════════════════════════════════════════════════ */
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn       = document.getElementById('carouselPrev');
const nextBtn       = document.getElementById('carouselNext');
const carouselDots  = document.querySelectorAll('.carousel-dot');

let currentIdx = 0;
const cards    = carouselTrack ? carouselTrack.querySelectorAll('.testimonial-card') : [];
const total    = cards.length;

function goTo(idx) {
  if (!carouselTrack || total === 0) return;
  currentIdx = ((idx % total) + total) % total;

  /* Ancho exacto de una tarjeta = ancho del contenedor overflow:hidden */
  const cardWidth = carouselTrack.parentElement.offsetWidth;
  carouselTrack.style.transform = `translateX(-${currentIdx * cardWidth}px)`;

  /* Actualizar puntos */
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
}

if (carouselTrack && prevBtn && nextBtn) {
  /* Botones */
  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

  /* Puntos */
  carouselDots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

  /* Auto-play cada 5 segundos */
  let autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);

  const wrap = carouselTrack.closest('.carousel-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(autoPlay));
  wrap.addEventListener('mouseleave', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);
  });

  /* Recalcular al redimensionar ventana */
  window.addEventListener('resize', () => goTo(currentIdx), { passive: true });

  /* Swipe táctil */
  let startX = 0;
  carouselTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  carouselTrack.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentIdx + (diff > 0 ? 1 : -1));
  });
}