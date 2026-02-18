// form-submit.js - Отправка данных формы

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultation-form');
    if (!form) return;
    
    // Инициализация отправки формы
    initFormSubmit(form);
});

/**
 * Инициализация отправки формы
 */
function initFormSubmit(form) {
    // Обработчик отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Проверяем валидность формы
        if (!isFormValid(form)) {
            showFormError(form, 'Пожалуйста, заполните все обязательные поля корректно');
            return;
        }
        
        // Получаем данные формы
        const formData = getFormData(form);
        
        // Показываем состояние загрузки
        const submitButton = form.querySelector('button[type="submit"]');
        showLoadingState(submitButton, true);
        
        try {
            // Отправляем данные (имитация)
            const response = await submitFormData(formData);
            
            if (response.success) {
                // Показываем успешное сообщение
                showSuccessMessage(form);
                
                // Сбрасываем форму
                resetForm(form);
                
                // Отправляем данные в Analytics (имитация)
                trackFormSubmission(formData);
            } else {
                throw new Error(response.message || 'Ошибка отправки формы');
            }
        } catch (error) {
            // Показываем ошибку
            showFormError(form, error.message);
        } finally {
            // Скрываем состояние загрузки
            showLoadingState(submitButton, false);
        }
    });
}

/**
 * Проверка валидности всей формы
 */
function isFormValid(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightInvalidField(field);
        }
        
        // Дополнительные проверки по типу поля
        if (field.value.trim()) {
            switch (field.type) {
                case 'email':
                    if (!isValidEmail(field.value)) {
                        isValid = false;
                        highlightInvalidField(field);
                    }
                    break;
                    
                case 'tel':
                    if (!isValidPhone(field.value)) {
                        isValid = false;
                        highlightInvalidField(field);
                    }
                    break;
            }
        }
    });
    
    return isValid;
}

/**
 * Получение данных формы в виде объекта
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Преобразуем FormData в объект
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Добавляем дополнительную информацию
    data.timestamp = new Date().toISOString();
    data.pageUrl = window.location.href;
    data.userAgent = navigator.userAgent;
    
    return data;
}

/**
 * Отправка данных формы (имитация)
 */
async function submitFormData(formData) {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы fetch запрос:
    // const response = await fetch('/api/consultation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    
    // Имитация успешного ответа
    return {
        success: true,
        message: 'Заявка успешно отправлена',
        data: {
            id: 'consultation_' + Date.now(),
            status: 'pending',
            estimatedResponseTime: '24 часа'
        }
    };
}

/**
 * Отслеживание отправки формы в Analytics
 */
function trackFormSubmission(formData) {
    // Имитация отправки в Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'consultation',
            'event_label': 'psychologist_landing',
            'value': 1
        });
    }
    
    // Имитация отправки в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym('reachGoal', 'consultation_form_submit');
    }
    
    // Логирование в консоль для отладки
    console.log('Form submitted:', {
        ...formData,
        phone: formData.phone ? '***' : 'не указан', // Маскируем чувствительные данные
        email: formData.email ? '***' : 'не указан'
    });
}

/**
 * Подсветка невалидного поля
 */
function highlightInvalidField(field) {
    field.classList.add('invalid');
    field.style.borderColor = 'var(--color-error)';
    field.style.boxShadow = '0 0 0 3px rgba(232, 180, 184, 0.2)';
    
    // Автоматически убираем подсветку через 3 секунды
    setTimeout(() => {
        field.classList.remove('invalid');
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }, 3000);
}

/**
 * Показать состояние загрузки
 */
function showLoadingState(button, isLoading) {
    if (isLoading) {
        const originalText = button.textContent;
        button.setAttribute('data-original-text', originalText);
        
        // Очищаем содержимое кнопки
        button.textContent = '';
        
        // Создаем спиннер
        const spinner = document.createElement('span');
        spinner.className = 'submit-spinner';
        
        // Создаем текстовый элемент
        const textSpan = document.createElement('span');
        textSpan.className = 'submit-text';
        textSpan.textContent = 'Отправка...';
        
        // Добавляем элементы в кнопку
        button.appendChild(spinner);
        button.appendChild(textSpan);
        
        button.disabled = true;
        
        // Добавляем стили для спиннера, если их еще нет
        addSubmitSpinnerStyles();
    } else {
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
        }
        button.disabled = false;
    }
}

