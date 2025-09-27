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

  // Section-by-section scrolling
  const sections = document.querySelectorAll('section');
  let currentSectionIndex = 0;
  let isScrolling = false;
  let scrollTimeout;

  function getCurrentSectionIndex() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return i;
      }
    }
    return 0;
  }

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      isScrolling = true;
      sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }

  window.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    e.preventDefault();
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      currentSectionIndex = getCurrentSectionIndex();
      
      if (e.deltaY > 0) {
        // Scrolling down
        if (currentSectionIndex < sections.length - 1) {
          scrollToSection(currentSectionIndex + 1);
        }
      } else {
        // Scrolling up
        if (currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
        }
      }
    }, 50);
  }, { passive: false });

  // Update current section on manual scroll
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      currentSectionIndex = getCurrentSectionIndex();
    }
  });
});

