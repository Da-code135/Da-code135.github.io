/* ===================================
   3D CUBE CARD INTERACTIONS
   Handles rotation and navigation
   =================================== */

/**
 * Initialize 3D cube cards in samples section
 */
export function init3DCubeCards() {
    const cubeCards = document.querySelectorAll('.cube-card');

    cubeCards.forEach((card, cardIndex) => {
        const cubeScene = card.querySelector('.cube-scene');
        if (!cubeScene) return;

        let currentFace = 0;
        const faces = ['front', 'right', 'back', 'left', 'top', 'bottom'];

        // Create navigation dots
        const navContainer = document.createElement('div');
        navContainer.className = 'cube-navigation';

        faces.forEach((face, index) => {
            const dot = document.createElement('div');
            dot.className = `cube-nav-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-face', index);
            dot.setAttribute('title', getFaceTitle(face));

            dot.addEventListener('click', () => {
                rotateTo(index);
            });

            navContainer.appendChild(dot);
        });

        card.appendChild(navContainer);

        // Auto-rotate on click (cycle through faces)
        cubeScene.addEventListener('click', (e) => {
            // Don't rotate if clicking on interactive elements
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }

            currentFace = (currentFace + 1) % faces.length;
            rotateTo(currentFace);
        });

        // Rotate to specific face
        function rotateTo(faceIndex) {
            currentFace = faceIndex;
            const face = faces[faceIndex];

            // Update cube rotation
            cubeScene.className = 'cube-scene';
            cubeScene.classList.add(`show-${face}`);

            // Update navigation dots
            const dots = navContainer.querySelectorAll('.cube-nav-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === faceIndex);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!isElementInViewport(card)) return;

            switch (e.key) {
                case 'ArrowRight':
                    currentFace = (currentFace + 1) % faces.length;
                    rotateTo(currentFace);
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    currentFace = (currentFace - 1 + faces.length) % faces.length;
                    rotateTo(currentFace);
                    e.preventDefault();
                    break;
            }
        });

        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        cubeScene.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        cubeScene.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next face
                    currentFace = (currentFace + 1) % faces.length;
                } else {
                    // Swipe right - previous face
                    currentFace = (currentFace - 1 + faces.length) % faces.length;
                }
                rotateTo(currentFace);
            }
        }
    });

    console.log('✓ 3D Cube cards initialized');
}

/**
 * Get user-friendly title for each face
 */
function getFaceTitle(face) {
    const titles = {
        'front': 'Overview',
        'right': 'Tech Stack',
        'back': 'Details',
        'left': 'Results',
        'top': 'Challenge',
        'bottom': 'Solution'
    };
    return titles[face] || face;
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
