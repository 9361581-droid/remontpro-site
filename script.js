// РемонтПро — Main Scripts

document.addEventListener('DOMContentLoaded', function() {

    // Header scroll
    var header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var t = document.querySelector(this.getAttribute('href'));
            if (t) {
                window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Hero Slider
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    var cur = 0;
    var timer;

    function goSlide(i) {
        slides.forEach(function(s) { s.classList.remove('active'); });
        dots.forEach(function(d) { d.classList.remove('active'); });
        slides[i].classList.add('active');
        dots[i].classList.add('active');
        cur = i;
    }

    function nextSlide() { goSlide((cur + 1) % slides.length); }

    function startSlider() { timer = setInterval(nextSlide, 5000); }

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            clearInterval(timer);
            goSlide(parseInt(this.dataset.slide));
            startSlider();
        });
    });

    if (slides.length) startSlider();

    // Stats counter animation
    var statEls = document.querySelectorAll('[data-count]');
    var statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.dataset.count);
                if (target === 0) { el.textContent = '0'; statsObserver.unobserve(el); return; }
                var duration = 1500, steps = 50, inc = target / steps, cur = 0;
                var t = setInterval(function() {
                    cur += inc;
                    if (cur >= target) { el.textContent = target; clearInterval(t); }
                    else { el.textContent = Math.floor(cur); }
                }, duration / steps);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    statEls.forEach(function(el) { statsObserver.observe(el); });

    // Gallery filters
    var filterBtns = document.querySelectorAll('.gallery-filter');
    var items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            var f = this.dataset.filter;
            items.forEach(function(item) {
                item.classList.toggle('hidden', f !== 'all' && item.dataset.cat !== f);
            });
        });
    });

    // Lightbox
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lbImg');
    var lbCap = document.getElementById('lbCap');
    var lbIdx = 0;

    function getVisible() {
        return Array.from(items).filter(function(i) { return !i.classList.contains('hidden') && i.dataset.full; });
    }

    function openLB(idx) {
        var vis = getVisible();
        lbIdx = idx;
        lbImg.src = vis[idx].dataset.full;
        var cap = vis[idx].querySelector('.gallery-cap span');
        lbCap.textContent = cap ? cap.textContent : '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLB() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navLB(dir) {
        var vis = getVisible();
        lbIdx = (lbIdx + dir + vis.length) % vis.length;
        lbImg.src = vis[lbIdx].dataset.full;
        var cap = vis[lbIdx].querySelector('.gallery-cap span');
        lbCap.textContent = cap ? cap.textContent : '';
    }

    items.forEach(function(item) {
        item.addEventListener('click', function() {
            if (!item.dataset.full) return;
            var vis = getVisible().filter(function(i) { return i.dataset.full; });
            var idx = vis.indexOf(item);
            if (idx !== -1) openLB(idx);
        });
    });

    document.getElementById('lbClose').addEventListener('click', closeLB);
    document.getElementById('lbPrev').addEventListener('click', function() { navLB(-1); });
    document.getElementById('lbNext').addEventListener('click', function() { navLB(1); });
    lb.addEventListener('click', function(e) { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function(e) {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') navLB(-1);
        if (e.key === 'ArrowRight') navLB(1);
    });

    // Reveal on scroll
    var revealObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

    // CTA form
    var ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = this.querySelector('.btn');
            var input = this.querySelector('input');
            btn.textContent = 'Отправлено!';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            input.value = '';
            setTimeout(function() {
                btn.textContent = 'Получить смету';
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 3000);
        });
    }
});
