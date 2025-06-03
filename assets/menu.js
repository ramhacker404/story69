function toggleMenu() {
      const menu = document.getElementById("nav-menu");
      menu.classList.toggle("show");
    }

    document.addEventListener("click", function(event) {
      const navMenu = document.getElementById("nav-menu");
      const toggleBtn = document.querySelector(".menu-toggle");
      if (!navMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
        navMenu.classList.remove("show");
      }
    });

    // Carousel scroll tracking
    const carousel = document.getElementById("langCarousel");
    const indicators = document.querySelectorAll("#langIndicators span");

    carousel.addEventListener("scroll", () => {
      const index = Math.round(carousel.scrollLeft / (carousel.scrollWidth / 5));
      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    });
