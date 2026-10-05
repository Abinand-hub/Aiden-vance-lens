/**
 * AIDEN VANCE VISUAL — INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParallax();
  initReelModal();
  initLightbox();
  initLoveNotes();
  initHamburgerMenu();
});

/* 1. HERO 3D PARALLAX & TILT */
function initHeroParallax() {
  const heroSection = document.querySelector('.hero-exact-section');
  const camera = document.querySelector('.hero-camera-centerpiece');
  const filmStrip = document.querySelector('.hero-film-strip');
  const polaroids = document.querySelectorAll('.hero-right-stage .polaroid-frame');

  if (!heroSection) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (camera) {
      camera.style.transform = `translate(calc(-50% + ${x * 16}px), calc(-50% + ${y * 16}px))`;
    }

    if (filmStrip) {
      filmStrip.style.transform = `rotate(-12deg) translate(${x * -18}px, ${y * -18}px)`;
    }

    polaroids.forEach((pol, idx) => {
      const factor = (idx + 1) * 7;
      pol.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    if (camera) camera.style.transform = 'translate(-50%, -50%)';
    if (filmStrip) filmStrip.style.transform = 'rotate(-12deg) translateY(-20px)';
    polaroids.forEach(pol => pol.style.transform = '');
  });
}

/* 2. CINEMATIC VIDEO REEL MODAL */
function initReelModal() {
  const triggers = document.querySelectorAll('.trigger-reel-modal');
  const modal = document.getElementById('reelModal');
  const closeBtn = document.getElementById('closeReelModal');
  const iframe = document.getElementById('reelVideoIframe');

  if (!modal) return;

  const cinematicUrl = "https://www.youtube-nocookie.com/embed/9No-FiEInLA?autoplay=1&controls=1&rel=0&modestbranding=1";

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (iframe) iframe.src = cinematicUrl;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* 3. LIGHTBOX FOR POLAROIDS & GALLERY ITEMS */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const sub = document.getElementById('lightboxSubtitle');
  const closeBtn = document.getElementById('closeLightboxModal');

  if (!modal) return;

  const items = document.querySelectorAll('[data-lightbox="true"]');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const imageEl = item.querySelector('img');
      if (!imageEl) return;

      if (img) img.src = imageEl.src;
      if (title) title.textContent = item.getAttribute('data-title') || 'Fine Art Photography';
      if (sub) sub.textContent = item.getAttribute('data-meta') || 'Aiden Vance Visuals';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox();
  });
}

/* 4. LOVE NOTES SLIDER (ARROWS) */
const testimonialsList = [
  {
    leftQuote: "Aiden Vance Visuals didn't just photograph our wedding - they photographed how it felt. We cried looking at the gallery.",
    rightQuote: "Every frame felt like it was waiting to happen. Somehow the eye was always exactly where the moment was.",
    leftImg: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80",
    rightImg: "assets/images/couple-romantic.jpg"
  },
  {
    leftQuote: "Looking through our 35mm film scans felt like stepping into an intimate editorial feature in Vogue. Truly timeless artistry.",
    rightQuote: "From the quiet tears of our vows to the wild dancing under the stars, every single emotion was preserved forever.",
    leftImg: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80",
    rightImg: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80"
  }
];

function initLoveNotes() {
  const prevBtn = document.getElementById('prevLoveNote');
  const nextBtn = document.getElementById('nextLoveNote');
  const leftQuoteEl = document.querySelector('.note-serif-quote');
  const rightQuoteEl = document.querySelector('.minimal-note-text');
  const leftImgEl = document.querySelector('.note-pinned-polaroid img');
  const rightImgEl = document.querySelector('.right-side-polaroid img');

  if (!prevBtn || !nextBtn) return;

  let currentIdx = 0;

  function updateSlide(idx) {
    const data = testimonialsList[idx];
    if (leftQuoteEl) leftQuoteEl.textContent = data.leftQuote;
    if (rightQuoteEl) rightQuoteEl.textContent = data.rightQuote;
    if (leftImgEl) leftImgEl.src = data.leftImg;
    if (rightImgEl) rightImgEl.src = data.rightImg;
  }

  nextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % testimonialsList.length;
    updateSlide(currentIdx);
  });

  prevBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + testimonialsList.length) % testimonialsList.length;
    updateSlide(currentIdx);
  });
}

/* 5. HAMBURGER MENU OVERLAY */
function initHamburgerMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('overlayCloseBtn');
  const links = document.querySelectorAll('.overlay-nav-link');

  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  links.forEach(l => l.addEventListener('click', closeMenu));
}
