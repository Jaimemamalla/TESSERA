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

/* Mapeo: id de sección → tema de la nav */
const sectionThemes = {
  'top':         'dark',   /* hero con vídeo */
  'about':       'light',  /* beige claro    */
  'servicios':   'light',  /* blanco roto    */
  'metodologia': 'dark',   /* verde oscuro   */
  'entregable':  'light',  /* beige          */
  'casos':       'light',  /* blanco roto    */
  'contacto':    'dark',   /* navy           */
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

/* Estado inicial: hero oscuro */
setNavTheme('dark');

/* Observer: detecta qué sección ocupa el top del viewport */
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
  /* La franja activa es los primeros ~15% del viewport tras la nav */
});

/* Observa solo las secciones que tienen tema definido */
Object.keys(sectionThemes).forEach(id => {
  const el = document.getElementById(id);
  if (el) themeObs.observe(el);
});

/* ── Parallax en el vídeo del hero ── */
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroVideo.style.transform = `translateY(${y * 0.4}px)`;
    }
  }, { passive: true });
}

/* ── Menú móvil ── */
function toggleMobile() {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
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

/* Contadores sección #servicios */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const sp = e.target.querySelector('.count');
      if (sp && !sp.dataset.done) {
        sp.dataset.done = '1';
        countUp(sp, +e.target.dataset.target, 1800);
      }
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* Contadores sección #metodologia */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUp(e.target, +e.target.dataset.target, 1200);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count-anim').forEach(el => animObs.observe(el));

/* ── Barras de progreso ── */
const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 120);
      });
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ps = document.querySelector('.progress-section');
if (ps) progObs.observe(ps);

/* ── Timeline horizontal ── */
const htObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    const dots  = e.target.querySelectorAll('.h-dot');
    const steps = e.target.querySelectorAll('.h-step');
    const rail  = document.getElementById('hRail');

    if (rail) setTimeout(() => rail.classList.add('animated'), 100);

    dots.forEach((dot, i) => {
      setTimeout(() => dot.classList.add('entered'), 120 + i * 200);
    });

    steps.forEach((step, i) => {
      setTimeout(() => step.classList.add('visible'), 280 + i * 180);
    });

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