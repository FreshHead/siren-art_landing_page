document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Special handling for home link
      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Contact button WhatsApp functionality
  const contactBtn = document.querySelector(".contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      const message = encodeURIComponent(
        "Здравствуйте! Меня интересует аэрография для моего бизнеса.",
      );
      window.open(`https://wa.me/79093088799?text=${message}`, "_blank");
    });
  }

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)";
    }
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s";

        setTimeout(() => {
          img.style.opacity = "1";
        }, 100);

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
});

