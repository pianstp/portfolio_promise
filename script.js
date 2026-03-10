document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const themeToggle = document.getElementById('themeToggle');

  // Theme Management
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  initTheme();

  // Mobile Menu Management
  const setMenuState = (isOpen) => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      setMenuState(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenuState(false);
      }
    });
  }

  // Intersection Observer for animations
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Enhanced form handling
  const contactForm = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.form-submit');
  
  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.textContent = '✓ Message sent!';
      submitBtn.style.background = '#16a34a';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  
  const updateActiveNav = () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });
    
    navAnchors.forEach((anchor) => {
      anchor.style.color = anchor.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  };

  // Smooth scroll performance optimization
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateActiveNav();

  // Initialize hero animations
  setTimeout(() => {
    document.querySelectorAll('.hero-anim').forEach((el) => el.classList.add('is-in'));
  }, 100);

  // System theme detection
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

});