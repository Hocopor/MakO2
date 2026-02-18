// animations.js - Анимации при скролле

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация параллакс эффектов
    initParallaxEffects();
    
    // Инициализация анимаций для интерактивных элементов
    initInteractiveAnimations();
});

/**
 * Основные анимации при скролле
 */
function initScrollAnimations() {
    // Элементы для анимации
    const animatedElements = [
        { selector: '.hero-title', animation: 'fadeInUp' },
        { selector: '.hero-subtitle', animation: 'fadeInUp', delay: 200 },
        { selector: '.hero-actions', animation: 'fadeInUp', delay: 400 },
        { selector: '.hero-note', animation: 'fadeIn', delay: 600 },
        { selector: '.service-card', animation: 'fadeInUp', stagger: 150 },
        { selector: '.benefit-card', animation: 'fadeInUp', stagger: 100 },
        { selector: '.review-card', animation: 'fadeInUp', stagger: 150 },
        { selector: '.faq-item', animation: 'fadeIn', stagger: 100 },
        { selector: '.about-image img', animation: 'scaleIn' },
        { selector: '.about-content', animation: 'fadeInRight' }
    ];
    
    // Добавляем стили для анимаций
    addAnimationStyles();
    
    // Создаем Intersection Observer для отслеживания появления элементов
    if (!('IntersectionObserver' in window)) {
        // Fallback для старых браузеров
        animatedElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(el => {
                el.classList.add('animated', item.animation);
            });
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Находим конфигурацию анимации для этого элемента
                const config = animatedElements.find(config => 
                    element.matches(config.selector)
                );
                
                if (config) {
                    // Применяем анимацию с задержкой
                    setTimeout(() => {
                        element.classList.add('animated', config.animation);
                    }, config.delay || 0);
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за всеми элементами
    animatedElements.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        
        if (config.stagger) {
            // Для элементов с stagger эффектом
            elements.forEach((el, index) => {
                el.style.setProperty('--animation-delay', `${index * config.stagger}ms`);
                observer.observe(el);
            });
        } else {
            elements.forEach(el => observer.observe(el));
        }
    });
}

/**
 * Параллакс эффекты для герой-секции
 */
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image img');
    if (!heroImage) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

/**
 * Анимации для интерактивных элементов
 */
function initInteractiveAnimations() {
    // Анимация при наведении на кнопки
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Анимация при наведении на карточки
    const cards = document.querySelectorAll('.service-card, .benefit-card, .review-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Анимация для FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        const content = item.querySelector('p');
        
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Анимация открытия
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                // Анимация закрытия
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        });
        
        // Инициализация начального состояния
        if (content) {
            if (item.open) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
            
            content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            content.style.overflow = 'hidden';
        }
    });
}

/**
 * Добавление CSS стилей для анимаций
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Базовые стили анимаций */
        .animated {
            animation-fill-mode: both;
        }
        
        /* Задержки анимаций */
        [style*="--animation-delay"] {
            animation-delay: var(--animation-delay);
        }
        
        /* Fade In Up */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fadeInUp {
            animation-name: fadeInUp;
            animation-duration: 0.8s;
            animation-timing-function: var(--easing-out);
        }
        
        /* Fade In */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .fadeIn {
            animation-name: fadeIn;
            animation-duration: 0.6s;
            animation-timing-function: var(--easing-out);
        }
        
        /* Scale In */
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .scaleIn {
            animation-name: scaleIn;
            animation-duration: 0.7s;
            animation-timing-function: var(--easing-out);
        }
        
        /* Fade In Right */
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .fadeInRight {
            animation-name: fadeInRight;
            animation-duration: 0.8s;
            animation-timing-function: var(--easing-out);
        }
        
        /* Плавные переходы для интерактивных элементов */
        .btn {
            transition: transform 0.3s var(--easing-spring),
                        background-color 0.3s var(--easing),
                        box-shadow 0.3s var(--easing);
        }
        
        .service-card,
        .benefit-card,
        .review-card {
            transition: transform 0.4s var(--easing-out),
                        box-shadow 0.4s var(--easing-out),
                        opacity 0.4s var(--easing-out);
        }
        
        /* Параллакс эффект */
        .hero-image img {
            transition: transform 0.1s ease-out;
            will-change: transform;
        }
        
        /* Анимация для прогресс-бара скролла (опционально) */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--color-accent);
            z-index: 1001;
            transition: width 0.1s ease;
        }
    `;
    
    // Добавляем прогресс-бар скролла
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Обновление прогресс-бара
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    document.head.appendChild(style);
}

/**
 * Дополнительные утилиты для анимаций
 */
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

/**
 * Инициализация счетчиков (если будут добавлены)
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(counter, 0, target, duration);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}