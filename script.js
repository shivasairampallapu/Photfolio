/* ════════════════════════════════════════════
   PALLAPU SHIVA SAI RAM — PORTFOLIO
   script.js  |  All interactive behaviour
════════════════════════════════════════════ */

/* ──────────────────────────────────────────
   1. NAVIGATION — Sticky + Active Links
────────────────────────────────────────── */
const nav = document.getElementById('nav');

// Add .stuck class on scroll to apply frosted glass effect
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 40);
}, { passive: true });

// Highlight the active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

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
const hbg    = document.getElementById('hbg');
const mobNav = document.getElementById('mobNav');

hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  mobNav.classList.toggle('open');
});

// Close mobile menu when any link is tapped
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
   Bars animate to their target width when
   the skills section enters the viewport.
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
   6. CONTACT FORM — Simulated Submit
────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formOk      = document.getElementById('formOk');

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
    'position: fixed',
    'pointer-events: none',
    'z-index: 9999',
    'width: 380px',
    'height: 380px',
    'border-radius: 50%',
    'background: radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 70%)',
    'transform: translate(-50%, -50%)',
    'transition: left 0.4s ease, top 0.4s ease',
    'will-change: left, top',
  ].join(';');
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ──────────────────────────────────────────
   8. PHOTO UPLOAD MODAL
   Click the profile ring to upload a photo.
────────────────────────────────────────── */
let photoDataUrl = null;

function openPhotoModal() {
  document.getElementById('photoModal').classList.add('open');
}

function closePhotoModal() {
  document.getElementById('photoModal').classList.remove('open');
  photoDataUrl = null;
  document.getElementById('photoPreview').style.display  = 'none';
  document.getElementById('photoDropZone').style.display = 'block';
  document.getElementById('photoSaveBtn').style.display  = 'none';
}

const photoInput   = document.getElementById('photoInput');
const photoDropZone = document.getElementById('photoDropZone');

// Open file picker on drop-zone click
photoDropZone.addEventListener('click', () => photoInput.click());

// Drag-and-drop support
photoDropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  photoDropZone.classList.add('drag');
});
photoDropZone.addEventListener('dragleave', () => photoDropZone.classList.remove('drag'));
photoDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  photoDropZone.classList.remove('drag');
  if (e.dataTransfer.files[0]) handlePhoto(e.dataTransfer.files[0]);
});

// File input change
photoInput.addEventListener('change', () => {
  if (photoInput.files[0]) handlePhoto(photoInput.files[0]);
});

function handlePhoto(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    photoDataUrl = e.target.result;
    const preview = document.getElementById('photoPreview');
    preview.src = photoDataUrl;
    preview.style.display = 'block';
    document.getElementById('photoDropZone').style.display = 'none';
    document.getElementById('photoSaveBtn').style.display  = 'inline-flex';
  };
  reader.readAsDataURL(file);
}

function savePhoto() {
  if (!photoDataUrl) return;
  const img = document.getElementById('profileImg');
  img.src = photoDataUrl;
  img.style.display = 'block';
  document.getElementById('profilePlaceholder').style.display = 'none';
  closePhotoModal();
}

// Close modal when clicking the backdrop
document.getElementById('photoModal').addEventListener('click', function (e) {
  if (e.target === this) closePhotoModal();
});

/* ──────────────────────────────────────────
   9. CERTIFICATE LIGHTBOX
   Click any certificate image to enlarge it.
   Press Escape or click outside to close.
────────────────────────────────────────── */
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Close on backdrop click
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});