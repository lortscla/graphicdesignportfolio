/* =========================================================
   CLAIRE LORTS — PORTFOLIO SCRIPT
   - Shrinks the header once the page has been scrolled
     (and restores full size when scrolled back to the very top).
   - Toggles the mobile dropdown and animates the hamburger
     into an "X".
   - Closes the menu when a link is tapped, the viewport is
     resized to desktop, or the user presses Escape.
   ========================================================= */

(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  /* ---------- Sticky header shrink on scroll ---------- */
  // Threshold of 1px ensures the header is "large" only when the
  // user is at the very top of the page, per spec.
  const SCROLL_THRESHOLD = 1;

  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > SCROLL_THRESHOLD) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  }

  // Throttle with rAF for smoothness
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeader(); // initial state on load

  /* ---------- Mobile menu toggle ---------- */
  function setMenuOpen(open) {
    if (!hamburger || !navMobile) return;
    if (open) {
      hamburger.classList.add('is-open');
      navMobile.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      hamburger.classList.remove('is-open');
      navMobile.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.contains('is-open');
      setMenuOpen(!isOpen);
    });
  }

  // Close menu when a mobile link is tapped
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  });

  // Close menu if user resizes up to desktop
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    }, 100);
  });
})();
