// ===================================
// Dashboard - Transparency Page Scripts
// РемонтПро - Дашборд прозрачности
// ===================================

// Dashboard data object (for future replacement with real data)
const dashboardData = {
    projectsCompleted: 2,
    projectsInProgress: 1,
    averageDuration: '2.5 мес',
    onTimePercent: 100,
    weeklyReports: true,
    lastUpdated: '2026-11-03'
};

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===================================
    // Format last-updated date
    // ===================================
    var lastUpdatedEl = document.getElementById('lastUpdated');
    if (lastUpdatedEl && dashboardData.lastUpdated) {
        var dateParts = dashboardData.lastUpdated.split('-');
        if (dateParts.length === 3) {
            var months = [
                'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
            ];
            var day = parseInt(dateParts[2], 10);
            var monthIndex = parseInt(dateParts[1], 10) - 1;
            var year = dateParts[0];
            lastUpdatedEl.textContent = day + ' ' + months[monthIndex] + ' ' + year;
        }
    }

    // ===================================
    // Counter Animation for Metric Values
    // ===================================
    function animateCounter(element, target, duration, suffix) {
        var start = 0;
        var startTime = null;
        suffix = suffix || '';

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // ease-out curve
            var easedProgress = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easedProgress * target);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    // Observe counter elements
    var counterElements = document.querySelectorAll('.metric-value[data-target]');

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'), 10);
                var suffix = el.getAttribute('data-suffix') || '';
                animateCounter(el, target, 2000, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(function (el) {
        counterObserver.observe(el);
    });

    // ===================================
    // Scroll-triggered Fade-in Animation
    // ===================================
    var animatedItems = document.querySelectorAll(
        '.metric-card, .process-card, .photo-card, .review-card, .cta-content, .section-header'
    );

    // Set initial hidden state
    animatedItems.forEach(function (el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease ' + (index % 4) * 0.1 + 's, transform 0.6s ease ' + (index % 4) * 0.1 + 's';
    });

    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    animatedItems.forEach(function (el) {
        scrollObserver.observe(el);
    });

    // ===================================
    // Console Info
    // ===================================
    console.log(
        '%c🔨 РемонтПро — Дашборд прозрачности загружен',
        'color: #D4A574; font-size: 16px; font-weight: bold;'
    );
});
