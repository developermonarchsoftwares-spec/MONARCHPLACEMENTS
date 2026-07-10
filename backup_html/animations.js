/* ==========================================================================
   Monarch Training & Placements — Animations Engine (Complete)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
        if (typeof TextPlugin !== 'undefined') gsap.registerPlugin(TextPlugin);
    }

    initNavbarScroll();
    initMobileMenu();
    initCursorGlow();
    initThreeBackground();
    initHeroScrollReveal();
    initBannerParticles();
    initStatsObserver();
    initWhyGlobe();
    initFeaturesCarousel();
    initMarqueeLogos();
    initCtaParticles();
    initSeatsCountdown();
    initRevealObserver();
    initScrollFadeObserver();
    initGsapScrollAnimations();
});

/* ==========================================================================
   1. Navbar — add .scrolled class on scroll
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ==========================================================================
   1b. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const toggle   = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
            navLinks.classList.remove('open');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   2. Custom Cursor Glow
   ========================================================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    const dot  = document.getElementById('cursorDot');
    // On touch devices skip entirely
    if (!glow || !dot || window.matchMedia('(hover: none)').matches) return;

    let mouseX = window.innerWidth / 2,  mouseY = window.innerHeight / 2;
    let glowX  = mouseX, glowY  = mouseY;
    let dotX   = mouseX, dotY   = mouseY;

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    function tick() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        dotX  += (mouseX - dotX)  * 0.25;
        dotY  += (mouseY - dotY)  * 0.25;

        glow.style.left = `${glowX}px`;
        glow.style.top  = `${glowY}px`;
        dot.style.left  = `${dotX}px`;
        dot.style.top   = `${dotY}px`;
        requestAnimationFrame(tick);
    }
    tick();
    document.body.classList.add('has-cursor');
}

/* ==========================================================================
   3. Three.js Hero Star-field Background
   ========================================================================== */
function initThreeBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Build particle cloud
    const COUNT     = 3000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
        const r     = 20 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const c = Math.random();
        if (c < 0.4) { colors[i*3]=1;   colors[i*3+1]=1;   colors[i*3+2]=1;   }
        else if (c < 0.7) { colors[i*3]=0.6; colors[i*3+1]=0.8; colors[i*3+2]=1; }
        else              { colors[i*3]=0.9; colors[i*3+1]=0.9; colors[i*3+2]=1; }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
        size: 1, vertexColors: true, transparent: true,
        opacity: 0.6, sizeAttenuation: true,
        depthWrite: false, blending: THREE.AdditiveBlending
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    // Sparse connection lines
    const linePts = [];
    for (let i = 0; i < COUNT; i += 10) {
        for (let j = i + 10; j < Math.min(i + 50, COUNT); j += 10) {
            const dx = positions[i*3]-positions[j*3],
                  dy = positions[i*3+1]-positions[j*3+1],
                  dz = positions[i*3+2]-positions[j*3+2];
            if (dx*dx + dy*dy + dz*dz < 15*15) {
                linePts.push(positions[i*3], positions[i*3+1], positions[i*3+2],
                             positions[j*3], positions[j*3+1], positions[j*3+2]);
            }
        }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
    const lines = new THREE.LineSegments(lineGeo,
        new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.04, transparent: true, depthWrite: false }));
    scene.add(lines);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth)  * 2 - 1;
        my = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    (function animate() {
        requestAnimationFrame(animate);
        pts.rotation.y   += 0.00008; pts.rotation.x   += 0.00005;
        lines.rotation.y += 0.00008; lines.rotation.x += 0.00005;
        camera.position.x += (mx * 5 - camera.position.x) * 0.02;
        camera.position.y += (my * 5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        const s = 1 + Math.sin(Date.now() * 0.0003) * 0.02;
        pts.scale.setScalar(s); lines.scale.setScalar(s);
        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   4. Hero — Activate CSS animation classes (.text-reveal, .stagger)
   ========================================================================== */
function initHeroScrollReveal() {
    // Always activate text-reveals immediately so content is visible
    const textReveals = document.querySelectorAll('.text-reveal');
    textReveals.forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), 100 + i * 150);
    });

    // If GSAP is also handling it, that's fine — GSAP will override via autoAlpha
    const staggerEls = document.querySelectorAll('.hero-content .stagger');
    staggerEls.forEach(el => {
        setTimeout(() => el.classList.add('active'), 600);
    });

    const indicator = document.getElementById('scrollIndicator');
    if (indicator) setTimeout(() => { indicator.style.opacity = '1'; }, 1800);
}

/* ==========================================================================
   5. Banner floating particles (CSS expects <span> children)
   ========================================================================== */
function initBannerParticles() {
    const container = document.getElementById('bannerParticles');
    if (!container) return;
    for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        span.style.cssText = `
            left:${Math.random() * 100}%;
            animation-delay:${Math.random() * 8}s;
            animation-duration:${6 + Math.random() * 6}s;
        `;
        container.appendChild(span);
    }
}

/* ==========================================================================
   6. Stats Counter — handles both data-count (hero) and data-stat (cards)
   ========================================================================== */
