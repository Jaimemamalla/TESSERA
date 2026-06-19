/* == NAV ADAPTABLE == */
const nav       = document.getElementById('mainNav');
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');
const scrollBar = document.getElementById('scroll-bar');
const langSwitch = document.getElementById('langSwitch');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
}, { passive: true });

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* == NAV ADAPTABLE == */
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

/* == CAMBIO DE IDIOMA == */
let currentLang = 'es';

const translations = {
  "es": {
    "meta": {
      "title": "TESSERA · Finanzas y Capital Humano para PYMES",
      "description": "Especialistas en M&A, CFO part-time, reestructuración y selección directiva para PYMES y startups en España."
    },
    "nav": {
      "about": "Nosotros",
      "finance": "Finanzas",
      "cases": "Casos",
      "cta": "Hablemos",
      "contact": "Contacto",
      "menuOpen": "Abrir menú"
    },
    "common": {
      "strategy": "Estrategia",
      "activeOutreach": "Outreach activo"
    },
    "hero": {
      "eyebrow": "Finanzas · Capital Humano · Estrategia",
      "title": "Las decisiones que<br><strong>definen tu empresa.</strong>",
      "sub": "La profundidad de una gran firma. La cercanía de un equipo que se sienta en tu mesa.",
      "ctaPrimary": "Hablemos de tu operación",
      "ctaGhost": "Ver servicios",
      "proof": {
        "advised": "asesorados",
        "deals": "operaciones",
        "years": " años",
        "experience": "de experiencia"
      }
    },
    "about": {
      "label": "Quiénes somos",
      "title": "Especialistas en finanzas y <strong>capital humano.</strong>",
      "lead": "Acompañamos a PYMES y startups en las decisiones que marcan su rumbo. Nos integramos dentro de tu compañía — en finanzas y en capital humano — para profesionalizar, ordenar y llevar el negocio al siguiente nivel.",
      "stat1num": "Senior",
      "stat1": "Equipo directivo con experiencia en banca de inversión, consultoría y operaciones reales",
      "stat2num": "3 áreas",
      "stat2desc": "Finanzas corporativas y capital humano bajo el mismo techo, sin silos"
    },
    "pillar": {
      "finance": {
        "desc": "M&amp;A, dirección financiera part-time, reestructuración y financiación."
      },
      "hc": {
        "desc": "Head hunting y selección de perfiles directivos y estratégicos."
      },
      "strategy": {
        "desc": "Consultoría, control de gestión y crecimiento con criterio y datos."
      }
    },
    "services": {
      "label": "Servicios · Finanzas",
      "title": "Capacidades financieras de <strong>principio a fin.</strong>",
      "lead": "No vendemos informes. Nos sentamos en tu mesa, entendemos tu negocio por dentro y tomamos las decisiones difíciles contigo.",
      "ebitda": "Y sí, lo decimos en voz alta: <strong>We love EBITDA.</strong>"
    },
    "svc": {
      "ma": {
        "title": "M&amp;A · Compraventa de Empresas",
        "desc": "Compraventa, valoración, due diligence y negociación hasta el cierre. Preparación y proceso para maximizar el valor de salida de tu compañía."
      },
      "cfo": {
        "desc": "Dirección financiera senior integrada en tu equipo: reporting, tesorería y control de gestión."
      },
      "restructuring": {
        "title": "Reestructuración",
        "desc": "Renegociación de deuda, planes de viabilidad y decisiones para reflotar el negocio."
      },
      "bp": {
        "title": "Business Plan",
        "desc": "Planes de negocio que convencen a un comité de inversión y respaldan tus decisiones de crecimiento."
      },
      "financing": {
        "title": "Financiación",
        "desc": "Levantamiento de deuda, equity y subvenciones para impulsar tu compañía."
      },
      "consulting": {
        "title": "Consultoría estratégica",
        "desc": "EBITDA, control de gestión y datos convertidos en decisiones que generan valor."
      },
      "erp": {
        "title": "Implementación de ERP",
        "desc": "Implementación y migración de ERP. Somos partners de diferentes ERP y te ayudamos con la migración o implementación de los más actuales del mercado como: Odoo, Holded…"
      }
    },
    "meth": {
      "label": "Human Capital · Selección",
      "title": "Encontramos el talento que <em>tu empresa necesita.</em>",
      "sub": "Identificamos, atraemos y seleccionamos perfiles directivos y estratégicos para PYMES y startups. No usamos bases de datos genéricas, hacemos búsqueda activa, directa y confidencial. Y nos comprometemos con plazos reales.",
      "numbersTitle": "Dos números. <strong>Un compromiso.</strong>"
    },
    "hc": {
      "item1": {
        "title": "Head hunting directivo",
        "desc": "Selección de C-level, directores de área y mandos intermedios clave. Perfiles que marcan la diferencia."
      },
      "item2": {
        "desc": "Gestión externa del talento para que tu equipo se centre en lo que importa. Flexible, eficiente y sin fricciones."
      },
      "item3": {
        "title": "Shortlist validado",
        "desc": "Solo llegan candidatos que encajan de verdad. Cada perfil viene con informe individual y disponibilidad confirmada."
      },
      "item4": {
        "title": "Plazos comprometidos",
        "desc": "Primer shortlist en 72 horas. Informe de mercado en 7 días. Sin excusas, sin dilaciones."
      }
    },
    "salary": {
      "label": "Transparencia salarial",
      "title": "Estudio y consultoría de <strong>transparencia salarial.</strong>",
      "desc": "Te ayudamos a anticiparte a la nueva normativa europea de transparencia salarial: análisis y diseño de bandas retributivas, auditoría de equidad y brecha salarial, y planes de acción para tu plantilla."
    },
    "meto": {
      "num1": {
        "label": "Primer shortlist",
        "desc": "Candidatos reales encima de tu mesa. Validados, disponibles y alineados con el rol."
      },
      "num2": {
        "label": "Informe de mercado",
        "desc": "Benchmarking salarial, mapa de talento, competidores y realidades que nadie te cuenta."
      }
    },
    "tessa": {
      "tag": "IA propia de selección",
      "desc": "Nuestra inteligencia artificial rastrea, identifica y prioriza al mejor talento del mercado en cada búsqueda. Tu shortlist no depende del azar, <strong>depende de datos</strong>."
    },
    "progress": {
      "title": "Lo que incluye cada proceso",
      "item1": "Identificación de talento",
      "item2": "Benchmarking salarial",
      "item3": "Análisis de mercado",
      "item4": "Shortlist en 72h",
      "item5": "Tasa de cierre"
    },
    "timeline": {
      "title": "Lo que pasa desde que firmamos hasta tu <strong>primer shortlist.</strong>",
      "step1": {
        "desc": "Briefing profundo con el hiring manager. Nada de formularios genéricos."
      },
      "step2": {
        "desc": "Mapa de empresas objetivo, boolean strings y canales activos y pasivos."
      },
      "step3": {
        "desc": "Contacto directo con talento pasivo. Mensajes personalizados, no plantillas."
      },
      "step4": {
        "desc": "Entrevistas estructuradas. Solo avanzan candidatos que encajan de verdad."
      },
      "step5": {
        "desc": "Perfiles validados, con informe individual y disponibilidad confirmada."
      }
    },
    "cases": {
      "label": "Lo que dicen de nosotros",
      "title": "Empresarios que <strong>ya tomaron la decisión.</strong>"
    },
    "t1": {
      "result": "Financiación conseguida",
      "quote": "Para nosotros fue determinante su involucración en profundizar en el entendimiento del negocio. Mejoraron la contabilidad, optimizaron la fiscalidad y nos consiguieron la financiación que necesitábamos.",
      "role": "CEO · Sector tecnología"
    },
    "t2": {
      "result": "2 adquisiciones cerradas",
      "quote": "Les estoy muy agradecido porque me ayudaron, con un éxito mayor del que imaginaba, a negociar y comprar dos compañías que me permitieron expandir mi negocio.",
      "role": "CEO · Expansión internacional"
    },
    "t3": {
      "result": "Reestructuración en plazo",
      "quote": "Entendieron perfectamente la problemática financiera de la compañía y se adentraron hasta el fondo, incluso en fin de semana, para ayudarnos en el plazo que requería.",
      "role": "CEO · Reestructuración financiera"
    },
    "carousel": {
      "prev": "Anterior",
      "next": "Siguiente"
    },
    "contact": {
      "title": "¿Tu operación merece<br><em>una conversación seria?</em>",
      "sub": "Cuéntanos el reto. En 24 horas tienes respuesta y en 72 una propuesta sobre la mesa.",
      "ctaPrimary": "Contactar ahora",
      "g1": "Respuesta en 24h",
      "g2": "Sin compromiso",
      "g3": "Confidencial"
    },
    "footer": {
      "about": "Especialistas en finanzas y capital humano para PYMES y startups en España.",
      "servicesHeading": "Servicios",
      "selection72": "Selección 72h",
      "companyHeading": "Empresa",
      "legalNotice": "Aviso legal",
      "privacy": "Privacidad"
    },
    "modal": {
      "close": "Cerrar",
      "sub": "Cuéntanos el reto. En 24h tienes respuesta.",
      "name": "Nombre *",
      "namePh": "Tu nombre",
      "company": "Empresa *",
      "companyPh": "Nombre de tu empresa",
      "emailPh": "correo@empresa.com",
      "phone": "Teléfono",
      "submit": "Enviar mensaje",
      "legal": "Al enviar aceptas nuestra <a href=\"https://jobs.tesseraservices.com/privacy-policy\" target=\"_blank\">política de privacidad</a>.",
      "sending": "Enviando…",
      "sent": "✓ Mensaje enviado",
      "error": "Error — inténtalo de nuevo"
    }
  },
  "en": {
    "meta": {
      "title": "TESSERA · Finance and Human Capital for SMEs",
      "description": "Specialists in M&A, part-time CFO, restructuring and executive search for SMEs and startups in Spain."
    },
    "nav": {
      "about": "About",
      "finance": "Finance",
      "cases": "Cases",
      "cta": "Let's talk",
      "contact": "Contact",
      "menuOpen": "Open menu"
    },
    "common": {
      "strategy": "Strategy",
      "activeOutreach": "Active outreach"
    },
    "hero": {
      "eyebrow": "Finance · Human Capital · Strategy",
      "title": "The decisions that<br><strong>define your company.</strong>",
      "sub": "The depth of a major firm. The closeness of a team that sits at your table.",
      "ctaPrimary": "Let's talk about your deal",
      "ctaGhost": "View services",
      "proof": {
        "advised": "advised",
        "deals": "deals",
        "years": " years",
        "experience": "of experience"
      }
    },
    "about": {
      "label": "Who we are",
      "title": "Specialists in finance and <strong>human capital.</strong>",
      "lead": "We support SMEs and startups through the decisions that shape their direction. We embed within your company — in finance and human capital — to professionalize, organize and take the business to the next level.",
      "stat1num": "We are seniors",
      "stat1": "Leadership team with experience in investment banking, consulting and real-world deals",
      "stat2num": "3 areas",
      "stat2desc": "Corporate finance and human capital under one roof, no silos"
    },
    "pillar": {
      "finance": {
        "desc": "M&amp;A, part-time financial leadership, restructuring and financing."
      },
      "hc": {
        "desc": "Head hunting and search for executive and strategic profiles."
      },
      "strategy": {
        "desc": "Consulting, management control and growth driven by judgment and data."
      }
    },
    "services": {
      "label": "Services · Finance",
      "title": "Financial capabilities from the <strong>beginning to the end.</strong>",
      "lead": "We don't sell reports. We sit at your table, understand your business from the inside, and make the hard decisions with you.",
      "ebitda": "And yes, we say it out loud: <strong>We love EBITDA.</strong>"
    },
    "svc": {
      "ma": {
        "title": "M&amp;A · Buy-Side &amp; Sell-Side",
        "desc": "Buy-side and sell-side deals, valuation, due diligence and negotiation through to closing. Preparation and process to maximize your company's exit value."
      },
      "cfo": {
        "desc": "Senior financial leadership embedded in your team: reporting, treasury and management control."
      },
      "restructuring": {
        "title": "Restructuring",
        "desc": "Debt renegotiation, viability plans and the decisions needed to turn the business around."
      },
      "bp": {
        "title": "Business Plan",
        "desc": "Business plans that convince an investment committee and back your growth decisions."
      },
      "financing": {
        "title": "Financing",
        "desc": "Raising debt, equity and grants to drive your company forward."
      },
      "consulting": {
        "title": "Strategic Consulting",
        "desc": "EBITDA, management control and data turned into decisions that create value."
      },
      "erp": {
        "title": "ERP Implementation",
        "desc": "ERP implementation and migration. We are partners of several ERPs and help you migrate or implement the most current ones on the market, such as: Odoo, Holded…"
      }
    },
    "meth": {
      "label": "Human Capital · Search",
      "title": "We find the talent <em>your company needs.</em>",
      "sub": "We identify, attract and select executive and strategic profiles for SMEs and startups. We don't rely on generic databases — we run active, direct and confidential search. And we commit to real deadlines.",
      "numbersTitle": "Two numbers. <strong>One commitment.</strong>"
    },
    "hc": {
      "item1": {
        "title": "Executive head hunting",
        "desc": "Search for C-level executives, department heads and key middle management. Profiles that make the difference."
      },
      "item2": {
        "desc": "Outsourced talent management so your team can focus on what matters. Flexible, efficient and frictionless."
      },
      "item3": {
        "title": "Validated shortlist",
        "desc": "Only candidates who genuinely fit make it through. Every profile comes with an individual report and confirmed availability."
      },
      "item4": {
        "title": "Committed deadlines",
        "desc": "First shortlist in 72 hours. Market report in 7 days. No excuses, no delays."
      }
    },
    "salary": {
      "label": "Pay transparency",
      "title": "Pay transparency <strong>study &amp; consulting.</strong>",
      "desc": "We help you get ahead of the new European pay transparency regulations: analysis and design of salary bands, pay equity and gender pay gap audits, and action plans for your workforce."
    },
    "meto": {
      "num1": {
        "label": "First shortlist",
        "desc": "Real candidates on your desk. Validated, available and aligned with the role."
      },
      "num2": {
        "label": "Market report",
        "desc": "Salary benchmarking, talent mapping, competitors and realities no one tells you about."
      }
    },
    "tessa": {
      "tag": "Proprietary search AI",
      "desc": "Our artificial intelligence tracks, identifies and prioritizes the best talent in the market for every search. Your shortlist doesn't depend on luck, <strong>it depends on data</strong>."
    },
    "progress": {
      "title": "What every process includes",
      "item1": "Talent identification",
      "item2": "Salary benchmarking",
      "item3": "Market analysis",
      "item4": "Shortlist in 72h",
      "item5": "Closing rate"
    },
    "timeline": {
      "title": "What happens from signing to your <strong>first shortlist.</strong>",
      "step1": {
        "desc": "In-depth briefing with the hiring manager. No generic forms."
      },
      "step2": {
        "desc": "Map of target companies, boolean strings, and active and passive channels."
      },
      "step3": {
        "desc": "Direct contact with passive talent. Personalized messages, not templates."
      },
      "step4": {
        "desc": "Structured interviews. Only candidates who truly fit move forward."
      },
      "step5": {
        "desc": "Validated profiles, with an individual report and confirmed availability."
      }
    },
    "cases": {
      "label": "What people say about us",
      "title": "Business owners who <strong>already made the decision.</strong>"
    },
    "t1": {
      "result": "Financing secured",
      "quote": "Their commitment to truly understanding our business was decisive for us. They improved our accounting, optimized our tax position and secured the financing we needed.",
      "role": "CEO · Technology sector"
    },
    "t2": {
      "result": "2 acquisitions closed",
      "quote": "I'm very grateful to them — they helped me, with greater success than I imagined, negotiate and acquire two companies that allowed me to expand my business.",
      "role": "CEO · International expansion"
    },
    "t3": {
      "result": "Restructuring on schedule",
      "quote": "They fully understood the company's financial challenges and got deeply involved, even on weekends, to help us meet the deadline it required.",
      "role": "CEO · Financial restructuring"
    },
    "carousel": {
      "prev": "Previous",
      "next": "Next"
    },
    "contact": {
      "title": "Does your deal deserve<br><em>a serious conversation?</em>",
      "sub": "Tell us the challenge. You'll have an answer in 24 hours and a proposal on the table in 72.",
      "ctaPrimary": "Contact us now",
      "g1": "Response in 24h",
      "g2": "No obligation",
      "g3": "Confidential"
    },
    "footer": {
      "about": "Specialists in finance and human capital for SMEs and startups in Spain.",
      "servicesHeading": "Services",
      "selection72": "72h Search",
      "companyHeading": "Company",
      "legalNotice": "Legal notice",
      "privacy": "Privacy"
    },
    "modal": {
      "close": "Close",
      "sub": "Tell us the challenge. You'll have an answer in 24h.",
      "name": "Name *",
      "namePh": "Your name",
      "company": "Company *",
      "companyPh": "Your company name",
      "emailPh": "email@company.com",
      "phone": "Phone",
      "submit": "Send message",
      "legal": "By submitting, you accept our <a href=\"https://jobs.tesseraservices.com/privacy-policy\" target=\"_blank\">privacy policy</a>.",
      "sending": "Sending…",
      "sent": "✓ Message sent",
      "error": "Error — please try again"
    }
  }
};

