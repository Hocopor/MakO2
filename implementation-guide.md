# Руководство по реализации лендинга психолога

## Пошаговая инструкция

### 1. Подготовка среды разработки
1. Создать проектную структуру согласно `project-structure.md`
2. Установить текстовый редактор/IDE (VS Code рекомендовано)
3. Установить расширения для работы с HTML/CSS/JS
4. Настроить локальный сервер для разработки (например, Live Server)

### 2. Создание базовых файлов
1. **index.html** – создать файл с базовой структурой из `technical-design.md`
2. **CSS файлы** – создать все CSS файлы в папке `css/`
3. **JavaScript файлы** – создать все JS файлы в папке `js/`
4. **Изображения** – добавить placeholder изображения в папку `images/`

### 3. Реализация HTML структуры
1. Скопировать HTML код из `technical-design.md` в `index.html`
2. Заменить placeholder тексты на реальные (из `content-strategy.md`)
3. Проверить семантическую разметку
4. Добавить все необходимые мета-теги
5. Включить структурированные данные (Schema.org)

### 4. Реализация CSS стилей
1. **variables.css** – определить CSS переменные из `design-system.md`
2. **reset.css** – сбросить стандартные стили браузера
3. **base.css** – задать базовые стили для body, типографики, ссылок
4. **components.css** – стилизовать компоненты (кнопки, карточки, формы)
5. **layout.css** – создать сетку и контейнеры
6. **sections.css** – стилизовать каждую секцию отдельно
7. **responsive.css** – добавить медиа-запросы для адаптивности
8. **utilities.css** – добавить вспомогательные классы

### 5. Реализация JavaScript функциональности
1. **main.js** – реализовать:
   - Бургер-меню для мобильных устройств
   - Плавную прокрутку к якорям
   - Инициализацию всех модулей
2. **validation.js** – реализовать:
   - Валидацию формы консультации
   - Показ ошибок в реальном времени
   - Валидацию email и телефона
3. **animations.js** – реализовать:
   - Анимации появления элементов при скролле
   - Плавные переходы
   - Эффекты наведения
4. **form-submit.js** – реализовать:
   - Отправку данных формы (можно использовать Formspree, Netlify Forms или собственный бэкенд)
   - Показ сообщений об успехе/ошибке
   - Сброс формы после успешной отправки

### 6. SEO оптимизация
1. Создать `sitemap.xml` с URL страницы
2. Создать `robots.txt` с разрешением индексации
3. Проверить мета-теги (title, description, keywords)
4. Добавить Open Graph теги для социальных сетей
5. Добавить Twitter Card теги
6. Проверить структурированные данные с помощью Google Rich Results Test

### 7. Оптимизация производительности
1. Оптимизировать изображения (сжатие, формат WebP)
2. Минифицировать CSS и JavaScript файлы
3. Включить lazy loading для изображений
4. Настроить кэширование через `.htaccess` или заголовки сервера
5. Использовать предзагрузку критических ресурсов

### 8. Тестирование
1. **Кроссбраузерное тестирование**:
   - Chrome (последние 2 версии)
   - Firefox (последние 2 версии)
   - Safari (последние 2 версии)
   - Edge (последние 2 версии)
2. **Мобильное тестирование**:
   - iPhone Safari
   - Android Chrome
   - Планшеты
3. **Доступность**:
   - Проверить с screen reader (NVDA, VoiceOver)
   - Проверить контраст цветов
   - Проверить клавиатурную навигацию
4. **Производительность**:
   - Lighthouse audit (цель: 90+ по всем метрикам)
   - PageSpeed Insights
   - WebPageTest

### 9. Деплой
1. Выбрать хостинг (Netlify, Vercel, GitHub Pages, обычный хостинг)
2. Настроить доменное имя (при необходимости)
3. Загрузить файлы на сервер
4. Настроить SSL сертификат
5. Подключить аналитику (Google Analytics, Яндекс.Метрика)

### 10. Мониторинг и поддержка
1. Настроить мониторинг ошибок (Sentry, Google Search Console)
2. Регулярно обновлять контент (новые отзывы, статьи в блоге)
3. Мониторить позиции в поисковых системах
4. Собирать обратную связь от пользователей

## Критические моменты

### Mobile-first подход
Все стили должны быть сначала написаны для мобильных устройств, затем расширены для планшетов и десктопов через медиа-запросы `min-width`.

### Доступность
- Все интерактивные элементы должны быть доступны с клавиатуры
- Использовать семантические теги (header, main, section, article, nav)
- Добавить ARIA-атрибуты где необходимо
- Обеспечить достаточный контраст цветов

### SEO
- Title должен содержать основные ключевые слова (до 60 символов)
- Description должен быть привлекательным и содержать CTA (до 160 символов)
- Использовать заголовки h1-h6 иерархически
- Добавить alt тексты для всех изображений
- Использовать структурированные данные Schema.org

### Производительность
- Изображения должны быть оптимизированы (WebP с fallback на JPEG/PNG)
- CSS и JavaScript должны быть минифицированы
- Использовать lazy loading для изображений ниже сгиба
- Минимизировать количество HTTP запросов

## Шаблоны кода

### Базовый HTML шаблон
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Психолог [Имя Фамилия] | Помощь при тревожности</title>
    <meta name="description" content="...">
    <!-- Подключение CSS -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/style.css">
    <!-- Подключение шрифтов -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
</head>
<body>
    <!-- Контент -->
    <!-- Подключение JS -->
    <script src="js/main.js"></script>
</body>
</html>
```

### Базовый CSS шаблон
```css
/* Mobile-first стили */
.container {
    width: 100%;
    padding: 0 var(--spacing-md);
    margin: 0 auto;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: var(--container-md);
        padding: 0 var(--spacing-lg);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: var(--container-lg);
        padding: 0 var(--spacing-xl);
    }
}
```

### Базовый JavaScript шаблон
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех модулей
    const mobileMenu = new MobileMenu();
    const formValidator = new FormValidator('consultation-form');
    const scrollAnimations = new ScrollAnimations();
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
```

## Ресурсы для разработчика

### Онлайн инструменты
- [Google Fonts](https://fonts.google.com/) – шрифты Playfair Display и Open Sans
- [Font Awesome](https://fontawesome.com/) – иконки (опционально)
- [SVGOMG](https://jakearchibald.github.io/svgomg/) – оптимизация SVG
- [TinyPNG](https://tinypng.com/) – сжатие изображений
- [WebP Converter](https://convertio.co/ru/webp-converter/) – конвертация в WebP

### Тестирование
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [BrowserStack](https://www.browserstack.com/) – кроссбраузерное тестирование
- [WAVE](https://wave.webaim.org/) – тестирование доступности

### SEO инструменты
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) – аудит сайта

## Время реализации
Проект можно реализовать за 1-2 дня при наличии опыта в веб-разработке. Разбивка по времени:
- Подготовка и настройка: 1-2 часа
- Верстка HTML/CSS: 4-6 часов
- JavaScript функциональность: 2-3 часа
- Тестирование и оптимизация: 2-3 часа
- Деплой и настройка: 1-2 часа