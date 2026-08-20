/**
 * TALENTX — FINAL HOMEPAGE (LIGHT THEME)
 * Production Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================
     1) Mobile Navigation & Sheet Handling
     ============================================================ */
  const burgerBtn = document.querySelector('.mobile-burger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    document.body.classList.add('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    mobileMenu.setAttribute('aria-hidden', 'false');
  };

  const closeMobileMenu = () => {
    document.body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  if (burgerBtn) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = document.body.classList.contains('menu-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close on link click
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMobileMenu();
    }
  });

  // Auto-close on resize > 720px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && document.body.classList.contains('menu-open')) {
      closeMobileMenu();
    }
  });

  /* ============================================================
     2) Nav Links Active State Toggling
     ============================================================ */
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ============================================================
     3) Stat Counting Animation (easeOutCubic)
     ============================================================ */
  const statValues = document.querySelectorAll('.stat-value');

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCount = (el, target, suffix, duration, delay) => {
    setTimeout(() => {
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentVal = Math.round(easedProgress * target);

        el.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(update);
    }, delay);
  };

  // IntersectionObserver to trigger counting once
  let hasAnimatedStats = false;
  const statsFooter = document.querySelector('.stats-footer');

  if (statsFooter && statValues.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedStats) {
            hasAnimatedStats = true;

            statValues.forEach((el, index) => {
              const target = parseInt(el.getAttribute('data-target') || '0', 10);
              const suffix = el.getAttribute('data-suffix') || '';
              const duration = 1500 + index * 80;
              const delay = 480 + index * 90;

              animateCount(el, target, suffix, duration, delay);
            });

            observer.unobserve(statsFooter);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(statsFooter);
  }

  /* ============================================================
     4) Video Fallback & Autoplay Watcher
     ============================================================ */
  const bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    bgVideo.play().catch((err) => {
      // If browser prevents unmuted/muted autoplay, ensure muted & try again
      bgVideo.muted = true;
      bgVideo.play().catch((e) => {
        console.info('Video autoplay was suspended by browser policies:', e);
      });
    });
  }
});
