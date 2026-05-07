/* ════════════════════════════════════════════
   PALLAPU SHIVA SAI RAM — PORTFOLIO
   script.js  |  All interactive behaviour
════════════════════════════════════════════ */

/* ──────────────────────────────────────────
   1. NAVIGATION — Sticky + Active Links
────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 40);
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ──────────────────────────────────────────
   2. HAMBURGER MENU (mobile)
────────────────────────────────────────── */
const hbg = document.getElementById('hbg');
const mobNav = document.getElementById('mobNav');

hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  mobNav.classList.toggle('open');
});

mobNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hbg.classList.remove('open');
    mobNav.classList.remove('open');
  });
});

/* ──────────────────────────────────────────
   3. SCROLL REVEAL ANIMATIONS
────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rev').forEach(el => revealObserver.observe(el));

/* ──────────────────────────────────────────
   4. SKILL BAR ANIMATIONS
────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sk-fill').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ──────────────────────────────────────────
   5. STAGGERED ENTRY DELAYS
────────────────────────────────────────── */
document.querySelectorAll('.edu-item').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});
document.querySelectorAll('.ach-row').forEach((row, i) => {
  row.style.transitionDelay = (i * 0.07) + 's';
});

/* ──────────────────────────────────────────
   6. CONTACT FORM
────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    btn.style.display = 'none';
    formOk.classList.add('show');
    contactForm.reset();
  }, 1400);
});

/* ──────────────────────────────────────────
   7. CURSOR GLOW TRAIL (desktop only)
────────────────────────────────────────── */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed', 'pointer-events:none', 'z-index:9999',
    'width:380px', 'height:380px', 'border-radius:50%',
    'background:radial-gradient(circle,rgba(0,229,160,0.04) 0%,transparent 70%)',
    'transform:translate(-50%,-50%)',
    'transition:left 0.4s ease,top 0.4s ease',
    'will-change:left,top'
  ].join(';');
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ──────────────────────────────────────────
   8. CERTIFICATE LIGHTBOX
   Click any certificate image to view full.
   Esc or click outside to close.
────────────────────────────────────────── */
const certMeta = {
  'https://res.cloudinary.com/dqt0mqudj/image/upload/f_auto,q_auto/1000034154_dqinew':
    'C Programming Certification — NSIC',
  'https://res.cloudinary.com/dq7t2qkql/image/upload/Vaisheshika-2026_qei2iq':
    'Vaisheshika-2026 Participation Certificate'
};

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const label = document.getElementById('lightboxLabel');

  img.src = src;
  label.textContent = certMeta[src] || 'Certificate';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this || e.target.classList.contains('lightbox-label') || e.target.classList.contains('lightbox-hint'))
    closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
