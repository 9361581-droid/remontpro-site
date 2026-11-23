/**
 * Quiz Calculator — РемонтПро
 * Логика квиза: навигация, расчёт стоимости, валидация формы.
 */

(function () {
    'use strict';

    // ===================================
    // Config: цены за м² по типу ремонта
    // ===================================
    var PRICE_PER_SQM = {
        cosmetic: 8000,
        capital: 15000,
        designer: 25000,
        unknown: 15000 // дефолт = капитальный
    };

    var DESIGN_PRICE = {
        '3d': 2500,    // средняя между 1500 и 3000
        basic: 1500,
        none: 0,
        unsure: 0
    };

    var TRASH_REMOVAL = 10000;
    var DEMOLITION_MULTIPLIER = 1.10; // +10%
    var UPPER_RANGE_MULTIPLIER = 1.25; // +25%

    // ===================================
    // State
    // ===================================
    var currentStep = 1;
    var totalQuestions = 10;
    var answers = {};

    // ===================================
    // DOM references
    // ===================================
    var steps = document.querySelectorAll('.quiz-step');
    var progressFill = document.getElementById('progress-fill');
    var progressText = document.getElementById('progress-text');
    var progressBar = document.getElementById('quiz-progress');
    var quizNav = document.getElementById('quiz-nav');
    var btnBack = document.getElementById('btn-back');
    var btnNext = document.getElementById('btn-next');
    var quizForm = document.getElementById('quiz-form');
    var phoneInput = document.getElementById('quiz-phone');

    // ===================================
    // Init
    // ===================================
    function init() {
        bindOptionClicks();
        bindNavigation();
        bindFormSubmit();
        bindPhoneMask();
        updateUI();
    }

    // ===================================
    // Option selection
    // ===================================
    function bindOptionClicks() {
        var options = document.querySelectorAll('.quiz-option');
        for (var i = 0; i < options.length; i++) {
            options[i].addEventListener('click', handleOptionClick);
        }
    }

    function handleOptionClick(e) {
        var btn = e.currentTarget;
        var question = btn.getAttribute('data-question');
        var value = btn.getAttribute('data-value');

        // Сохраняем ответ
        answers[question] = value;

        // Визуально выделяем
        var step = btn.closest('.quiz-step');
        var siblings = step.querySelectorAll('.quiz-option');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('selected');
        }
        btn.classList.add('selected');

        // Активируем кнопку "Далее"
        btnNext.disabled = false;

        // Автопереход на следующий вопрос (кроме последнего, там форма)
        if (currentStep < totalQuestions) {
            setTimeout(function () {
                goToStep(currentStep + 1);
            }, 300);
        }
    }

    // ===================================
    // Navigation
    // ===================================
    function bindNavigation() {
        btnBack.addEventListener('click', function () {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });

        btnNext.addEventListener('click', function () {
            if (currentStep < totalQuestions) {
                goToStep(currentStep + 1);
            } else if (currentStep === totalQuestions) {
                // Переход к форме с результатом
                goToStep(totalQuestions + 1);
            }
        });
    }

    function goToStep(step) {
        var direction = step > currentStep ? 'left' : 'right';
        var currentEl = steps[currentStep - 1];
        var nextEl = steps[step - 1];

        // Анимация выхода текущего шага
        currentEl.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');

        setTimeout(function () {
            currentEl.classList.remove('active', 'slide-out-left', 'slide-out-right');
            currentStep = step;
            nextEl.classList.add('active');

            // Восстанавливаем выделение, если ответ уже был
            restoreSelection(step);

            // Если переходим к результату — считаем цену
            if (step === totalQuestions + 1) {
                calculateAndDisplayPrice();
            }

            updateUI();
        }, 250);
    }

    function restoreSelection(step) {
        var stepEl = steps[step - 1];
        var options = stepEl.querySelectorAll('.quiz-option');
        for (var i = 0; i < options.length; i++) {
            var question = options[i].getAttribute('data-question');
            var value = options[i].getAttribute('data-value');
            if (answers[question] === value) {
                options[i].classList.add('selected');
            } else {
                options[i].classList.remove('selected');
            }
        }
    }

    // ===================================
    // UI Update
    // ===================================
    function updateUI() {
        // Progress
        var isResultOrSuccess = currentStep > totalQuestions;
        var progressPercent = isResultOrSuccess
            ? 100
            : (currentStep / totalQuestions) * 100;

        progressFill.style.width = progressPercent + '%';

        if (isResultOrSuccess) {
            progressText.textContent = 'Готово!';
        } else {
            progressText.textContent = 'Вопрос ' + currentStep + ' из ' + totalQuestions;
        }

        // Navigation buttons visibility
        if (currentStep > totalQuestions) {
            quizNav.classList.add('hidden');
            progressBar.style.display = 'none';
        } else {
            quizNav.classList.remove('hidden');
            progressBar.style.display = 'block';
        }

        // Back button
        btnBack.disabled = currentStep <= 1;

        // Next button — enabled only if current question is answered
        if (currentStep <= totalQuestions) {
            var stepEl = steps[currentStep - 1];
            var firstOption = stepEl.querySelector('.quiz-option');
            if (firstOption) {
                var questionName = firstOption.getAttribute('data-question');
                btnNext.disabled = !answers.hasOwnProperty(questionName);
            }
        }
    }

    // ===================================
    // Price Calculation
    // ===================================
    function calculatePrice() {
        var area = parseInt(answers.area, 10) || 50;
        var repairType = answers.repairType || 'capital';
        var designProject = answers.designProject || 'none';
        var condition = answers.condition || 'noFinish';

        // 1. Базовая цена
        var pricePerSqm = PRICE_PER_SQM[repairType] || PRICE_PER_SQM.capital;
        var basePrice = area * pricePerSqm;

        // 2. Дизайн-проект
        var designPrice = (DESIGN_PRICE[designProject] || 0) * area;

        // 3. Демонтаж для вторички
        var demolitionExtra = 0;
        if (condition === 'demolition') {
            demolitionExtra = basePrice * (DEMOLITION_MULTIPLIER - 1);
        }

        // 4. Вывоз мусора
        var totalBase = basePrice + designPrice + demolitionExtra + TRASH_REMOVAL;

        // Диапазон
        var priceFrom = Math.round(totalBase);
        var priceTo = Math.round(totalBase * UPPER_RANGE_MULTIPLIER);

        return { from: priceFrom, to: priceTo };
    }

    function calculateAndDisplayPrice() {
        var price = calculatePrice();
        var priceEl = document.getElementById('result-price');
        var formattedFrom = formatPrice(price.from);
        var formattedTo = formatPrice(price.to);
        priceEl.textContent = 'от ' + formattedFrom + ' до ' + formattedTo + ' ₽';
    }

    function formatPrice(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // ===================================
    // Phone Mask
    // ===================================
    function bindPhoneMask() {
        phoneInput.addEventListener('input', function (e) {
            var raw = e.target.value.replace(/\D/g, '');

            // Убираем лишнюю 8 или 7 в начале
            if (raw.length > 0 && (raw[0] === '8' || raw[0] === '7')) {
                raw = raw.substring(1);
            }

            var formatted = '+7';
            if (raw.length > 0) {
                formatted += ' (' + raw.substring(0, 3);
            }
            if (raw.length >= 3) {
                formatted += ') ' + raw.substring(3, 6);
            }
            if (raw.length >= 6) {
                formatted += '-' + raw.substring(6, 8);
            }
            if (raw.length >= 8) {
                formatted += '-' + raw.substring(8, 10);
            }

            e.target.value = formatted;
        });

        phoneInput.addEventListener('focus', function (e) {
            if (!e.target.value) {
                e.target.value = '+7 (';
            }
        });
    }

    // ===================================
    // Form Validation & Submit
    // ===================================
    function bindFormSubmit() {
        quizForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            var formData = collectFormData();

            // Данные квиза для будущей интеграции с CRM
            // formData и answers доступны в этом scope при необходимости

            // Переход к экрану успеха
            goToStep(totalQuestions + 2);
        });
    }

    function validateForm() {
        var isValid = true;

        // Имя
        var nameInput = document.getElementById('quiz-name');
        var nameValue = sanitize(nameInput.value.trim());
        if (!nameValue) {
            showFieldError('name', 'Введите ваше имя');
            nameInput.classList.add('input-error');
            isValid = false;
        } else {
            clearFieldError('name');
            nameInput.classList.remove('input-error');
        }

        // Телефон
        var phoneRaw = phoneInput.value.replace(/\D/g, '');
        if (phoneRaw.length < 11) {
            showFieldError('phone', 'Введите корректный номер телефона');
            phoneInput.classList.add('input-error');
            isValid = false;
        } else {
            clearFieldError('phone');
            phoneInput.classList.remove('input-error');
        }

        // Email (если заполнено — валидируем)
        var emailInput = document.getElementById('quiz-email');
        var emailValue = emailInput.value.trim();
        if (emailValue && !isValidEmail(emailValue)) {
            showFieldError('email', 'Введите корректный email');
            emailInput.classList.add('input-error');
            isValid = false;
        } else {
            clearFieldError('email');
            emailInput.classList.remove('input-error');
        }

        // Чекбокс согласия
        var privacyCheckbox = document.getElementById('quiz-privacy');
        if (!privacyCheckbox.checked) {
            showFieldError('privacy', 'Необходимо согласие с политикой');
            isValid = false;
        } else {
            clearFieldError('privacy');
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFieldError(field, message) {
        var el = document.getElementById('error-' + field);
        if (el) {
            el.textContent = sanitize(message);
        }
    }

    function clearFieldError(field) {
        var el = document.getElementById('error-' + field);
        if (el) {
            el.textContent = '';
        }
    }

    function collectFormData() {
        return {
            name: sanitize(document.getElementById('quiz-name').value.trim()),
            phone: sanitize(document.getElementById('quiz-phone').value.trim()),
            email: sanitize(document.getElementById('quiz-email').value.trim()),
            quizAnswers: Object.assign({}, answers),
            calculatedPrice: document.getElementById('result-price').textContent,
            submittedAt: new Date().toISOString()
        };
    }

    // ===================================
    // XSS Protection
    // ===================================
    function sanitize(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ===================================
    // Start
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
