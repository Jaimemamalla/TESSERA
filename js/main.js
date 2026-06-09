/* ════════════════════════════════════════════════
   TESSERA — JavaScript principal
   ════════════════════════════════════════════════ */

/* ─── Cursor personalizado ─────────────────────── */
const cursor  = document.getElementById('cursor');
const dot     = document.getElementById('cursor-dot');
const ring    = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

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


/* ─── Logo: color según sección ────────────────── */
// Cuando la nav no tiene clase scrolled (sobre el hero), el logo va en beige
const mainNav = document.getElementById('mainNav');
const navLogo = mainNav.querySelector('.nav-logo');

function updateLogoColor() {
  if (window.scrollY < 80) {
    navLogo.style.color = 'var(--beige)';
  } else {
    navLogo.style.color = 'var(--navy)';
  }
}
window.addEventListener('scroll', updateLogoColor);
updateLogoColor(); // inicial


/* ─── Barra de progreso de scroll ──────────────── */
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
});


/* ─── Nav scroll state ──────────────────────────── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


/* ─── Menú móvil ────────────────────────────────── */
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });


/* ─── Reveal al hacer scroll ────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── Count-up animation ────────────────────────── */
function countUpStart(el, target, duration) {
  requestAnimationFrame(startTime => {
    (function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    })(startTime);
  });
}

// Contadores sección #stats
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

// Contadores sección #metodologia
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUpStart(e.target, parseInt(e.target.dataset.target), 1200);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count-anim').forEach(el => animObserver.observe(el));


/* ─── Barras de progreso animadas ───────────────── */
// Se animan cuando entran en el viewport
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
        const targetWidth = bar.dataset.width + '%';
        // Escalonamos cada barra ligeramente
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, i * 120);
      });
      progressObserver.unobserve(e.target); // solo animar una vez
    }
  });
}, { threshold: 0.3 });

const progressSection = document.querySelector('.progress-section');
if (progressSection) progressObserver.observe(progressSection);


/* ─── Timeline: líneas animadas ─────────────────── */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.timeline-step').forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), i * 130);
      });
    }
  });
}, { threshold: 0.2 });

const track = document.querySelector('.timeline-track');
if (track) timelineObserver.observe(track);
