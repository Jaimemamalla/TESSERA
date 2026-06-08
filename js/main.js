/* ════════════════════════════════════════════════
   TESSERA — JavaScript principal
   ════════════════════════════════════════════════ */

/* ─── CURSOR PERSONALIZADO ─────────────────────── */
const cursor  = document.getElementById('cursor');
const dot     = document.getElementById('cursor-dot');
const ring    = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animCursor() {
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .service-card, .testimonial-card, .pillar').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ─── BARRA DE PROGRESO DE SCROLL ──────────────── */
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
});


/* ─── NAV — ESTADO AL HACER SCROLL ─────────────── */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


/* ─── MENÚ MÓVIL ───────────────────────────────── */
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');

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

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobile();
});


/* ─── REVEAL AL HACER SCROLL ───────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── ANIMACIÓN COUNT-UP ───────────────────────── */
/**
 * Anima un elemento de 0 hasta `target` en `duration` ms
 * @param {HTMLElement} el       - elemento cuyo textContent se actualiza
 * @param {number}      target   - valor final
 * @param {number}      duration - duración en ms
 */
function countUpStart(el, target, duration) {
  requestAnimationFrame(startTime => {
    (function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    })(startTime);
  });
}

// Contadores de la sección #stats  (data-target en el wrapper)
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const span = e.target.querySelector('.count');
      if (span && !span.dataset.done) {
        span.dataset.done = '1';
        countUpStart(span, parseInt(e.target.dataset.target), 1800);
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// Contadores de la sección #metodologia  (.count-anim con data-target en sí mismos)
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUpStart(e.target, parseInt(e.target.dataset.target), 1200);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.count-anim').forEach(el => animObserver.observe(el));


/* ─── TIMELINE — LÍNEAS ANIMADAS ───────────────── */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.timeline-step').forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), i * 120);
      });
    }
  });
}, { threshold: 0.2 });

const track = document.querySelector('.timeline-track');
if (track) timelineObserver.observe(track);
