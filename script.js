'use strict';
/* ============================================================
   ONYEBUCHI PROMISE — Portfolio JavaScript
   Complete interactive layer
   ============================================================ */

/* ============================================================
   LOADER
   ============================================================ */
const loader    = document.getElementById('loader');
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';

    // Reveal hero elements in sequence
    document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 200 + i * 140);
    });

    // Show side social after delay
    setTimeout(() => {
      const ss = document.getElementById('sideSocial');
      if (ss) ss.classList.add('visible');
    }, 1200);

    // Show welcome toast
    showToast();
  }, 1800);
});

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-dot"></div>
    <span><strong>Available</strong> for remote & international opportunities</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:0 0 0 0.5rem;line-height:1;">×</button>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateCursor() {
    fx += (mx - fx) * 0.14;
    fy += (my - fy) * 0.14;
    cursorFollower.style.left = fx + 'px';
    cursorFollower.style.top  = fy + 'px';
    requestAnimationFrame(animateCursor);
  })();

  ['a', 'button', '.project-card', '.skill-tag', '.contact-link-card',
   '.info-card', '.timeline-content', '.btn'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });
  });
}

/* ============================================================
   PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = window.innerWidth < 768 ? 40 : 75;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  const palette = [
    'rgba(37,99,235,',    // blue
    'rgba(79,70,229,',    // indigo
    'rgba(16,185,129,',   // emerald
    'rgba(124,58,237,',   // purple
  ];

  function createParticle() {
    const color = palette[Math.floor(Math.random() * palette.length)];
    return {
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.8 + 0.4,
      dx:  (Math.random() - 0.5) * 0.4,
      dy:  (Math.random() - 0.5) * 0.4,
      o:   Math.random() * 0.55 + 0.05,
      color,
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxD = 120;
        if (dist < maxD) {
          const alpha = (1 - dist / maxD) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,70,229,${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    drawConnections();

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.o + ')';
      ctx.fill();
    });

    requestAnimationFrame(tick);
  }
  tick();
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.createElement('div');
progressBar.setAttribute('aria-hidden', 'true');
progressBar.style.cssText = `
  position:fixed;top:0;left:0;height:2px;
  background:linear-gradient(90deg,#2563EB,#4F46E5,#10B981);
  z-index:99999;width:0%;pointer-events:none;
  transition:width 0.08s linear;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docH      = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docH) * 100) + '%';
}, { passive: true });

/* ============================================================
   HEADER — scroll behaviour
   ============================================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   BACK TO TOP
   ============================================================ */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(l => l.classList.toggle('active', l.dataset.nav === id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObs.observe(s));

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // stagger siblings
    const siblings = Array.from(
      entry.target.parentNode.querySelectorAll('[data-reveal]:not(.revealed)')
    );
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('revealed'), Math.max(0, idx) * 80);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Exclude hero — those are handled post-load
document.querySelectorAll('[data-reveal]').forEach(el => {
  if (!el.closest('.hero')) revealObs.observe(el);
});

/* ============================================================
   ANIMATED NUMBER COUNTERS
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const dur    = 1400;
  const start  = performance.now();

  function step(now) {
    const pct     = Math.min((now - start) / dur, 1);
    const eased   = 1 - Math.pow(1 - pct, 4);       // ease-out quartic
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (pct < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.count) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger      = document.getElementById('hamburger');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileClose    = document.getElementById('mobileMenuClose');
const mobileOverlay  = document.getElementById('mobileOverlay');

function openMenu()  {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMenu);
mobileClose?.addEventListener('click', closeMenu);
mobileOverlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMenu));

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
updateIcon(saved);

function updateIcon(t) {
  if (themeIcon) themeIcon.className = t === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle?.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

/* ============================================================
   HERO ROLE WORD CYCLING
   ============================================================ */
const roleWords   = document.querySelectorAll('.role-word');
let activeRole    = 0;

