/* ═══════════════════════════════════════════════════════════════
   TESSERA · Paquete de animaciones (OPCIONAL, fácil de quitar)
   ───────────────────────────────────────────────────────────────
   1 · Scroll suave (Lenis)
   2 · Titulares que se revelan palabra a palabra
   3 · Tilt 3D en tarjetas y foto
   4 · Parallax de la foto al hacer scroll
   5 · Partículas WebGL (fondo de la sección de testimonios)

   Para QUITARLAS TODAS: borra este archivo y css/animations.css, las
   etiquetas de animaciones (three.js · lenis · animations.js) y los
   div .page-curtain y #casosParticles en index.html / careers.html.
   Respeta prefers-reduced-motion (si está activo, no se ejecuta nada).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── 1 · SCROLL SUAVE (Lenis) — ligero y solo en escritorio ──
     En táctil se usa el scroll nativo (más fluido, sin tirones). */
  var lenis = null;
  if (canHover && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1 });
    requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
  }

  // Anclas internas (#seccion) con desplazamiento suave (con Lenis o nativo)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var sel = a.getAttribute('href');
    if (sel.length > 1 && document.querySelector(sel)) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(sel);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(sel, { offset: -80 });
        } else {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
      });
    }
  });

  /* ── 2 · TITULARES QUE SE REVELAN (palabra a palabra) ── */
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

  /* ── 3 · TILT 3D en tarjetas y foto ── */
  if (canHover) {
    document.querySelectorAll('.careers-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ── 4 · PARALLAX (la foto se desliza dentro de su marco) ── */
  var pEls = [];
  document.querySelectorAll('.section-video-parallax img').forEach(function (el) { pEls.push(el); });

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

  /* ── 5 · PARTÍCULAS WebGL (fondo de #casos) ── */
  var pWrap = document.getElementById('casosParticles');
  if (pWrap && typeof THREE !== 'undefined') {
    var W = pWrap.clientWidth, H = pWrap.clientHeight || 600;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
    camera.position.z = 80;
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    pWrap.appendChild(renderer.domElement);

    var dotTex = (function () {
      var c = document.createElement('canvas'); c.width = c.height = 64;
      var x = c.getContext('2d');
      var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.55, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.beginPath(); x.arc(32, 32, 32, 0, Math.PI * 2); x.fill();
      var t = new THREE.Texture(c); t.needsUpdate = true; return t;
    })();

    var N = 60, RX = 64, RY = 40, RZ = 26, THR = 320;
    var parr = new Float32Array(N * 3), vel = [];
    for (var i = 0; i < N; i++) {
      parr[i * 3]     = (Math.random() - 0.5) * RX * 2;
      parr[i * 3 + 1] = (Math.random() - 0.5) * RY * 2;
      parr[i * 3 + 2] = (Math.random() - 0.5) * RZ * 2;
      vel.push([(Math.random() - 0.5) * 0.045, (Math.random() - 0.5) * 0.045, (Math.random() - 0.5) * 0.045]);
    }
    var pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(parr, 3));
    var pmat = new THREE.PointsMaterial({ color: 0xf0d35e, size: 2.2, map: dotTex, transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending });
    var points = new THREE.Points(pgeo, pmat);

    var lpos = new Float32Array(N * (N - 1) / 2 * 6);
    var lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
    var lines = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: 0x6e9195, transparent: true, opacity: 0.18 }));

    var group = new THREE.Group(); group.add(lines); group.add(points); scene.add(group);

    var mx = 0, my = 0, base = 0, visible = true;
    var casos = document.getElementById('casos');
    (casos || pWrap).addEventListener('mousemove', function (e) {
      var r = pWrap.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5);
      my = ((e.clientY - r.top) / r.height - 0.5);
    });
    if ('IntersectionObserver' in window && casos) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(casos);
    }

    var lineTick = 0;
    (function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      for (var i = 0; i < N; i++) {
        parr[i * 3] += vel[i][0]; parr[i * 3 + 1] += vel[i][1]; parr[i * 3 + 2] += vel[i][2];
        if (parr[i * 3] > RX || parr[i * 3] < -RX)         vel[i][0] *= -1;
        if (parr[i * 3 + 1] > RY || parr[i * 3 + 1] < -RY) vel[i][1] *= -1;
        if (parr[i * 3 + 2] > RZ || parr[i * 3 + 2] < -RZ) vel[i][2] *= -1;
      }
      pgeo.attributes.position.needsUpdate = true;
      // El recálculo de líneas es O(N²): lo hacemos cada 2 frames para aligerar CPU
      if ((lineTick++ & 1) === 0) {
        var c = 0;
        for (var a = 0; a < N; a++) for (var b = a + 1; b < N; b++) {
          var dx = parr[a * 3] - parr[b * 3], dy = parr[a * 3 + 1] - parr[b * 3 + 1], dz = parr[a * 3 + 2] - parr[b * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < THR) {
            lpos[c++] = parr[a * 3]; lpos[c++] = parr[a * 3 + 1]; lpos[c++] = parr[a * 3 + 2];
            lpos[c++] = parr[b * 3]; lpos[c++] = parr[b * 3 + 1]; lpos[c++] = parr[b * 3 + 2];
          }
        }
        lgeo.setDrawRange(0, c / 3);
        lgeo.attributes.position.needsUpdate = true;
      }
      base += 0.0007;
      group.rotation.y += ((base + mx * 0.45) - group.rotation.y) * 0.05;
      group.rotation.x += ((my * 0.28) - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', function () {
      W = pWrap.clientWidth; H = pWrap.clientHeight || 600;
      camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
    });
  }

})();
