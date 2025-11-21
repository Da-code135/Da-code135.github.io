/* ===================================
   MAIN JAVASCRIPT - Module Orchestrator
   Da-Coders-135 Portfolio Website
   =================================== */

import { initScrollProgress } from './modules/progressBar.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import { initCountUp } from './modules/countUp.js';

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Da-Coders-135 Portfolio...');

    try {
        // 1. Initialize scroll progress indicator
        initScrollProgress();
        console.log('✓ Scroll progress initialized');

        // 2. Initialize scroll animations
        initScrollAnimations();
        console.log('✓ Scroll animations initialized');

        // 3. Initialize count-up animations
        initCountUp();
        console.log('✓ Count-up animations initialized');

        // 4. Set progress bar widths dynamically (for backwards compatibility)
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) bar.style.setProperty('--progress-width', width);
        });
        console.log('✓ Progress bars configured');

        // 5. Enhanced smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        console.log('✓ Smooth scrolling initialized');

        // 6. Active navigation highlighting
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('.main-nav a');

        function setActiveLink() {
            let index = sections.length;
            while (--index && window.scrollY + 120 < sections[index].offsetTop) { }
            navLinks.forEach(link => link.classList.remove('active'));
            const id = sections[index].id;
            const active = document.querySelector(`.main-nav a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }

        setActiveLink();
        window.addEventListener('scroll', setActiveLink);
        console.log('✓ Navigation highlighting active');

        console.log('✨ All modules loaded successfully!');

    } catch (error) {
        console.error('❌ Error initializing modules:', error);
    }
});

// Performance monitoring (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '') {
    let fps = 0;
    let lastTime = performance.now();

    function measureFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;

        if (fps < 50) {
            console.warn(`⚠️ Low FPS detected: ${fps}`);
        }

        requestAnimationFrame(measureFPS);
    }

    requestAnimationFrame(measureFPS);
}
