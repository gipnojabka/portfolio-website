/**
 * Scroll-triggered reveal animations (tsh.io-style)
 * Uses Intersection Observer - no heavy libs, smooth and performant.
 */

(function () {
  const revealSelectors = '[data-reveal]';

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // trigger when element is 80px from bottom of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(revealSelectors);
  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
