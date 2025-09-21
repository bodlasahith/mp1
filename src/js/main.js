// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVBAR FUNCTIONALITY =====
  const navbar = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 70;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Mobile hamburger menu toggle
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Navbar scroll effects and position indicator
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Navbar resizing effect
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Position indicator - highlight active section
    const sections = document.querySelectorAll("section, header");
    let currentSection = "";

    // Special handling for bottom of page
    if (scrollTop + windowHeight >= documentHeight - 100) {
      currentSection = "#contact";
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSection = "#" + section.id;
        }
      });
    }

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Throttled scroll event listener for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        updateNavbar();
        scrollTimeout = null;
      }, 10);
    }
  });

  // Initialize navbar state
  updateNavbar();

  // ===== CAROUSEL FUNCTIONALITY =====
  const carousel = document.getElementById("teamCarousel");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Carousel navigation event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-advance carousel every 5 seconds
  setInterval(nextSlide, 5000);

  // Touch/swipe support for mobile
  let startX = 0;
  let startY = 0;

  carousel.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  carousel.addEventListener("touchend", function (e) {
    if (!startX || !startY) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Only process horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > 50) {
        // Minimum swipe distance
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    startX = 0;
    startY = 0;
  });

  // ===== SCROLL ANIMATIONS =====
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".feature-item, .team-member, .hero-text, .hero-image, .video-section"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize scroll animations
  const animatedElements = document.querySelectorAll(".feature-item, .team-member");
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Throttled scroll animation
  let animationTimeout;
  window.addEventListener("scroll", function () {
    if (!animationTimeout) {
      animationTimeout = setTimeout(function () {
        animateOnScroll();
        animationTimeout = null;
      }, 50);
    }
  });

  // Initial animation check
  animateOnScroll();

  // ===== MODAL FUNCTIONALITY =====
  const teamMembers = document.querySelectorAll(".team-member");
  const modal = document.getElementById("teamModal");
  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalDescription = document.getElementById("modalDescription");
  const modalEducation = document.getElementById("modalEducation");
  const modalWork = document.getElementById("modalWork");
  const closeButton = document.querySelector(".close-button");

  // Open Modal
  teamMembers.forEach((member) => {
    member.addEventListener("click", () => {
      const name = member.getAttribute("data-name");
      const description = member.getAttribute("data-description");
      const education = member.getAttribute("data-education");
      const work = member.getAttribute("data-work");
      const image = member.getAttribute("data-image");

      modalName.textContent = name;
      modalDescription.textContent = description;
      modalEducation.textContent = education;
      modalWork.textContent = work;
      modalImage.src = image;

      modal.classList.add("show");
    });
  });

  // Close Modal
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Close Modal on Outside Click
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  // ===== UTILITY FUNCTIONS =====

  // Smooth scroll to top functionality (if needed)
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Add hover effects to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease";
    });
  });

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Lazy loading for images (basic implementation)
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  // Keyboard navigation for carousel
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Focus management for modal

  // ===== RESPONSIVE BEHAVIOR =====

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", function () {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        // Update any responsive calculations here
        updateNavbar();
        resizeTimeout = null;
      }, 100);
    }
  });

  // ===== CONSOLE GREETING =====
  console.log(
    "%c🚀 OneSpace Website Loaded Successfully!",
    "color: #2937f0; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cBuilt with vanilla HTML, SCSS, and JavaScript for CS 409 MP1",
    "color: #666; font-size: 12px;"
  );
});

// ===== GLOBAL FUNCTIONS =====

// Utility function to detect mobile devices
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to get viewport dimensions
function getViewportDimensions() {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  };
}

// Export functions if needed (for testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isMobileDevice,
    getViewportDimensions,
  };
}
