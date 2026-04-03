// ====================================
// ANIMATIONS JAVASCRIPT
// ====================================

// Parallax Effect
window.addEventListener('scroll', () => {
    const heroAnimation = document.querySelector('.hero-animation');
    if (heroAnimation) {
        const scrollPosition = window.scrollY;
        heroAnimation.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Typing Effect for Hero Title
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Fade-in on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('[data-fade]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);

// Service Cards Hover Animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio Cards Image Zoom
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    const image = card.querySelector('.portfolio-image img');
    
    card.addEventListener('mouseenter', () => {
        if (image) {
            image.style.transform = 'scale(1.15) rotate(2deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (image) {
            image.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    if (!document.getElementById('rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Lazy Load Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Stagger Animation for Grid Items
function staggerAnimation(selector, delay = 100) {
    const items = document.querySelectorAll(selector);
    
    items.forEach((item, index) => {
        item.style.animation = `slideInUp 0.6s ease-out ${index * delay}ms forwards`;
        item.style.opacity = '0';
    });
}

// Call stagger animation on page load
window.addEventListener('load', () => {
    staggerAnimation('.service-card', 100);
    staggerAnimation('.benefit-card', 100);
});

console.log('Animations loaded successfully!');
