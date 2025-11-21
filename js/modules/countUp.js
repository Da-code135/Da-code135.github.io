/* ===================================
   NUMBER COUNT-UP ANIMATIONS
   =================================== */

import { easing } from '../utils/helpers.js';

/**
 * Animate number counting up to target value
 * @param {HTMLElement} element - Element containing the number
 */
function countUpNumber(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    // Store original content if it's the first time
    if (!element.hasAttribute('data-original')) {
        element.setAttribute('data-original', element.textContent);
    }

    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing.easeOutQuart(progress);
        const currentCount = easedProgress * target;

        // Format number based on type
        let displayValue;
        if (suffix === '%') {
            displayValue = currentCount.toFixed(1);
        } else if (target >= 1000) {
            displayValue = Math.floor(currentCount).toLocaleString();
        } else {
            displayValue = Math.floor(currentCount);
        }

        element.textContent = displayValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }

    requestAnimationFrame(updateCount);
}

/**
 * Initialize count-up animations
 * Sets up event listeners for count-up triggers
 */
export function initCountUp() {
    // Add data-count attributes to result numbers
    const resultNumbers = document.querySelectorAll('.result-number');
    resultNumbers.forEach(element => {
        const text = element.textContent.trim();
        if (text.includes('%')) {
            element.setAttribute('data-count', parseFloat(text));
            element.setAttribute('data-suffix', '%');
        } else if (text.includes('K')) {
            element.setAttribute('data-count', parseFloat(text) * 1000);
            element.setAttribute('data-suffix', '');
        } else {
            element.setAttribute('data-count', parseFloat(text) || 0);
            element.setAttribute('data-suffix', text.includes('%') ? '%' : '');
        }
    });

    // Listen for count-up triggers from scroll animations
    document.addEventListener('countup-trigger', (e) => {
        countUpNumber(e.detail.element);
    });
}
