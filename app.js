if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {

    // 1. Smooth Scrolling Setup
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    let isCinematic = false;
    const audioTrack = document.getElementById('ambientTrack');
    if (audioTrack) {
        audioTrack.volume = 0.05;
    }

    // 2. Entrance Screen Controls
    const engageBtn = document.getElementById('engageCinematicBtn');
    const skipBtn = document.getElementById('skipIntroBtn');

    if (engageBtn) {
        engageBtn.addEventListener('click', () => {
            isCinematic = true;
            document.body.classList.remove('lights-on');
            initializePortfolio();
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            isCinematic = false;
            document.body.classList.add('lights-on');
            initializePortfolio();
        });
    }

    function initializePortfolio() {
        const gate = document.getElementById('introGate');
        if (gate) {
            gate.style.pointerEvents = 'none';
            if (typeof gsap !== 'undefined') {
                gsap.to(gate, {
                    opacity: 0, duration: 0.5, ease: 'power2.out',
                    onComplete: () => {
                        gate.style.display = 'none';
                        startHeroTypewriter();
                        initScrollAnimations();
                        if (isCinematic) { playAudioSequence(); }
                    }
                });
            } else {
                gate.style.display = 'none';
                startHeroTypewriter();
                initScrollAnimations();
            }
        }
    }

    // 3. Mouse-Following Spotlight (Cinematic Mode Only)
    const spotlight = document.getElementById('spotlight');
    window.addEventListener('mousemove', (e) => {
        if (!isCinematic || !spotlight) return;
        if (typeof gsap !== 'undefined') {
            gsap.to(spotlight, {
                left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power1.out'
            });
        }
    });

    // 4. Audio Controls
    const widget = document.getElementById('musicWidget');
    const toggleBtn = document.getElementById('widgetToggleBtn');

    function playAudioSequence() {
        if (!audioTrack) return;
        audioTrack.play().then(() => {
            if (widget) widget.classList.add('playing');
            if (toggleBtn) toggleBtn.innerText = 'MUTE';
            const status = document.querySelector('.track-status');
            if (status) status.innerText = 'LOOP ACTIVE';
        }).catch(err => console.log("Awaiting user activation."));
    }

    function pauseAudioSequence() {
        if (!audioTrack) return;
        audioTrack.pause();
        if (widget) widget.classList.remove('playing');
        if (toggleBtn) toggleBtn.innerText = 'PLAY';
        const status = document.querySelector('.track-status');
        if (status) status.innerText = 'SYSTEM IDLE';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (audioTrack.paused) { playAudioSequence(); } else { pauseAudioSequence(); }
        });
    }

    // 5. Hero Typewriter — Updated lines to reflect the new headline angle
    function startHeroTypewriter() {
        const lines = [
            "14 years of ops. IT degree. Zero missed milestones.",
            "AI SOP frameworks deployed. 40% admin overhead eliminated.",
            "Systems built from scratch. Documented. Version-controlled."
        ];
        let lineIdx = 0;
        let charIdx = 0;
        const targetNode = document.getElementById('typewriter');
        if (!targetNode) return;

        function type() {
            if (!targetNode) return;
            if (charIdx < lines[lineIdx].length) {
                targetNode.textContent += lines[lineIdx].charAt(charIdx);
                charIdx++;
                setTimeout(type, 35);
            } else {
                setTimeout(erase, 2800);
            }
        }

        function erase() {
            if (!targetNode) return;
            if (charIdx > 0) {
                targetNode.textContent = lines[lineIdx].substring(0, charIdx - 1);
                charIdx--;
                setTimeout(erase, 12);
            } else {
                lineIdx = (lineIdx + 1) % lines.length;
                setTimeout(type, 400);
            }
        }
        type();
    }

    // 6. Scroll-triggered Reveal Animations
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Reveal service cards on scroll
        gsap.utils.toArray('.reveal-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 0.5, delay: (i % 3) * 0.08,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        });

        // Reveal case study metric cards
        gsap.utils.toArray('.cs-metric-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1, scale: 1, duration: 0.4, delay: i * 0.07,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        });

        // Reveal testimonials
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.5, delay: i * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        });
    }

    // 7. Work History Accordions
    const accordions = document.querySelectorAll('.accordion-item');

    // Open the first item on load
    const firstItem = accordions[0];
    if (firstItem) {
        const firstContent = firstItem.querySelector('.accordion-content');
        if (firstContent && typeof gsap !== 'undefined') {
            gsap.set(firstContent, { height: 'auto' });
        } else if (firstContent) {
            firstContent.style.height = 'auto';
        }
    }

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                accordions.forEach(acc => {
                    acc.classList.remove('active');
                    const arrow = acc.querySelector('.arrow');
                    if (arrow) arrow.innerText = '▼';
                    const content = acc.querySelector('.accordion-content');
                    if (content && typeof gsap !== 'undefined') {
                        gsap.to(content, { height: 0, duration: 0.4, ease: 'power2.inOut' });
                    } else if (content) {
                        content.style.height = '0';
                    }
                });

                if (!isActive) {
                    item.classList.add('active');
                    const arrow = item.querySelector('.arrow');
                    if (arrow) arrow.innerText = '▲';
                    const content = item.querySelector('.accordion-content');
                    if (content && typeof gsap !== 'undefined') {
                        gsap.to(content, { height: 'auto', duration: 0.5, ease: 'power2.out' });
                    } else if (content) {
                        content.style.height = 'auto';
                    }
                }
            });
        }
    });

    // 8. Magnetic Button Interactions
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (typeof gsap === 'undefined') return;
            const bound = el.getBoundingClientRect();
            const x = e.clientX - bound.left - (bound.width / 2);
            const y = e.clientY - bound.top - (bound.height / 2);
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.2, ease: 'power1.out' });
        });
        el.addEventListener('mouseleave', () => {
            if (typeof gsap === 'undefined') return;
            gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
        });
    });
});