function initStatsObserver() {
    // Hero stats: .stat-number[data-count]
    // Section stats: .stat-card-3d has data-stat & data-suffix; number is .stat-number inside
    const heroNums = document.querySelectorAll('.hero-stats .stat-number[data-count]');
    const cardNums = document.querySelectorAll('.stat-card-3d .stat-number');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            obs.unobserve(el);

            // Determine target & suffix
            let target = 0, suffix = '';
            if (el.hasAttribute('data-count')) {
                target = parseInt(el.getAttribute('data-count'), 10);
                // Infer suffix from label text
                const label = el.closest('.stat-item')?.querySelector('.stat-label')?.textContent || '';
                if (label.includes('Rate') || label.includes('%')) suffix = '%';
                else if (target === 500 || target === 100) suffix = '+';
            } else {
                const card = el.closest('.stat-card-3d');
                if (!card) return;
                target = parseInt(card.getAttribute('data-stat'), 10);
                suffix = card.getAttribute('data-suffix') || '';
            }
            if (isNaN(target)) return;
            animateCounter(el, target, suffix);
        });
    }, { threshold: 0.4 });

    heroNums.forEach(el => obs.observe(el));
    cardNums.forEach(el => obs.observe(el));
}

function animateCounter(el, target, suffix) {
    const duration  = 2200;
    const startTime = performance.now();
    (function tick(now) {
        const t       = Math.min((now - startTime) / duration, 1);
        const eased   = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + suffix;
    })(startTime);
}

/* ==========================================================================
   7. Why Globe — Three.js wireframe sphere
   ========================================================================== */
function initWhyGlobe() {
    const globeEl = document.getElementById('whyGlobe');
    if (!globeEl || typeof THREE === 'undefined') return;

    const SIZE = Math.min(320, globeEl.offsetWidth || 320);
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);';
    globeEl.style.position = 'relative';
    globeEl.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 50;

    const addSphere = (r, segs, color, opacity) => {
        const m = new THREE.Mesh(
            new THREE.SphereGeometry(r, segs, segs),
            new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false })
        );
        scene.add(m); return m;
    };
    const outer = addSphere(18, 32, 0xffffff, 0.12);
    const inner = addSphere(14, 16, 0xaaaaff, 0.07);

    (function animate() {
        requestAnimationFrame(animate);
        outer.rotation.y += 0.0006; outer.rotation.x += 0.0003;
        inner.rotation.y -= 0.0009; inner.rotation.x += 0.0004;
        renderer.render(scene, camera);
    })();
}

/* ==========================================================================
   8. Features Carousel — scroll-based, responsive
   ========================================================================== */
function initFeaturesCarousel() {
    const carousel     = document.getElementById('featuresCarousel');
    const prevBtn      = document.getElementById('prevFeature');
    const nextBtn      = document.getElementById('nextFeature');
    const dotsWrap     = document.getElementById('carouselDots');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.feature-card-3d'));
    if (!cards.length) return;

    let currentPage = 0;

    function cardsPerView() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 600)  return 2;
        return 1;
    }

    function totalPages() {
        return Math.max(1, Math.ceil(cards.length / cardsPerView()));
    }

    function buildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';
        for (let i = 0; i < totalPages(); i++) {
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', `Slide ${i + 1}`);
            btn.classList.toggle('active', i === currentPage);
            btn.addEventListener('click', () => { currentPage = i; update(); });
            dotsWrap.appendChild(btn);
        }
    }

    function update() {
        // Clamp
        currentPage = Math.max(0, Math.min(currentPage, totalPages() - 1));

        // Update dots
        if (dotsWrap) {
            Array.from(dotsWrap.children).forEach((d, i) =>
                d.classList.toggle('active', i === currentPage));
        }

        // Scroll carousel by scrollLeft
        const cardW = cards[0].offsetWidth;
        const gap   = 30; // matches CSS gap
        carousel.scrollTo({ left: currentPage * cardsPerView() * (cardW + gap), behavior: 'smooth' });

        // Disable/enable buttons
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages() - 1;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { currentPage++; update(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { currentPage--; update(); });

    // Touch swipe
    let tx = 0;
    carousel.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend',   e => {
        const diff = tx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? currentPage++ : currentPage--; update(); }
    }, { passive: true });

    // Keyboard
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { currentPage++; update(); }
        if (e.key === 'ArrowLeft')  { currentPage--; update(); }
    });

    // Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { buildDots(); update(); }, 150);
    });

    buildDots();
    update();
}

/* ==========================================================================
   9. Hiring Partners Marquee
   ========================================================================== */
function initMarqueeLogos() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    const companies = [
        'GOOGLE','AMAZON','MICROSOFT','INFOSYS','WIPRO',
        'TCS','COGNIZANT','ACCENTURE','CAPGEMINI','DELL',
        'IBM','TECH MAHINDRA','ORACLE','CISCO','ADOBE'
    ];

    const inject = () => {
        companies.forEach(name => {
            const span = document.createElement('span');
            span.className   = 'marquee-logo';
            span.textContent = name;
            track.appendChild(span);
        });
    };
    inject(); // first copy
    inject(); // second copy for seamless loop
}

