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
});
