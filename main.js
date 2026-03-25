/* ═══════════════════════════════════════
   AluK — GSAP Animations & Interactions
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    /* ─── 1. HERO ENTRANCE ─── */
    const heroTl = gsap.timeline({ delay: .3 });

    heroTl.to('[data-gsap="hero"] .hero-line', {
        y: 0, opacity: 1,
        duration: 1,
        stagger: .12,
        ease: 'power3.out'
    })
        .to('[data-gsap="hero-sub"]', {
            y: 0, opacity: 1,
            duration: .8,
            stagger: .1,
            ease: 'power3.out'
        }, '-=.6');

    /* ─── 2. GENERIC FADE-UP ON SCROLL ─── */
    document.querySelectorAll('[data-gsap="fade"]').forEach(el => {
        gsap.to(el, {
            y: 0, opacity: 1,
            duration: .9,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    /* ─── 3. SPLIT SECTIONS (LEFT/RIGHT) ─── */
    document.querySelectorAll('[data-gsap="split"]').forEach(el => {
        const left = el.querySelector('.split-left');
        const right = el.querySelector('.split-right');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        if (left) tl.to(left, { x: 0, opacity: 1, duration: .9, ease: 'power2.out' }, 0);
        if (right) tl.to(right, { x: 0, opacity: 1, duration: .9, ease: 'power2.out' }, .15);
    });

    /* ─── 4. BENTO CARDS STAGGER ─── */
    gsap.to('[data-gsap="bento"]', {
        y: 0, opacity: 1, scale: 1,
        duration: .7,
        stagger: .1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.bento',
            start: 'top 80%'
        }
    });

    /* ─── 5. PARALLAX IMAGE IN BENTO WIDE ─── */
    gsap.to('.bento-parallax', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.bento-full',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    /* ─── 6. NAVBAR SCROLL ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ─── 7. COUNTER ANIMATION ─── */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: .3 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = +el.dataset.target;
        const dur = 2200;
        const step = target / (dur / 16);
        let val = 0;
        const tick = () => {
            val += step;
            if (val < target) { el.textContent = Math.ceil(val); requestAnimationFrame(tick); }
            else { el.textContent = target; }
        };
        tick();
    }

    /* ─── 8. FAQ ACCORDION ─── */
    document.querySelectorAll('.acc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const body = btn.nextElementSibling;

            // Close others
            document.querySelectorAll('.acc-btn').forEach(other => {
                if (other !== btn && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.nextElementSibling.style.maxHeight = null;
                }
            });

            btn.classList.toggle('active');
            body.style.maxHeight = btn.classList.contains('active')
                ? body.scrollHeight + 'px'
                : null;
        });
    });

    /* ─── 9. HORIZONTAL SCROLL GALLERY ─── */
    const hTrack = document.querySelector('.hscroll-track');
    const hWrap = document.querySelector('.hscroll-wrap');
    if (hTrack && hWrap) {
        const getScrollAmount = () => -(hTrack.scrollWidth - hWrap.offsetWidth);

        gsap.to(hTrack, {
            x: getScrollAmount,
            ease: 'none',
            scrollTrigger: {
                trigger: '#prodotti',
                start: 'top top',
                end: () => `+=${Math.abs(getScrollAmount())}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }

    /* ─── 10. TEXTAREA CHAR COUNT ─── */
    const ta = document.getElementById('messaggio');
    const cc = document.querySelector('.char-count');
    if (ta && cc) {
        ta.addEventListener('input', () => {
            cc.textContent = `${ta.value.length}/800`;
        });
    }
    /* ─── 11. GOOGLE SHEETS INTEGRATION ─── */
    const alukForm = document.getElementById('alukForm');
    if (alukForm) {
        alukForm.addEventListener('submit', () => {
            const fd = new FormData(alukForm);
            const data = {};
            fd.forEach((val, key) => { data[key] = val; });
            const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
            navigator.sendBeacon('https://script.google.com/macros/s/AKfycbyZJPUx6BP-e418O_tgkDj3ZGUg9wMsnyyFW598b_bfqLlJBPOvnJWsPYio-iVYDshOhQ/exec', blob);
        });
    }
});