/* ==========================================================================
   10. Seats Countdown
   ========================================================================== */
function initSeatsCountdown() {
    const el = document.getElementById('seatsLeft');
    if (!el) return;
    setInterval(() => {
        const n = parseInt(el.textContent, 10);
        if (!isNaN(n) && n > 5 && Math.random() > 0.8) el.textContent = n - 1;
    }, 30000);
}

/* ==========================================================================
   11. CTA Canvas Particles (rising dots)
   ========================================================================== */
function initCtaParticles() {
    // CSS-driven version: inject <span> elements into .cta-particles
    const cssContainer = document.querySelector('.cta-particles');
    if (cssContainer && cssContainer.children.length === 0) {
        for (let i = 0; i < 20; i++) {
            const s = document.createElement('span');
            s.style.cssText = `
                left:${Math.random() * 100}%;
                animation-delay:${Math.random() * 10}s;
                animation-duration:${8 + Math.random() * 8}s;
            `;
            cssContainer.appendChild(s);
        }
    }

    // Canvas version for the cta-canvas element
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;

    // Make canvas fill its parent
    const parent = canvas.parentElement;
    const resize = () => {
        canvas.width  = parent.offsetWidth  || window.innerWidth;
        canvas.height = parent.offsetHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const ctx   = canvas.getContext('2d');
    const dots  = [];
    for (let i = 0; i < 35; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * canvas.height,
            vy:  -(0.15 + Math.random() * 0.4),
            r:   0.5 + Math.random() * 1.5,
            a:   0.15 + Math.random() * 0.5
        });
    }

    (function draw() {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(d => {
            d.y += d.vy;
            if (d.y < -5) { d.y = canvas.height + 5; d.x = Math.random() * canvas.width; }
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${d.a})`;
            ctx.fill();
        });
    })();
}

/* ==========================================================================
   12. Generic Reveal Observer (fade-up on scroll via .active class)
   ========================================================================== */
function initRevealObserver() {
    const targets = document.querySelectorAll(
        '.section-header, .admission-banner, .partners-section .section-header'
    );

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.7s ease ${(i % 4) * 0.08}s, transform 0.7s ease ${(i % 4) * 0.08}s`;
        obs.observe(el);
    });

    // One-time style for .active
    if (!document.getElementById('_reveal_style')) {
        const st = document.createElement('style');
        st.id = '_reveal_style';
        st.textContent = '.section-header.active, .admission-banner.active { opacity:1!important; transform:none!important; }';
        document.head.appendChild(st);
    }
}

/* ==========================================================================
   13. GSAP Scroll Animations (enhanced if GSAP loaded)
   ========================================================================== */
function initGsapScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Hero entrance — stagger all direct children of hero-content
    const heroContent = document.getElementById('heroContent');
    if (heroContent) {
        gsap.from(heroContent.children, {
            y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.1,
            clearProps: 'all'
        });
    }

    // Scroll indicator fade-in
    const scrollInd = document.getElementById('scrollIndicator');
    if (scrollInd) {
        gsap.to(scrollInd, { autoAlpha: 1, duration: 0.8, delay: 2 });
    }

    // Stats — only animate if element exists
    if (document.querySelector('.stats-grid')) {
        gsap.from('.stat-card-3d', {
            scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
            y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out'
        });
    }

    // Why section
    if (document.querySelector('.why-content')) {
        gsap.from('.why-text', {
            scrollTrigger: { trigger: '.why-content', start: 'top 80%' },
            x: -40, autoAlpha: 0, duration: 1, ease: 'power2.out'
        });
        gsap.from('.why-visual', {
            scrollTrigger: { trigger: '.why-content', start: 'top 80%' },
            x: 40, autoAlpha: 0, duration: 1, ease: 'power2.out'
        });
    }

    // Features carousel
    if (document.querySelector('.features-carousel')) {
        gsap.from('.features-carousel', {
            scrollTrigger: { trigger: '.features-carousel', start: 'top 85%' },
            y: 40, autoAlpha: 0, duration: 0.9, ease: 'power2.out'
        });
    }

    // Training modules
    if (document.querySelector('.modules-grid-3d')) {
        gsap.from('.module-card-3d', {
            scrollTrigger: { trigger: '.modules-grid-3d', start: 'top 85%' },
            y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out'
        });
    }

    // CTA
    if (document.querySelector('.cta-section')) {
        gsap.from('.cta-content > *', {
            scrollTrigger: { trigger: '.cta-section', start: 'top 75%' },
            y: 30, autoAlpha: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
        });
    }
}

/* ==========================================================================
   14. Scroll Fade Observer — IntersectionObserver for fade-up / fade-left / fade-right
   ========================================================================== */
function initScrollFadeObserver() {
    const els = document.querySelectorAll(
        '.fade-up, .fade-left, .fade-right, .fade-down'
    );
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => obs.observe(el));

    // Also handle .stagger containers
    const staggerContainers = document.querySelectorAll('.stagger');
    const staggerObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                staggerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    staggerContainers.forEach(el => staggerObs.observe(el));
}