if (roleWords.length > 1) {
  setInterval(() => {
    roleWords[activeRole].classList.remove('active');
    roleWords[activeRole].classList.add('exit');

    const prev = activeRole;
    activeRole = (activeRole + 1) % roleWords.length;

    setTimeout(() => {
      roleWords[prev].classList.remove('exit');
      roleWords[activeRole].classList.add('active');
    }, 480);
  }, 2800);
}

/* ============================================================
   PROJECT CARDS — 3D TILT
   ============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform   = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition  = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'all 0.3s ease';
  });
});

/* ============================================================
   INFO CARDS — stagger reveal
   ============================================================ */
const infoCards  = document.querySelectorAll('.info-card');
const cardObsrv  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const idx = Array.from(infoCards).indexOf(entry.target);
    setTimeout(() => {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }, idx * 100);
    cardObsrv.unobserve(entry.target);
  });
}, { threshold: 0.1 });

infoCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  cardObsrv.observe(card);
});

/* ============================================================
   CONTACT FORM — validation + submit
   ============================================================ */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function setErr(id, errId, msg) {
  const inp = document.getElementById(id);
  const err = document.getElementById(errId);
  inp && inp.classList.add('error');
  if (err) err.textContent = msg;
}
function clearErr(id, errId) {
  const inp = document.getElementById(id);
  const err = document.getElementById(errId);
  inp && inp.classList.remove('error');
  if (err) err.textContent = '';
}

['name','email','message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', e => {
    if (id === 'name'    && e.target.value.trim().length >= 2)     clearErr('name', 'nameError');
    if (id === 'email'   && isValidEmail(e.target.value))          clearErr('email', 'emailError');
    if (id === 'message' && e.target.value.trim().length >= 10)    clearErr('message', 'messageError');
  });
});

form?.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let ok = true;

  if (name.length < 2)        { setErr('name', 'nameError', 'Please enter your full name'); ok = false; }
  else                          clearErr('name', 'nameError');

  if (!isValidEmail(email))   { setErr('email', 'emailError', 'Please enter a valid email'); ok = false; }
  else                          clearErr('email', 'emailError');

  if (message.length < 10)    { setErr('message', 'messageError', 'Message must be at least 10 characters'); ok = false; }
  else                          clearErr('message', 'messageError');

  if (!ok) return;

  // Simulate send
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending…';
  const icon = submitBtn.querySelector('i');
  if (icon) icon.className = 'fas fa-spinner fa-spin';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    if (icon) icon.className = 'fas fa-paper-plane';
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ============================================================
   SKILL TAG RIPPLE
   ============================================================ */
const rippleCSS = document.createElement('style');
rippleCSS.textContent = '@keyframes rippleOut{to{transform:scale(2.5);opacity:0;}}';
document.head.appendChild(rippleCSS);

document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', e => {
    const r = document.createElement('span');
    r.style.cssText = `
      position:absolute;border-radius:50%;
      width:80px;height:80px;
      background:rgba(255,255,255,0.12);
      transform:scale(0);
      animation:rippleOut 0.5s ease forwards;
      left:${e.offsetX - 40}px;top:${e.offsetY - 40}px;
      pointer-events:none;
    `;
    tag.style.position = 'relative';
    tag.style.overflow = 'hidden';
    tag.appendChild(r);
    setTimeout(() => r.remove(), 550);
  });
});

/* ============================================================
   RESUME MODAL
   ============================================================ */
const resumeModal = document.getElementById('resumeModal');
const resumeModalClose = document.getElementById('resumeModalClose');
const resumeModalOverlay = document.querySelector('.resume-modal-overlay');

function openResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (mobileOverlay) mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

resumeModalClose?.addEventListener('click', closeResumeModal);
resumeModalOverlay?.addEventListener('click', closeResumeModal);

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
    closeResumeModal();
  }
});

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   DEVELOPER EASTER EGG
   ============================================================ */
console.log('%c 👋 Hey there, developer! I see you snooping. 😄', 'font-size:15px;font-weight:bold;color:#4F46E5;');
console.log('%c Built by Onyebuchi Chukwuemerie Promise', 'font-size:12px;color:#10B981;');
console.log('%c github.com/pianstp · linkedin.com/in/onyebuchi-promise', 'font-size:11px;color:#9CA3AF;');
