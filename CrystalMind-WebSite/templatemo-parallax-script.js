/* ==========================================================================
 Parallax Starter - Free HTML CSS Template
 TemplateMo 612 Parallax Starter
 https://templatemo.com/tm-612-parallax-starter
 ========================================================================== */
(function () {
  'use strict';

  var nav = document.getElementById('templatemo-nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navItems = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('.parallax-section');
  var parallaxBgs = document.querySelectorAll('.parallax-bg');
  var revealElements = document.querySelectorAll('.section-content');

  var isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    window.innerWidth <= 768;

  var ticking = false;

  function updateParallax() {
    if (isMobile) return;
    var scrollTop = window.pageYOffset;
    var windowHeight = window.innerHeight;

    parallaxBgs.forEach(function (bg) {
      var section = bg.parentElement;
      var rect = section.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > windowHeight + 300) {
        return;
      }
      var speed = parseFloat(bg.getAttribute('data-speed')) || 0.5;

      var sectionCenterY = rect.top + rect.height / 2;
      var viewportCenterY = windowHeight / 2;
      var offset = sectionCenterY - viewportCenterY;
      var totalTravel = windowHeight + rect.height;
      var normalized = offset / (totalTravel / 2);
      normalized = Math.max(-1, Math.min(1, normalized));

      var maxShift = windowHeight * speed;
      var translateY = normalized * maxShift;
      bg.style.transform =
        'translate3d(0,' + translateY.toFixed(1) + 'px,0)';
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (!isMobile) {
    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
  }

  window.addEventListener('resize', function () {
    isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      updateParallax();
    } else {
      parallaxBgs.forEach(function (bg) {
        bg.style.transform = 'translate3d(0,0,0)';
      });
    }
  });

  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  function updateActiveLink() {
    var scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  function checkReveal() {
    var windowHeight = window.innerHeight;
    var revealPoint = 120;

    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
})();