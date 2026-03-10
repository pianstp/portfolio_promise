<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  const setMenuState = (isOpen) => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      setMenuState(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  const submitBtn = document.querySelector('.form-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.textContent = '\u2713 Message sent!';
      submitBtn.style.background = '#16a34a';
      window.setTimeout(() => {
        submitBtn.textContent = 'Send Message \u2192';
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const updateActiveNav = () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.id;
      }
    });
    navAnchors.forEach((anchor) => {
      anchor.style.color = anchor.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  };

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  document.querySelectorAll('.hero-anim').forEach((el) => el.classList.add('is-in'));
=======
// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Simple contact form alert
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent successfully!");
>>>>>>> 1dcc15f0cb7f5472966cfc162208c9a290e28f67
});
