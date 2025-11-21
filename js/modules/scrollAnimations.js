/* ===================================
   SCROLL ANIMATIONS with Intersection Observer
   =================================== */

/**
 * Initialize scroll-triggered animations
 * Elements animate in when they enter the viewport
 */
export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger number count-up if element has count-up data
                if (entry.target.hasAttribute('data-count')) {
                    // Will be handled by countUp module
                    const event = new CustomEvent('countup-trigger', { detail: { element: entry.target } });
                    document.dispatchEvent(event);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .value-card, section, .result-item'
    );

    animatedElements.forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
        observer.observe(el);
    });
}
