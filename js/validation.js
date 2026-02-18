// validation.js - Валидация формы консультации

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultation-form');
    if (!form) return;
    
    initFormValidation(form);
});

/**
 * Инициализация валидации формы
 */
function initFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Добавляем обработчики событий для валидации в реальном времени
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Показываем состояние отправки
            showLoadingState(submitButton, true);
            
            // Имитация отправки на сервер
            setTimeout(() => {
                showSuccessMessage(form);
                resetForm(form);
                showLoadingState(submitButton, false);
            }, 1500);
        } else {
            // Прокрутка к первой ошибке
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

/**
 * Валидация отдельного поля
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Очищаем предыдущие ошибки
    clearError(field);
    
    // Проверка обязательных полей
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = getRequiredErrorMessage(field);
    }
    
    // Специфичные проверки по типу поля
    if (isValid && value) {
        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Пожалуйста, введите корректный email адрес';
                }
                break;
                
            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Пожалуйста, введите корректный номер телефона';
                }
                break;
                
            case 'text':
                if (field.id === 'name' && !isValidName(value)) {
                    isValid = false;
                    errorMessage = 'Имя должно содержать только буквы и быть не короче 2 символов';
                }
                break;
        }
    }
    
    // Для textarea с id="message" - опциональное поле, но если заполнено, проверяем длину
    if (field.id === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Описание проблемы должно содержать не менее 10 символов';
    }
    
    // Для select - проверяем выбор
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Пожалуйста, выберите способ связи';
    }
    
    // Показываем ошибку, если есть
    if (!isValid) {
        showError(field, errorMessage);
    } else {
        showSuccess(field);
    }
    
    return isValid;
}

/**
 * Проверка email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Проверка телефона (российский формат)
 */
function isValidPhone(phone) {
    // Принимаем форматы: +7..., 8..., 7..., с любыми разделителями
    const phoneRegex = /^[\+]?[7-8]?[\s\-\(]?\d{3}[\s\-\)]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Проверка имени
 */
function isValidName(name) {
    return name.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name);
}

/**
 * Получение сообщения об ошибке для обязательных полей
 */
function getRequiredErrorMessage(field) {
    const fieldName = field.previousElementSibling?.textContent || 'Это поле';
    return `${fieldName} обязательно для заполнения`;
}

/**
 * Показать ошибку для поля
 */
function showError(field, message) {
    // Создаем элемент ошибки
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '4px';
    
    // Добавляем класс ошибки к полю
    field.classList.add('error');
    field.style.borderColor = 'var(--color-error)';
    
    // Вставляем сообщение об ошибке после поля
    const parent = field.parentElement;
    parent.appendChild(errorElement);
}

/**
 * Очистить ошибку для поля
 */
function clearError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    // Удаляем сообщение об ошибке
    const parent = field.parentElement;
    const errorElement = parent.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Показать успешное состояние поля
 */
function showSuccess(field) {
    field.classList.add('success');
    field.style.borderColor = 'var(--color-success)';
    
    // Удаляем класс success через некоторое время
    setTimeout(() => {
        field.classList.remove('success');
        field.style.borderColor = '';
    }, 2000);
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
        
        // Создаем спиннер через DOM API
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        
        // Создаем текстовый узел
        const text = document.createTextNode(' Отправка...');
        
        // Добавляем элементы в кнопку
        button.appendChild(spinner);
        button.appendChild(text);
        
        button.disabled = true;
        
        // Добавляем стили для спиннера
        addSpinnerStyles();
    } else {
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
        }
        button.disabled = false;
    }
}

/**
 * Показать сообщение об успешной отправке
 */
function showSuccessMessage(form) {
    // Создаем элемент успешного сообщения
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    // Создаем внутренний контейнер
    const container = document.createElement('div');
    container.style.backgroundColor = 'var(--color-success)';
    container.style.color = 'white';
    container.style.padding = 'var(--spacing-lg)';
    container.style.borderRadius = 'var(--radius-md)';
    container.style.textAlign = 'center';
    container.style.marginTop = 'var(--spacing-lg)';
    
    // Создаем заголовок
    const heading = document.createElement('h3');
    heading.textContent = '✅ Заявка отправлена!';
    heading.style.marginBottom = 'var(--spacing-sm)';
    
    // Создаем параграф
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Спасибо за вашу заявку. Я свяжусь с вами в течение 24 часов.';
    
    // Собираем структуру
    container.appendChild(heading);
    container.appendChild(paragraph);
    successMessage.appendChild(container);
    
    // Вставляем сообщение перед формой
    form.parentElement.insertBefore(successMessage, form);
    
    // Скрываем форму
    form.style.display = 'none';
    
    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.remove();
        form.style.display = 'block';
    }, 5000);
}

/**
 * Сброс формы
 */
function resetForm(form) {
    form.reset();
    form.querySelectorAll('.error, .success').forEach(field => {
        field.classList.remove('error', 'success');
        field.style.borderColor = '';
    });
    
    // Удаляем все сообщения об ошибках
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
}

/**
 * Добавить стили для спиннера загрузки
 */
function addSpinnerStyles() {
    if (document.querySelector('#spinner-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'spinner-styles';
    style.textContent = `
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}