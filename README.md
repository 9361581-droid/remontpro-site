# Сайт для бизнеса по ремонту квартир

## 📁 Структура проекта

```
website/
├── index.html          ← Главная страница (лендинг)
├── styles.css          ← Стили сайта
├── script.js           ← JavaScript (формы, анимации)
├── images/             ← Папка для изображений
│   ├── project-1-before.jpg
│   ├── project-1-after.jpg
│   ├── project-2-before.jpg
│   ├── project-2-after.jpg
│   ├── project-3-before.jpg
│   └── project-3-after.jpg
└── README.md           ← Этот файл
```

## 🚀 Как запустить сайт локально

### Вариант 1: Просто открыть в браузере
1. Откройте папку `website` в проводнике
2. Дважды кликните на файл `index.html`
3. Сайт откроется в вашем браузере по умолчанию

### Вариант 2: Использовать локальный сервер (рекомендуется)

**Python (если установлен):**
```bash
cd website
python -m http.server 8000
```
Затем откройте в браузере: `http://localhost:8000`

**Node.js (если установлен):**
```bash
# Установите serve глобально (один раз)
npm install -g serve

# Запустите сервер
cd website
serve
```
Затем откройте в браузере: `http://localhost:3000`

## 🖼️ Как добавить свои фото объектов

### Шаг 1: Подготовьте фото
- Формат: JPG или PNG
- Размер: рекомендуется 1200×800 px или больше
- Соотношение сторон: 3:2 или 16:9
- Качество: высокое (не сжатые)

### Шаг 2: Назовите файлы
Используйте следующий формат:
```
project-1-before.jpg   (фото ДО ремонта)
project-1-after.jpg    (фото ПОСЛЕ ремонта)
project-2-before.jpg
project-2-after.jpg
project-3-before.jpg
project-3-after.jpg
```

### Шаг 3: Поместите в папку
Скопируйте все фото в папку `website/images/`

### Шаг 4: Проверьте результат
Откройте сайт и перейдите в секцию "Портфолио" — фото должны появиться автоматически.

## ✏️ Как изменить контент

### Изменить название компании
Откройте `index.html` и найдите:
```html
<span class="logo-text">РемонтПро</span>
```
Замените `РемонтПро` на ваше название. Не забудьте изменить во всех местах:
- Header (шапка)
- Footer (подвал)
- Title страницы

### Изменить телефон
Найдите в `index.html`:
```html
<a href="tel:+79991234567" class="phone">+7 (999) 123-45-67</a>
```
Замените номер на ваш. Также измените:
- Все ссылки `tel:+79991234567`
- WhatsApp ссылку: `https://wa.me/79991234567`
- Telegram ссылку: `https://t.me/remontpro`

### Изменить цены
Найдите секцию `<section id="pricing">` и измените:
- Цифры в `price-amount`
- Описание пакетов
- Список включённых услуг

### Изменить цвета
Откройте `styles.css` и найдите секцию `:root`:
```css
:root {
    --color-primary: #2563EB;      /* Основной синий */
    --color-secondary: #F59E0B;    /* Акцентный оранжевый */
    --color-text: #1F2937;         /* Цвет текста */
}
```
Измените HEX-коды на ваши цвета.

## 📱 Как опубликовать сайт в интернете

### Вариант 1: Netlify (бесплатно, рекомендуется)

