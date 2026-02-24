/* ============================================================
   SecureDNS — JavaScript
   Handles: Navigation, mobile menu, scroll animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scrolled Navigation ---
    const nav = document.getElementById('nav');
    const handleScroll = () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        // Animate hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--open');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // --- Scroll Reveal Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section__header, .protocol-card, .feature-card, .platform-item, .arch-layer, .package-card, .cta'
    );

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Particle-like floating dots on hero ---
    const heroVisual = document.querySelector('.hero__shield');
    if (heroVisual) {
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.4 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            heroVisual.appendChild(dot);
        }

        // Inject particle keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2); opacity: 0.7; }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(0.8); opacity: 0.5; }
                75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.1); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }
});
