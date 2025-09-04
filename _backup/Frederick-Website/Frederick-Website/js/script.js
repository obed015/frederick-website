// Hero parallax scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  const heroBackground = document.querySelector('.hero__bg');
  
  if (!hero || !heroBackground) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      
      // ONLY apply parallax effect when hero section is visible
      if (scrolled < heroHeight) {
        // Parallax effect: background moves slower than scroll (50% speed)
        const parallaxOffset = scrolled * 0.5;
        heroBackground.style.setProperty('--scroll-offset', `${parallaxOffset}px`);
        hero.classList.add('hero--scrolling');
      } else {
        // Stop parallax effect once hero is scrolled past
        hero.classList.remove('hero--scrolling');
        heroBackground.style.setProperty('--scroll-offset', '0px');
      }
      
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    // Throttled scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call
    updateParallax();
  }
});