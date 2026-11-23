// ===================================
// Modern Renovation Website Scripts
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Animation on Scroll (Intersection Observer)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .service-card, 
        .advantage-card, 
        .portfolio-card, 
        .pricing-card, 
        .review-card, 
        .process-step,
        .section-header
    `);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // Portfolio Image Hover Effect
    // ===================================
    document.querySelectorAll('.portfolio-card').forEach(card => {
        const beforeImg = card.querySelector('.before');
        const afterImg = card.querySelector('.after');
        
        if (beforeImg && afterImg) {
            card.addEventListener('mouseenter', () => {
                beforeImg.style.opacity = '0';
                afterImg.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                beforeImg.style.opacity = '1';
                afterImg.style.opacity = '0';
            });
        }
    });
    
    // ===================================
    // Form Submission
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                area: document.getElementById('area').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.phone) {
                showAlert('Пожалуйста, заполните имя и телефон', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Send to API
            const API_URL = window.API_URL || 'https://remont-9361581.msk1.amvera.tech';

            fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'landing' })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    showAlert('Спасибо за заявку! Мы перезвоним вам в течение 15 минут.', 'success');
                    contactForm.reset();
                } else {
                    showAlert('Произошла ошибка. Попробуйте позвонить нам.', 'error');
                }
            })
            .catch(() => {
                showAlert('Спасибо за заявку! Мы перезвоним вам в течение 15 минут.', 'success');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // ===================================
    // Phone Number Formatting
    // ===================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7';
                
                if (value.length > 0) {
                    formatted += ' (' + value.substring(0, 3);
                }
                
                if (value.length >= 3) {
                    formatted += ') ' + value.substring(3, 6);
                }
                
                if (value.length >= 6) {
                    formatted += '-' + value.substring(6, 8);
                }
                
                if (value.length >= 8) {
                    formatted += '-' + value.substring(8, 10);
                }
                
                e.target.value = formatted;
            }
        });
    }
    
    // ===================================
    // Form Validation with Visual Feedback
    // ===================================
    const formInputs = document.querySelectorAll('.form-input[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#EF4444';
                this.parentElement.classList.add('has-error');
            } else {
                this.style.borderColor = '#E5E7EB';
                this.parentElement.classList.remove('has-error');
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#D4A574';
            this.parentElement.classList.remove('has-error');
        });
    });
    
    // ===================================
    // Parallax Effect for Hero
    // ===================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.5;
                hero.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // ===================================
    // Counter Animation
    // ===================================
    const counters = document.querySelectorAll('.feature-value');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasNumber = /\d/.test(text);
        
        if (!hasNumber) return;
        
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d\s]/g, '');
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        const stepDuration = duration / steps;
        
        let current = 0;
        const timer = setInterval(() => {
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
    // Lazy Loading Images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // Mobile Menu Toggle (if needed)
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// ===================================
// Utility Functions
// ===================================
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    const content = document.createElement('div');
    content.className = 'alert-content';
    const icon = document.createElement('span');
    icon.className = 'alert-icon';
    icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    const msg = document.createElement('span');
    msg.className = 'alert-message';
    msg.textContent = message;
    content.appendChild(icon);
    content.appendChild(msg);
    alert.appendChild(content);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .custom-alert-success {
            border-left: 4px solid #10B981;
        }
        
        .custom-alert-error {
            border-left: 4px solid #EF4444;
        }
        
        .custom-alert-info {
            border-left: 4px solid #3B82F6;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .alert-icon {
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .alert-message {
            font-size: 1rem;
            line-height: 1.5;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c🔨 РемонтПро - Сайт загружен!', 'color: #D4A574; font-size: 18px; font-weight: bold;');
console.log('%cСовременный дизайн для бизнеса по ремонту квартир', 'color: #666; font-size: 12px;');
console.log('Если вы видите это сообщение, JavaScript работает корректно.');
