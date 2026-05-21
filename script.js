/**
 * Альянс — Ликёро-водочный завод
 * Основной файл скриптов
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== AGE GATE =====
    const ageGate = document.getElementById('ageGate');
    const ageYes = document.getElementById('ageYes');
    const ageNo = document.getElementById('ageNo');

    // Проверка подтверждения возраста
    if (sessionStorage.getItem('ageConfirmed') === 'true') {
        ageGate?.classList.add('hidden');
    }

    ageYes?.addEventListener('click', () => {
        ageGate.classList.add('hidden');
        sessionStorage.setItem('ageConfirmed', 'true');
    });

    ageNo?.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader?.classList.add('hidden');
        }, 1500);
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ===== MOBILE NAV =====
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileNav = () => {
        mobileNav?.classList.toggle('open');
        mobileOverlay?.classList.toggle('open');
        burger?.classList.toggle('active');
    };

    const closeMobileNav = () => {
        mobileNav?.classList.remove('open');
        mobileOverlay?.classList.remove('open');
        burger?.classList.remove('active');
    };

    burger?.addEventListener('click', toggleMobileNav);
    mobileOverlay?.addEventListener('click', closeMobileNav);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== FORM SUBMIT =====
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit');
        const originalText = btn.textContent;
        
        btn.textContent = '✓ Заявка отправлена!';
        btn.style.background = '#2D5A3D';
        btn.style.color = '#fff';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== COUNTER ANIMATION (опционально) =====
    const animateCounters = () => {
        const counters = document.querySelectorAll('.hero-stat-number');
        counters.forEach(counter => {
            const text = counter.textContent;
            // Пропускаем значения с + и M (уже анимированные в CSS)
            if (text.includes('+') || text.includes('M')) return;
        });
    };
    // Запуск при первом появлении секции
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }
});