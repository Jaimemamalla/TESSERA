/* ════════════════════════════════════════════════
   TESSERA · Finanzas y capital humano — main.js
   Segunda web (Netlify) + barras con hover
   ════════════════════════════════════════════════ */

/* ── Barra de progreso de scroll ── */
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
});

/* ── Nav: clase scrolled + color logo ── */
const nav     = document.getElementById('mainNav');
const navLogo = nav.querySelector('.nav-logo');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  nav.classList.toggle('scrolled', scrolled);
  navLogo.style.color = scrolled ? 'var(--navy)' : 'var(--beige)';
});

/* ── Menú móvil ── */
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

/* Contadores sección #servicios (data-target en el wrapper) */
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

/* Contadores sección #metodologia (.count-anim) */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUp(e.target, +e.target.dataset.target, 1200);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count-anim').forEach(el => animObs.observe(el));

/* ── Barras de progreso: animación de entrada ──
   El hover lo gestiona el CSS (no necesita JS).
   Este observer solo anima el width al entrar en viewport. */
const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 120);
      });
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ps = document.querySelector('.progress-section');
if (ps) progObs.observe(ps);

/* ── Timeline horizontal: línea + pasos ── */
const htObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const rail = document.getElementById('hRail');
      if (rail) setTimeout(() => rail.classList.add('animated'), 100);
      e.target.querySelectorAll('.h-step').forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), 200 + i * 160);
      });
      htObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });
const ht = document.getElementById('hTimeline');
if (ht) htObs.observe(ht);
