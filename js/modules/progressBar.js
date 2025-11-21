/* ===================================
   SCROLL PROGRESS INDICATOR
   =================================== */

import { throttle } from '../utils/helpers.js';

/**
 * Initialize scroll progress indicator
 * Creates a bar at the top that fills as user scrolls
 */
export function initScrollProgress() {
    // Create progress indicator element if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');

    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);
    }

    // Update progress on scroll
    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const trackLength = documentHeight - windowHeight;
        const percentScrolled = (scrollTop / trackLength) * 100;

        const progressBarInner = document.querySelector('.scroll-progress-bar');
        if (progressBarInner) {
            progressBarInner.style.width = `${Math.min(percentScrolled, 100)}%`;
        }
    };

    // Throttle updates for performance
    window.addEventListener('scroll', throttle(updateProgress, 10));
    updateProgress(); // Initial call
}
