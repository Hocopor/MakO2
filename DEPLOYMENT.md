# Инструкции по сборке и деплою сайта психолога

## 1. Структура проекта

Проект представляет собой статический сайт с HTML, CSS и JavaScript. Все файлы организованы в следующей структуре:

```
project/
├── index.html                    # Основной HTML файл
├── css/                          # Стили
│   ├── variables.css            # CSS-переменные (цвета, шрифты, отступы)
│   ├── reset.css                # Сброс стилей браузера
│   ├── base.css                 # Базовые стили (body, типографика, ссылки)
│   ├── components.css           # Компоненты (кнопки, карточки, формы)
│   ├── layout.css               # Сетка и расположение
│   ├── sections.css             # Стили секций (hero, about, services и т.д.)
│   ├── responsive.css           # Медиа-запросы для адаптивности
│   └── utilities.css            # Вспомогательные классы
├── js/                           # JavaScript
│   ├── main.js                  # Основная логика (меню, инициализация)
│   ├── validation.js            # Валидация формы
│   ├── animations.js            # Анимации при скролле
│   └── form-submit.js           # Отправка формы
├── images/                       # Изображения
│   ├── hero-image.jpg           # Герой-изображение (1920×1080)
│   ├── psychologist-photo.jpg   # Фото психолога (600×800)
│   ├── service-1.svg            # Иконка услуги 1 (SVG)
│   ├── service-2.svg            # Иконка услуги 2 (SVG)
│   ├── service-3.svg            # Иконка услуги 3 (SVG)
│   └── og-image.jpg             # Open Graph изображение (1200×630)
├── assets/                       # Дополнительные ресурсы
│   ├── fonts/                   # Локальные шрифты (если нужны)
│   ├── icons/                   # SVG иконки
│   └── favicon.ico              # Фавикон (32×32)
├── sitemap.xml                  # Карта сайта для SEO
├── robots.txt                   # Инструкции для поисковых роботов
├── .htaccess                    # Конфигурация Apache (опционально)
└── README.md                    # Документация проекта
```

## 2. Необходимые изображения

Для корректного отображения сайта требуются следующие изображения:

| Изображение | Размер | Формат | Назначение |
|-------------|--------|--------|------------|
| `hero-image.jpg` | 1920×1080 пикселей | JPEG/WebP | Фон герой-секции |
| `psychologist-photo.jpg` | 600×800 пикселей | JPEG/WebP | Фото психолога в секции "Обо мне" |
| `og-image.jpg` | 1200×630 пикселей | JPEG/PNG | Изображение для соцсетей (Open Graph) |
| `service-1.svg`, `service-2.svg`, `service-3.svg` | 64×64 пикселей | SVG | Иконки услуг |
| `favicon.ico` | 32×32, 16×16 | ICO | Иконка сайта во вкладке браузера |

**Где разместить:**
- Все изображения поместите в папку `images/`
- Фавикон в `assets/favicon.ico`
- Дополнительные иконки в `assets/icons/`

**Рекомендации:**
- Используйте сжатые изображения для ускорения загрузки
- Для фотографий используйте качество 80-85%
- SVG иконки должны быть оптимизированы (удалены лишние метаданные)

## 3. Настройка контента

### Основные тексты (редактируются в `index.html`):
1. **Заголовок сайта** – `<title>` в `<head>`
2. **Имя психолога** – поиск по тексту "Анна Петрова"
3. **Специализация** – в hero-секции
4. **Контакты** – телефон, email в футере и секции контактов
5. **Услуги и цены** – в секции "Услуги"
6. **Расписание** – в секции "Расписание"
7. **Отзывы** – в секции "Отзывы"

### Контакты для замены:
- Телефон: `+7 (999) 123-45-67`
- Email: `anna@psychologist.ru`
- Адрес: `г. Москва, ул. Примерная, д. 10`
- Соцсети: ссылки в футере

### Как изменить:
1. Откройте `index.html` в текстовом редакторе
2. Найдите нужный текст с помощью поиска (Ctrl+F)
3. Замените на свои данные
4. Сохраните файл

## 4. Локальная разработка

### Способ 1: Простой HTTP-сервер (Python)
```bash
# Перейдите в папку проекта
cd /путь/к/проекту

# Запустите сервер на порту 8080
python -m http.server 8080
```
Откройте в браузере: `http://localhost:8080`

### Способ 2: Live Server (VS Code)
1. Установите расширение "Live Server"
2. Правой кнопкой по `index.html` → "Open with Live Server"
3. Сайт откроется на `http://localhost:5500`

### Способ 3: Node.js с http-server
```bash
# Установите http-server глобально
npm install -g http-server

# Запустите сервер
http-server -p 3000
```

## 5. Деплой на сервер через SSH

### Подготовка файлов
1. Убедитесь, что все файлы готовы к загрузке
2. Проверьте, что все пути к изображениям корректны
3. Удалите временные файлы (если есть)

### Настройка SSH-подключения
1. **Генерация SSH-ключа** (если нет):
   ```bash
   ssh-keygen -t rsa -b 4096 -C "ваш_email@example.com"
   ```

2. **Добавление ключа на сервер**:
   ```bash
   ssh-copy-id пользователь@ip_адрес_сервера
   ```

3. **Проверка подключения**:
   ```bash
   ssh пользователь@ip_адрес_сервера
   ```

### Загрузка файлов на сервер
#### Способ A: SCP (простая загрузка)
```bash
# Загрузить всю папку проекта
scp -r /локальный/путь/к/проекту пользователь@ip_адрес_сервера:/путь/на/сервере

# Пример:
scp -r ./ пользователь@192.168.1.100:/var/www/psychologist-site
```

