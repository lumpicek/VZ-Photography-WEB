/* ============================================
   VZ Photography — main.js
   ============================================ */

/* === NAV: scroll effect === */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* === MOBILE MENU === */
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* === SCROLL REVEAL ANIMATIONS === */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* === CONTACT FORM === */
const contactForm = document.querySelector('.contact-form');
const formSuccess  = document.querySelector('.form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gdpr = contactForm.querySelector('input[name="gdpr"]');
    if (!gdpr || !gdpr.checked) {
      gdpr.style.outlineColor = 'var(--gold)';
      gdpr.focus();
      return;
    }
    // Simulate send (no real backend)
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Odesílám…';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 900);
  });
}

/* === COOKIE BANNER === */
(function cookieConsent() {
  const STORAGE_KEY = 'vz_cookie_consent';
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Show after short delay
  setTimeout(() => banner.classList.add('visible'), 1400);

  function dismiss(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 450);
  }

  banner.querySelector('.cookie-btn-accept').addEventListener('click',   () => dismiss('all'));
  banner.querySelector('.cookie-btn-decline').addEventListener('click',  () => dismiss('none'));
  banner.querySelector('.cookie-btn-settings').addEventListener('click', () => dismiss('custom'));
})();
