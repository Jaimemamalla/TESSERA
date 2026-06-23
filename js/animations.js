/* ═══════════════════════════════════════════════════════════════
   TESSERA · Paquete de animaciones (OPCIONAL, fácil de quitar)
   ───────────────────────────────────────────────────────────────
   1 · Scroll suave (Lenis)
   2 · Titulares que se revelan palabra a palabra
   3 · Botones magnéticos
   4 · Tilt 3D en tarjetas y foto
   5 · Parallax de la foto al hacer scroll

   Para QUITARLAS TODAS: borra este archivo y css/animations.css, y
   las 3 etiquetas de animaciones en index.html y careers.html.
   Respeta prefers-reduced-motion (si está activo, no se ejecuta nada).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── 1 · SCROLL SUAVE (Lenis) ───────────────────────────────── */
  var lenis = null;
  if (typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });

    // Anclas internas (#seccion) con desplazamiento suave
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var sel = a.getAttribute('href');
      if (sel.length > 1 && document.querySelector(sel)) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          lenis.scrollTo(sel, { offset: -80 });
        });
      }
    });
  }

  /* ── 2 · TITULARES QUE SE REVELAN (palabra a palabra) ───────── */
  var splitTargets = document.querySelectorAll('.hero-title, .section-title, .contact-title, .meth-title');

  function splitWords(el) {
    var out = [];
    (function walk(node, bucket) {
      Array.prototype.forEach.call(node.childNodes, function (c) {
        if (c.nodeType === 3) {
          c.textContent.split(/(\s+)/).forEach(function (tok) {
            if (tok === '') return;
            if (/^\s+$/.test(tok)) { bucket.push(document.createTextNode(tok)); return; }
            var mask = document.createElement('span'); mask.className = 'sr-word';
            var inner = document.createElement('span'); inner.textContent = tok;
            mask.appendChild(inner); bucket.push(mask);
          });
        } else if (c.nodeName === 'BR') {
          bucket.push(c.cloneNode());
        } else {
          var clone = c.cloneNode(false); var sub = [];
          walk(c, sub); sub.forEach(function (n) { clone.appendChild(n); });
          bucket.push(clone);
        }
      });
    })(el, out);
    el.innerHTML = '';
    out.forEach(function (n) { el.appendChild(n); });
    Array.prototype.forEach.call(el.querySelectorAll('.sr-word > span'), function (s, i) {
      s.style.transitionDelay = (i * 0.045) + 's';
    });
    el.classList.add('split-ready');
  }

  var splitObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('split-in'); splitObs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });

  splitTargets.forEach(function (el) { splitWords(el); splitObs.observe(el); });

  // Re-aplica el efecto tras cambiar de idioma (applyLanguage reescribe el innerHTML)
  try {
    if (typeof window.applyLanguage === 'function') {
      var _origAL = window.applyLanguage;
      window.applyLanguage = function () {
        _origAL.apply(this, arguments);
        try { splitTargets.forEach(function (el) { splitWords(el); el.classList.add('split-in'); }); } catch (err) {}
      };
    }
  } catch (err) {}

  /* ── 3 · BOTONES MAGNÉTICOS ─────────────────────────────────── */
  if (canHover) {
    document.querySelectorAll('.btn-primary, .btn-ghost').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.35) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ── 4 · TILT 3D en tarjetas y foto ─────────────────────────── */
  if (canHover) {
    document.querySelectorAll('.testimonial-card, .svc-detail-photo, .careers-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ── 5 · PARALLAX (la foto se desliza dentro de su marco) ───── */
  var pEls = [];
  document.querySelectorAll('.svc-detail-photo img').forEach(function (el) { pEls.push(el); });

  function updateParallax() {
    var vh = window.innerHeight;
    pEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var offset = ((r.top + r.height / 2) - vh / 2) * 0.05;
      el.style.transform = 'translateY(' + (-offset) + 'px) scale(1.14)';
    });
  }

  if (pEls.length) {
    if (lenis) lenis.on('scroll', updateParallax);
    else window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    updateParallax();
  }

})();
