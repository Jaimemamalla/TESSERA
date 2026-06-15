/* ════════════════════════════════════════════
   TESSERA · main.js
   ════════════════════════════════════════════ */

const nav       = document.getElementById('mainNav');
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
}, { passive: true });

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ══ NAV ADAPTABLE ══ */
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
    const theme = sectionThemes[entry.target.id];
    if (theme) setNavTheme(theme);
  });
}, { threshold: 0, rootMargin: '-50px 0px -85% 0px' });

Object.keys(sectionThemes).forEach(id => {
  const el = document.getElementById(id);
  if (el) themeObs.observe(el);
});

const heroVideo = document.querySelector('.hero-video');
let isTicking = false;

if (heroVideo) {
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroVideo.style.transform = `translateY(${y * 0.4}px)`;
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}

function toggleMobile() {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-box').forEach(el => statObs.observe(el));

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

const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ps = document.querySelector('.progress-section');
if (ps) progObs.observe(ps);

const htObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('animated');
    const dots  = e.target.querySelectorAll('.h-dot');
    const steps = e.target.querySelectorAll('.h-step');
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

document.querySelectorAll('.proof-count').forEach((el, idx) => {
  const target = +el.dataset.target;
  setTimeout(() => countUp(el, target, 900), 1100 + idx * 300);
});

/* ══ CAROUSEL DE TESTIMONIOS ══ */
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
  const cardWidth = carouselTrack.parentElement.offsetWidth;
  carouselTrack.style.transform = `translateX(-${currentIdx * cardWidth}px)`;
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
}

if (carouselTrack && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));
  carouselDots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

  let autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);
  const wrap = carouselTrack.closest('.carousel-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(autoPlay));
  wrap.addEventListener('mouseleave', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);
  });

  window.addEventListener('resize', () => goTo(currentIdx), { passive: true });

  let startX = 0;
  carouselTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  carouselTrack.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentIdx + (diff > 0 ? 1 : -1));
  });
}

/* ══ MODAL DE CONTACTO ══ */
const contactModal = document.getElementById('contactModal');

function openModal() {
  contactModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  contactModal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === contactModal) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function submitModal(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const nombre  = form.nombre.value.trim();
  const empresa = form.empresa.value.trim();
  const email   = form.email.value.trim();
  const telefono= form.telefono.value.trim();

  const hsUrl = 'https://share.hsforms.com/1d6NoOkGySleNnmgRx9twyQsi5os'
    + '?firstname=' + encodeURIComponent(nombre)
    + '&company='   + encodeURIComponent(empresa)
    + '&email='     + encodeURIComponent(email)
    + '&phone='     + encodeURIComponent(telefono);

  window.open(hsUrl, '_blank');
  closeModal();
  form.reset();
}