/**
 * Показать успешное сообщение
 */
function showSuccessMessage(form) {
    // Создаем контейнер для сообщения
    const messageContainer = document.createElement('div');
    messageContainer.className = 'form-success-message';
    messageContainer.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Спасибо за вашу заявку!</h3>
            <p>Я свяжусь с вами в течение 24 часов по указанному способу связи.</p>
            <p class="success-note">На указанный email было отправлено письмо с подтверждением.</p>
            <button class="btn btn-secondary close-success">Закрыть</button>
        </div>
    `;
    
    // Добавляем стили для сообщения
    addSuccessMessageStyles();
    
    // Вставляем сообщение
    form.parentElement.appendChild(messageContainer);
    
    // Обработчик закрытия сообщения
    const closeButton = messageContainer.querySelector('.close-success');
    closeButton.addEventListener('click', () => {
        messageContainer.remove();
    });
    
    // Автоматическое закрытие через 10 секунд
    setTimeout(() => {
        if (document.body.contains(messageContainer)) {
            messageContainer.remove();
        }
    }, 10000);
}

/**
 * Показать ошибку формы
 */
function showFormError(form, message) {
    // Удаляем предыдущие сообщения об ошибках
    const existingError = form.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Создаем новое сообщение об ошибке
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error-message';
    errorContainer.innerHTML = `
        <div class="error-content">
            <div class="error-icon">!</div>
            <h3>Ошибка отправки</h3>
            <p>${message}</p>
            <button class="btn btn-secondary close-error">Понятно</button>
        </div>
    `;
    
    // Добавляем стили для ошибки
    addErrorMessageStyles();
    
    // Вставляем сообщение
    form.parentElement.insertBefore(errorContainer, form);
    
    // Обработчик закрытия ошибки
    const closeButton = errorContainer.querySelector('.close-error');
    closeButton.addEventListener('click', () => {
        errorContainer.remove();
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(errorContainer)) {
            errorContainer.remove();
        }
    }, 5000);
}

/**
 * Сброс формы
 */
function resetForm(form) {
    form.reset();
    
    // Сбрасываем все кастомные состояния
    form.querySelectorAll('.invalid, .success').forEach(field => {
        field.classList.remove('invalid', 'success');
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
}

/**
 * Вспомогательные функции валидации
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[7-8]?[\s\-\(]?\d{3}[\s\-\)]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Добавление CSS стилей
 */
function addSubmitSpinnerStyles() {
    if (document.querySelector('#submit-spinner-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'submit-spinner-styles';
    style.textContent = `
        .submit-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: submit-spin 1s ease-in-out infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        .submit-text {
            vertical-align: middle;
        }
        
        @keyframes submit-spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function addSuccessMessageStyles() {
    if (document.querySelector('#success-message-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'success-message-styles';
    style.textContent = `
        .form-success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            padding: var(--spacing-xl);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            animation: fadeInScale 0.3s var(--easing-out);
        }
        
        .success-content {
            text-align: center;
        }
        
        .success-icon {
            width: 64px;
            height: 64px;
            background-color: var(--color-success);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            margin: 0 auto var(--spacing-lg);
        }
        
        .success-content h3 {
            margin-bottom: var(--spacing-md);
            color: var(--color-dark);
        }
        
        .success-content p {
            margin-bottom: var(--spacing-md);
            color: var(--color-dark);
            opacity: 0.8;
        }
        
        .success-note {
            font-size: 0.875rem;
            font-style: italic;
        }
        
        .close-success {
            margin-top: var(--spacing-lg);
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

function addErrorMessageStyles() {
    if (document.querySelector('#error-message-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'error-message-styles';
    style.textContent = `
        .form-error-message {
            background-color: var(--color-error);
            color: white;
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-lg);
            animation: slideInDown 0.3s var(--easing-out);
        }
        
        .error-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .error-icon {
            width: 48px;
            height: 48px;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: var(--spacing-md);
        }
        
        .error-content h3 {
            margin-bottom: var(--spacing-sm);
            color: white;
        }
        
        .error-content p {
            margin-bottom: var(--spacing-md);
            color: white;
            opacity: 0.9;
        }
        
        .close-error {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
        }
        
        .close-error:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}