#### Способ B: RSYNC (синхронизация)
```bash
rsync -avz --progress /локальный/путь/к/проекту/ пользователь@ip_адрес_сервера:/путь/на/сервере/
```

#### Способ C: SFTP (графический клиент)
Используйте FileZilla, WinSCP или Cyberduck:
- Хост: IP адрес сервера
- Порт: 22
- Протокол: SFTP
- Логин и пароль от SSH

### Настройка веб-сервера (Nginx)

#### Установка Nginx на Ubuntu/Debian:
```bash
sudo apt update
sudo apt install nginx
```

#### Конфигурация сайта:
1. Создайте конфигурационный файл:
   ```bash
   sudo nano /etc/nginx/sites-available/psychologist-site
   ```

2. Добавьте конфигурацию:
   ```nginx
   server {
       listen 80;
       server_name ваш-домен.ru www.ваш-домен.ru;
       
       root /var/www/psychologist-site;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # Кэширование статических файлов
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. Активируйте сайт:
   ```bash
   sudo ln -s /etc/nginx/sites-available/psychologist-site /etc/nginx/sites-enabled/
   sudo nginx -t  # Проверка конфигурации
   sudo systemctl restart nginx
   ```

### Настройка домена и SSL

#### Настройка DNS:
1. В панели управления доменом добавьте A-запись:
   - `@` → IP адрес сервера
   - `www` → IP адрес сервера

#### Получение SSL-сертификата (Let's Encrypt):
```bash
# Установите Certbot
sudo apt install certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Автоматическое обновление
sudo certbot renew --dry-run
```

## 6. Деплой через GitHub

### GitHub Pages
1. Создайте репозиторий на GitHub
2. Загрузите файлы проекта:
   ```bash
   git init
   git add .
   git commit -m "Первоначальный коммит"
   git branch -M main
   git remote add origin https://github.com/ваш-username/репозиторий.git
   git push -u origin main
   ```

3. В настройках репозитория:
   - Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`
   - Сохраните

4. Сайт будет доступен по адресу: `https://ваш-username.github.io/репозиторий/`

### GitHub Actions (автоматический деплой)
Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/psychologist-site
            git pull origin main
```

## 7. SEO настройки

### Мета-теги (редактировать в `index.html`):
```html
<!-- Заголовок и описание -->
<title>Психолог Анна Петрова | Консультации в Москве</title>
<meta name="description" content="Профессиональный психолог с 10-летним опытом. Индивидуальные консультации, терапия пар, помощь при тревоге и депрессии.">

<!-- Open Graph для соцсетей -->
<meta property="og:title" content="Психолог Анна Петрова">
<meta property="og:description" content="Профессиональный психолог с 10-летним опытом">
<meta property="og:image" content="https://ваш-домен.ru/images/og-image.jpg">
<meta property="og:url" content="https://ваш-домен.ru">

<!-- Структурированные данные (Schema.org) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Психолог Анна Петрова",
  "description": "Профессиональный психолог, индивидуальные консультации",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Москва",
    "streetAddress": "ул. Примерная, д. 10"
  },
  "telephone": "+7 (999) 123-45-67",
  "openingHours": "Mo-Fr 09:00-20:00",
  "priceRange": "₽₽"
}
</script>
```

### Карта сайта и robots.txt
- `sitemap.xml` уже настроен
- `robots.txt` разрешает индексацию всех страниц

## 8. Мониторинг и аналитика

### Google Analytics
1. Создайте аккаунт на [analytics.google.com](https://analytics.google.com)
2. Получите идентификатор отслеживания (например, `G-XXXXXXXXXX`)
3. Добавьте в `index.html` перед закрывающим `</head>`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Яндекс.Метрика
1. Создайте счётчик на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Получите код отслеживания
3. Добавьте в `index.html` перед закрывающим `</body>`:
   ```html
   <!-- Yandex.Metrika counter -->
   <script type="text/javascript">
     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
     m[i].l=1*new Date();
     for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
     k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   
     ym(XXXXXX, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
     });
   </script>
   <noscript><div><img src="https://mc.yandex.ru/watch/XXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
   <!-- /Yandex.Metrika counter -->
   ```

## Полезные команды для обслуживания

### Проверка сайта
```bash
# Проверить доступность сайта
curl -I https://ваш-домен.ru

# Проверить SSL-сертификат
openssl s_client -connect ваш-домен.ru:443
```

### Мониторинг логов Nginx
```bash
# Последние ошибки
sudo tail -f /var/log/nginx/error.log

# Доступ к сайту
sudo tail -f /var/log/nginx/access.log
```

### Резервное копирование
```bash
# Создать архив сайта
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/psychologist-site

# Копировать на удалённый сервер
scp backup-*.tar.gz пользователь@резервный-сервер:/backups/
```

## Устранение неполадок

### Проблема: Сайт не загружается
1. Проверьте, запущен ли Nginx: `sudo systemctl status nginx`
2. Проверьте конфигурацию: `sudo nginx -t`
3. Проверьте права доступа к файлам: `sudo chown -R www-data:www-data /var/www/psychologist-site`

### Проблема: Изображения не отображаются
1. Проверьте пути в HTML
2. Убедитесь, что файлы загружены на сервер
3. Проверьте права доступа: `chmod 644 images/*.jpg`

### Проблема: Форма не отправляется
1. Проверьте консоль браузера на ошибки JavaScript
2. Убедитесь, что файл `form-submit.js` загружен
3. Проверьте настройки сервера (должен поддерживать PHP/обработку форм)

---

**Примечание:** Для дополнительной помощи обратитесь к файлу `CONTENT_GUIDE.md` для инструкций по замене контента.