// Register Basic ScrollTrigger Parameters
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling Configuration Engine
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Global State Parameters
let isCinematic = false;
const audioTrack = document.getElementById('ambientTrack');
if(audioTrack) {
    audioTrack.volume = 0.05; // Set low background volume mix
}

// Fixed Entry Gate Click Hooks to prevent screen lockups
document.getElementById('engageCinematicBtn').addEventListener('click', () => {
    isCinematic = true;
    document.body.classList.remove('lights-on');
    initializePortfolio();
});

document.getElementById('skipIntroBtn').addEventListener('click', () => {
    isCinematic = false;
    document.body.classList.add('lights-on');
    initializePortfolio();
});

function initializePortfolio() {
    // Instantly remove pointer events so the screen is clickable right away
    const gate = document.getElementById('introGate');
    if (gate) {
        gate.style.pointerEvents = 'none';
        
        gsap.to(gate, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                gate.style.display = 'none';
                startHeroTypewriter();
                if (isCinematic) {
                    playAudioSequence();
                }
            }
        });
    }
}

// Interactive Spotlight Control Matrix
const spotlight = document.getElementById('spotlight');
window.addEventListener('mousemove', (e) => {
    if (!isCinematic || !spotlight) return;
    gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
    });
});

// Audio Loop Playback Controls
const widget = document.getElementById('musicWidget');
const toggleBtn = document.getElementById('widgetToggleBtn');

function playAudioSequence() {
    if(!audioTrack) return;
    audioTrack.play().then(() => {
        if(widget) widget.classList.add('playing');
        if(toggleBtn) toggleBtn.innerText = 'MUTE';
        const status = document.querySelector('.track-status');
        if(status) status.innerText = 'LOOP ACTIVE';
    }).catch(err => console.log("Audio waiting for user interaction."));
}

function pauseAudioSequence() {
    if(!audioTrack) return;
    audioTrack.pause();
    if(widget) widget.classList.remove('playing');
    if(toggleBtn) toggleBtn.innerText = 'PLAY';
    const status = document.querySelector('.track-status');
    if(status) status.innerText = 'SYSTEM IDLE';
}

if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (audioTrack.paused) {
            playAudioSequence();
        } else {
            pauseAudioSequence();
        }
    });
}

// Typewriter Execution Engine
function startHeroTypewriter() {
    const lines = [
        "System optimized. Ready to coordinate operations.",
        "Inbox architecture standardized successfully.",
        "SOP guidelines drafted. Client pipelines online."
    ];
    let lineIdx = 0;
    let charIdx = 0;
    const targetNode = document.getElementById('typewriter');
    if(!targetNode) return;
    
    function type() {
        if (!targetNode) return;
        if (charIdx < lines[lineIdx].length) {
            targetNode.textContent += lines[lineIdx].charAt(charIdx);
            charIdx++;
            setTimeout(type, 40);
        } else {
            setTimeout(erase, 2500);
        }
    }
    
    function erase() {
        if (!targetNode) return;
        if (charIdx > 0) {
            targetNode.textContent = lines[lineIdx].substring(0, charIdx - 1);
            charIdx--;
            setTimeout(erase, 20);
        } else {
            lineIdx = (lineIdx + 1) % lines.length;
            setTimeout(type, 400);
        }
    }
    type();
}

// Platform Tag Grid Filter Calculations
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card-wrapper');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        
        skillCards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            if (filterVal === 'all' || cat === filterVal) {
                gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
                card.style.style.display = 'block';
            } else {
                gsap.to(card, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// Interactive Accordion Work Track Engine
const accordions = document.querySelectorAll('.accordion-item');
accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if(header) {
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            accordions.forEach(acc => {
                acc.classList.remove('active');
                const arrow = acc.querySelector('.arrow');
                if(arrow) arrow.innerText = '▼';
                const content = acc.querySelector('.accordion-content');
                if(content) gsap.to(content, { height: 0, duration: 0.4, ease: 'power2.inOut' });
            });
            
            if (!isActive) {
                item.classList.add('active');
                const arrow = item.querySelector('.arrow');
                if(arrow) arrow.innerText = '▲';
                const content = item.querySelector('.accordion-content');
                if(content) gsap.to(content, { height: 'auto', duration: 0.5, ease: 'power2.out' });
            }
        });
    }
});

// Premium Magnetic Button Interface Enhancements
const magnets = document.querySelectorAll('.magnetic');
magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const bound = el.getBoundingClientRect();
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.2, ease: 'power1.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    });
});

// Statistics Metric Progression Track Trigger
const metrics = document.querySelectorAll('.metric-num');
metrics.forEach(metric => {
    const target = parseInt(metric.getAttribute('data-target'));
    ScrollTrigger.create({
        trigger: metric,
        start: 'top 90%',
        onEnter: () => {
            let obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                    metric.innerText = Math.ceil(obj.val).toLocaleString();
                }
            });
        }
    });
});