function i18nGet(lang, key) {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined) ? obj[k] : null, translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18n);
    if (val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nPlaceholder);
    if (val !== null) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nAria);
    if (val !== null) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nLabel);
    if (val !== null) el.setAttribute('data-label', val);
  });

  document.title = translations[lang].meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', translations[lang].meta.description);

  if (langSwitch) {
    if (lang === 'es') {
      langSwitch.textContent = 'ENG';
      langSwitch.setAttribute('aria-label', 'Cambiar idioma a inglés');
    } else {
      langSwitch.textContent = 'ESP';
      langSwitch.setAttribute('aria-label', 'Switch language to Spanish');
    }
  }

  currentLang = lang;
}

function toggleLanguage() {
  applyLanguage(currentLang === 'es' ? 'en' : 'es');
}

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

/* ══ ACORDEÓN DE SERVICIOS ══ */
function toggleService(btn) {
  const item = btn.closest('.service-item');
  const isOpen = item.classList.contains('open');

  // Comportamiento acordeón: cerrar el resto antes de abrir
  document.querySelectorAll('.service-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.service-toggle').setAttribute('aria-expanded', 'false');
    el.querySelector('.service-panel').setAttribute('aria-hidden', 'true');
  });

  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    item.querySelector('.service-panel').setAttribute('aria-hidden', 'false');
  }
}

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
  const data    = new FormData(form);

  const btn = form.querySelector('.modal-submit');
  btn.textContent = translations[currentLang].modal.sending;
  btn.disabled = true;

  fetch('https://formspree.io/f/xpqebwbb', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      btn.textContent = translations[currentLang].modal.sent;
      form.reset();
      setTimeout(() => closeModal(), 1800);
    } else {
      btn.textContent = translations[currentLang].modal.error;
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = translations[currentLang].modal.error;
    btn.disabled = false;
  });
}