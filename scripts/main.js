/* ============================================================
   SHARED FUNCTIONALITY — runs on every page
   ============================================================ */

// —— Sticky navbar ——
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// —— Hamburger menu ——
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// —— Scroll to top button ——
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-top-btn';
scrollBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 300);
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// —— Mark active nav link ——
document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// —— Close modal on ESC key (shared) ——
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal-overlay.open');
    if (openModal) {
      openModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* ============================================================
   i18n — LANGUAGE SYSTEM
   ============================================================ */

function detectBrowserLang() {
  const lang = navigator.language || navigator.userLanguage || 'en';
  return lang.startsWith('es') ? 'es' : 'en';
}

const i18n = {
  currentLang: localStorage.getItem('itour_lang') || detectBrowserLang(),

  init() {
    this.applyLang(this.currentLang);
    this.updateToggleUI(this.currentLang);
  },

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('itour_lang', lang);
    this.applyLang(lang);
    this.updateToggleUI(lang);
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  },

  t(path) {
    const keys = path.split('.');
    let val = translations[this.currentLang];
    for (const k of keys) {
      if (val === undefined || val === null) return path;
      val = val[k];
    }
    return (val !== undefined && val !== null) ? val : path;
  },

  applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (typeof text === 'string') el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.t(key);
      if (typeof text === 'string') el.placeholder = text;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const text = this.t(key);
      if (typeof text === 'string') el.setAttribute('aria-label', text);
    });
  },

  updateToggleUI(lang) {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    const flag  = lang === 'es' ? '🇩🇴' : '🇺🇸';
    const label = lang === 'es' ? 'ES' : 'EN';
    toggle.querySelector('.lang-flag').textContent  = flag;
    toggle.querySelector('.lang-label').textContent = label;

    document.querySelectorAll('.lang-option').forEach(opt => {
      const isActive = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('active', isActive);
      opt.setAttribute('aria-selected', isActive);
    });
  }
};

// Init + lang toggle wiring
document.addEventListener('DOMContentLoaded', () => {
  i18n.init();

  const langToggleBtn = document.getElementById('lang-toggle');
  const langDropdown  = document.querySelector('.lang-dropdown');

  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.contains('open');
      langDropdown.classList.toggle('open', !isOpen);
      langToggleBtn.classList.toggle('open', !isOpen);
      langToggleBtn.setAttribute('aria-expanded', !isOpen);
    });

    document.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', () => {
        i18n.setLang(option.getAttribute('data-lang'));
        langDropdown.classList.remove('open');
        langToggleBtn.classList.remove('open');
        langToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('#lang-toggle-wrapper')) {
        langDropdown.classList.remove('open');
        langToggleBtn.classList.remove('open');
        langToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        langDropdown.classList.remove('open');
        langToggleBtn.classList.remove('open');
        langToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
