// РемонтПро — Scripts
// Spotlight, 3D Tilt, Loading, Scroll Reveal

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Loading Screen
    // ===================================
    const loadingScreen = document.getElementById('loadingScreen');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('loaded');
        }, 300);
    });

    // Fallback: hide loading after 3s max
    setTimeout(function () {
        loadingScreen.classList.add('loaded');
    }, 3000);

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===================================
    // Spotlight Effect (cursor follower)
    // ===================================
    const spotlight = document.getElementById('spotlight');
    const hero = document.querySelector('.hero');

    if (spotlight && hero) {
        hero.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.background = 'radial-gradient(600px circle at ' + x + 'px ' + y + 'px, rgba(201, 169, 98, 0.06), transparent 60%)';
        });

        hero.addEventListener('mouseleave', function () {
            spotlight.style.background = 'transparent';
        });
    }

    // ===================================
    // 3D Tilt Effect on Cards
    // ===================================
    var tiltCards = document.querySelectorAll('.service-card, .advantage-card, .portfolio-card, .pricing-card, .review-card');

    tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -4;
            var rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    var revealElements = document.querySelectorAll(
        '.service-card, .advantage-card, .portfolio-card, .pricing-card, ' +
        '.review-card, .process-step, .problem-item, .section-header, ' +
        '.contact-method, .problem-solution'
    );

    // Add reveal class
    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===================================
    // Portfolio Image Hover Effect
    // ===================================
    document.querySelectorAll('.portfolio-card').forEach(function (card) {
        var beforeImg = card.querySelector('.before');
        var afterImg = card.querySelector('.after');

        if (beforeImg && afterImg) {
            card.addEventListener('mouseenter', function () {
                beforeImg.style.opacity = '0';
                afterImg.style.opacity = '1';
            });
            card.addEventListener('mouseleave', function () {
                beforeImg.style.opacity = '1';
                afterImg.style.opacity = '0';
            });
        }
    });

    // ===================================
    // Form Submission
    // ===================================
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                area: document.getElementById('area').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            if (!formData.name || !formData.phone) {
                showAlert('Пожалуйста, заполните имя и телефон', 'error');
                return;
            }

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            var API_URL = window.API_URL || 'https://remont-9361581.msk1.amvera.tech';

            fetch(API_URL + '/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.assign({}, formData, { source: 'landing' }))
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.ok) {
                    showAlert('Спасибо! Мы перезвоним в течение 15 минут.', 'success');
                    contactForm.reset();
                } else {
                    showAlert('Произошла ошибка. Попробуйте позвонить нам.', 'error');
                }
            })
            .catch(function () {
                showAlert('Спасибо! Мы перезвоним в течение 15 минут.', 'success');
            })
            .finally(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ===================================
    // Phone Number Formatting
    // ===================================
    var phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            var value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                var formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }

    // ===================================
    // Form Validation Visual Feedback
    // ===================================
    var formInputs = document.querySelectorAll('.form-input[required]');
    formInputs.forEach(function (input) {
        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.style.borderColor = '#f87171';
            } else {
                this.style.borderColor = '';
            }
        });
        input.addEventListener('focus', function () {
            this.style.borderColor = '';
        });
    });

    // ===================================
    // Counter Animation
    // ===================================
    var counters = document.querySelectorAll('.feature-value');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) { counterObserver.observe(counter); });

    function animateCounter(element) {
        var text = element.textContent;
        var hasNumber = /\d/.test(text);
        if (!hasNumber) return;

        var number = parseInt(text.replace(/\D/g, ''));
        if (isNaN(number) || number === 0) return;

        var suffix = text.replace(/[\d\s]/g, '');
        var duration = 2000;
        var steps = 60;
        var increment = number / steps;
        var stepDuration = duration / steps;

        var current = 0;
        var timer = setInterval(function () {
            current += increment;
            if (current >= number) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepDuration);
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// ===================================
// Alert Utility
// ===================================
function showAlert(message, type) {
    type = type || 'info';
    var alert = document.createElement('div');
    alert.className = 'custom-alert custom-alert-' + type;
    var content = document.createElement('div');
    content.className = 'alert-content';
    var icon = document.createElement('span');
    icon.className = 'alert-icon';
    icon.textContent = type === 'success' ? '\u2713' : type === 'error' ? '\u2717' : '\u2139';
    var msg = document.createElement('span');
    msg.className = 'alert-message';
    msg.textContent = message;
    content.appendChild(icon);
    content.appendChild(msg);
    alert.appendChild(content);

    var style = document.createElement('style');
    style.textContent =
        '.custom-alert{position:fixed;top:80px;right:20px;background:#1a1a24;color:#e5e5e5;padding:1.25rem 1.75rem;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.5);z-index:10000;animation:alertSlideIn 0.3s ease;max-width:380px;border:1px solid rgba(255,255,255,0.06)}' +
        '.custom-alert-success{border-left:3px solid #22c55e}' +
        '.custom-alert-error{border-left:3px solid #f87171}' +
        '.custom-alert-info{border-left:3px solid #60a5fa}' +
        '.alert-content{display:flex;align-items:center;gap:0.75rem}' +
        '.alert-icon{font-size:1.25rem;font-weight:bold}' +
        '.alert-message{font-size:0.9375rem;line-height:1.5}' +
        '@keyframes alertSlideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}' +
        '@keyframes alertSlideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}';
    document.head.appendChild(style);
    document.body.appendChild(alert);

    setTimeout(function () {
        alert.style.animation = 'alertSlideOut 0.3s ease';
        setTimeout(function () { alert.remove(); }, 300);
    }, 5000);
}
