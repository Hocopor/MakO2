// main.js - Основная логика (меню, инициализация)

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бургер-меню
    initBurgerMenu();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация обработчиков кнопок "Записаться"
    initAppointmentButtons();
    
    // Инициализация фиксированного хедера
    initFixedHeader();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

/**
 * Бургер-меню для мобильных устройств
 */
function initBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (!burger || !navList) return;
    
    burger.addEventListener('click', function() {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        
        // Переключение состояния меню
        burger.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('show');
        body.classList.toggle('menu-open');
        
        // Анимация бургер-иконки
        const spans = burger.querySelectorAll('span');
        if (!isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.setAttribute('aria-expanded', 'false');
            navList.classList.remove('show');
            body.classList.remove('menu-open');
            
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!burger.contains(event.target) && !navList.contains(event.target)) {
            burger.setAttribute('aria-expanded', 'false');
            navList.classList.remove('show');
            body.classList.remove('menu-open');
            
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/**
 * Плавная прокрутка к якорям
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорь "#" (пустой)
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Получаем высоту фиксированного хедера
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Вычисляем позицию с учетом хедера
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Обработчики для кнопок "Записаться"
 */
function initAppointmentButtons() {
    const appointmentButtons = document.querySelectorAll('.btn-primary:not(.nav-cta)');
    const contactSection = document.getElementById('contact');
    
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (contactSection) {
                // Плавная прокрутка к форме
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: contactPosition,
                    behavior: 'smooth'
                });
                
                // Фокус на первое поле формы
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input, textarea, select');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 500);
            }
        });
    });
}

/**
 * Фиксированный хедер с изменением стиля при скролле
 */
function initFixedHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Добавление тени при скролле
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Скрытие/показ хедера при скролле вниз/вверх
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Скролл вниз - скрываем хедер
            header.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх - показываем хедер
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Анимации появления элементов при скролле
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .review-card, .faq-item');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback для старых браузеров
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Вспомогательная функция для добавления CSS классов для анимаций
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .benefit-card,
        .review-card,
        .faq-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s var(--easing-out), transform 0.6s var(--easing-out);
        }
        
        .service-card.animated,
        .benefit-card.animated,
        .review-card.animated,
        .faq-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-list {
            transition: transform 0.3s var(--easing);
        }
        
        @media (max-width: 767px) {
            .nav-list {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background-color: var(--color-light);
                padding: var(--spacing-xl);
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                z-index: 999;
            }
            
            .nav-list.show {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-list ul {
                flex-direction: column;
                gap: var(--spacing-lg);
            }
        }
        
        .header {
            transition: transform 0.3s var(--easing), box-shadow 0.3s var(--easing);
        }
    `;
    document.head.appendChild(style);
}

// Добавляем стили для анимаций
addAnimationStyles();