1. **Зарегистрируйтесь** на [netlify.com](https://www.netlify.com)
2. **Подготовьте файлы:**
   - Убедитесь, что все файлы в папке `website`
   - Все фото на месте
3. **Загрузите сайт:**
   - Войдите в Netlify
   - Перетащите папку `website` в область "Drag and drop"
4. **Готово!** Netlify даст вам ссылку вида `https://your-site.netlify.app`

**Плюсы:**
- Бесплатно
- HTTPS автоматически
- Быстрая загрузка
- 100 ГБ трафика в месяц

### Вариант 2: GitHub Pages (бесплатно)

1. **Создайте репозиторий** на [github.com](https://github.com)
2. **Загрузите файлы:**
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. **Включите GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Save
4. **Готово!** Сайт будет доступен по адресу `https://YOUR_USERNAME.github.io/YOUR_REPO`

### Вариант 3: Свой домен + хостинг

1. **Купите домен** (например, на [namecheap.com](https://www.namecheap.com) или [reg.ru](https://www.reg.ru))
2. **Выберите хостинг:**
   - **Timeweb** (от 150 ₽/мес)
   - **Beget** (от 150 ₽/мес)
   - **Reg.ru** (от 200 ₽/мес)
3. **Загрузите файлы** через FTP или файловый менеджер хостинга
4. **Привяжите домен** к хостингу (измените NS-записи)

## 🔧 Как настроить форму заявки

Сейчас форма просто показывает alert "Спасибо за заявку!". Чтобы заявки приходили вам на почту или в CRM:

### Вариант 1: Formspree (бесплатно, просто)

1. **Зарегистрируйтесь** на [formspree.io](https://formspree.io)
2. **Создайте форму** и получите URL (например, `https://formspree.io/f/xBbCcC`)
3. **Измените код** в `index.html`:
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/xBbCcC" method="POST">
```
4. **Уберите JavaScript** обработку формы в `script.js` (или оставьте для валидации)

**Плюсы:**
- Бесплатно (до 50 заявок в месяц)
- Заявки приходят на email
- Не нужен серверный код

### Вариант 2: Интеграция с CRM (amoCRM, Битрикс24)

1. **Настройте вебхук** в CRM
2. **Измените JavaScript** в `script.js`:
```javascript
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        // ... другие поля
    };
    
    // Отправка в CRM
    const response = await fetch('YOUR_WEBHOOK_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        alert('Спасибо за заявку!');
        contactForm.reset();
    } else {
        alert('Произошла ошибка. Попробуйте ещё раз.');
    }
});
```

### Вариант 3: Telegram-бот

1. **Создайте бота** через [@BotFather](https://t.me/BotFather)
2. **Получите токен** бота и ID вашего чата
3. **Добавьте код** отправки в Telegram в `script.js`:
```javascript
async function sendToTelegram(data) {
    const token = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    
    const message = `
🔨 Новая заявка с сайта!

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📐 Площадь: ${data.area} м²
🔧 Тип ремонта: ${data.service}
💬 Комментарий: ${data.message}
    `;
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
}
```

## 📊 Как подключить аналитику

### Яндекс.Метрика

1. **Зарегистрируйтесь** на [metrika.yandex.ru](https://metrika.yandex.ru)
2. **Создайте счётчик** и получите код
3. **Вставьте код** перед `</head>` в `index.html`:
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(12345678, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    });
</script>
<!-- /Yandex.Metrika counter -->
```
Замените `12345678` на ваш номер счётчика.

### Google Analytics

1. **Зарегистрируйтесь** на [analytics.google.com](https://analytics.google.com)
2. **Создайте ресурс** и получите Measurement ID (например, `G-XXXXXXXXXX`)
3. **Вставьте код** перед `</head>` в `index.html`:
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

## 🎯 Как настроить рекламу

### Яндекс.Директ

1. **Зарегистрируйтесь** на [direct.yandex.ru](https://direct.yandex.ru)
2. **Создайте кампанию:**
   - Тип: Поиск + сети
   - Цель: Конверсии (отправка формы)
   - Бюджет: от 500 ₽/день
3. **Настройте таргетинг:**
   - Гео: Москва
   - Ключевые слова: "ремонт квартир москва", "ремонт под ключ цена"
4. **Создайте объявления:**
   - Заголовок: "Ремонт квартир в Москве от 8000 ₽/м²"
   - Текст: "Фиксированная цена. Гарантия 3 года. От дизайна до тапочек."
   - Ссылка: ваш сайт

### Google Ads

1. **Зарегистрируйтесь** на [ads.google.com](https://ads.google.com)
2. **Создайте кампанию:**
   - Цель: Лиды
   - Тип: Поиск
   - Бюджет: от $10/день
3. **Настройте таргетинг:**
   - Гео: Москва
   - Ключевые слова: те же
4. **Создайте объявления** (аналогично Яндекс.Директ)

## 🐛 Как исправить проблемы

### Не отображаются фото
- Проверьте, что фото в папке `images/`
- Проверьте названия файлов (должны совпадать с кодом)
- Проверьте регистр (project-1.jpg ≠ Project-1.jpg)

### Не работает форма
- Откройте консоль браузера (F12)
- Посмотрите ошибки
- Проверьте, что JavaScript включён
- Проверьте код в `script.js`

### Сайт медленно загружается
- Оптимизируйте фото (используйте [tinypng.com](https://tinypng.com))
- Включите кэширование на сервере
- Используйте CDN для шрифтов

### Сайт не адаптивен на мобильных
- Проверьте код в `styles.css` (секция `@media`)
- Протестируйте на разных устройствах
- Используйте Chrome DevTools (F12 → Device Toolbar)

## 📞 Поддержка

Если возникли проблемы или вопросы:
1. Проверьте этот README
2. Поищите решение на Stack Overflow
3. Обратитесь к веб-разработчику

## ✅ Чек-лист перед запуском

- [ ] Все фото объектов загружены в `images/`
- [ ] Название компании изменено на ваше
- [ ] Телефон и email изменены
- [ ] Ссылки на соцсети рабочие
- [ ] Форма заявки настроена (Formspree/CRM/Telegram)
- [ ] Яндекс.Метрика или Google Analytics подключены
- [ ] Сайт протестирован на мобильных устройствах
- [ ] Все ссылки работают
- [ ] Фото оптимизированы (размер < 500 KB)
- [ ] HTTPS настроен (если свой домен)

## 🎉 Готово!

Ваш сайт готов к работе. Удачи в бизнесе! 🚀
