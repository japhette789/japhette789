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
                gsap.to(gate, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => {
                    gate.style.display = 'none';
                    startHeroTypewriter();
                    initScrollAnimations();
                    if (isCinematic) {
                        playAudioSequence();
                    }
                }});
            } else {
                gate.style.display = 'none';
                startHeroTypewriter();
                initScrollAnimations();
            }
        }
    }

    // 3. Audio Player Logic
    const widgetToggleBtn = document.getElementById('widgetToggleBtn');
    const widgetVisual = document.querySelector('.widget-visual');
    const trackStatus = document.querySelector('.track-status');

    function playAudioSequence() {
        if (!audioTrack) return;
        audioTrack.play().then(() => {
            if (widgetVisual) widgetVisual.classList.add('playing');
            if (trackStatus) trackStatus.textContent = 'PLAYING MOCK LOOP';
            if (widgetToggleBtn) widgetToggleBtn.textContent = 'PAUSE';
        }).catch(err => console.log("Audio play blocked by browser policies"));
    }

    if (widgetToggleBtn && audioTrack) {
        widgetToggleBtn.addEventListener('click', () => {
            if (audioTrack.paused) {
                audioTrack.play();
                widgetVisual.classList.add('playing');
                trackStatus.textContent = 'PLAYING MOCK LOOP';
                widgetToggleBtn.textContent = 'PAUSE';
            } else {
                audioTrack.pause();
                widgetVisual.classList.remove('playing');
                trackStatus.textContent = 'SYSTEM PAUSED';
                widgetToggleBtn.textContent = 'PLAY';
            }
        });
    }

    // 4. Hero Safe Typewriter Simulation
    function startHeroTypewriter() {
        const txtElement = document.getElementById('typewriter');
        if (!txtElement) return;
        const textToType = "initializing clean administrative systems core validation protocols complete...";
        let index = 0;

        function type() {
            if (index < textToType.length) {
                txtElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 35);
            }
        }
        type();
    }

    // 5. Scroll Illumination Effect
    const spotlight = document.getElementById('spotlight');
    window.addEventListener('mousemove', (e) => {
        if (!spotlight || document.body.classList.contains('lights-on')) return;
        gsap.to(spotlight, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.2,
            ease: 'power1.out'
        });
    });

    // 6. Scroll Trigger Framework Initialization
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Core Section Reveal Loops
        gsap.utils.toArray('.service-card, .timeline-item, .contact-box').forEach(box => {
            gsap.fromTo(box, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    // 7. Easter Egg Layer
    const easterEggBtn = document.getElementById('easterEggBtn');
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', () => {
            alert("SYSTEM NOTIFICATION: Declarative profile index verified. AI sanitization safeguards active. Version 4.0 stable.");
        });
    }

    // 8. Magnetic Force UI Hooks
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // 9. Mobile Menu Navigation Toggles
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileClose = document.getElementById('mobileNavClose');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    function openMobileNav() {
        if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMobileNav);
    });

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) closeMobileNav();
        });
    }

    // 10. Skill Bar Scroll Animation
    function animateSkillBars() {
        const bars = document.querySelectorAll('.skill-bar-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.style.width;
                    bar.style.width = '0%';
                    requestAnimationFrame(() => {
                        setTimeout(() => { bar.style.width = targetWidth; }, 100);
                    });
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        bars.forEach(bar => observer.observe(bar));
    }
    animateSkillBars();

    // =====================================================
    // INTEGRATED JAPHETTE PORTFOLIO CHATBOT LOGIC
    // =====================================================
    (function() {
        const chatToggle = document.getElementById('jp-chat-toggle');
        const chatWindow = document.getElementById('jp-chat-window');
        const chatMinimize = document.getElementById('jp-chat-minimize');
        const chatForm = document.getElementById('jp-chat-input-form');
        const chatInput = document.getElementById('jp-chat-input');
        const chatMessages = document.getElementById('jp-chat-messages');
        const chatSuggestions = document.getElementById('jp-chat-suggestions');
        const iconOpen = document.getElementById('jp-chat-icon-open');
        const iconClose = document.getElementById('jp-chat-icon-close');

        if (!chatToggle || !chatWindow) return;

        // Synchronized knowledge base matching verified updated resume specs
        const knowledge = {
            experience: `Japhette has **14+ years of professional experience** spanning:

• **General Virtual Assistant** at Fit Body Boot Camp (Aug 2023 – May 2026) — lead generation, CRM tracking, schedules, transaction audits, and dashboard performance metrics.

• **Customer Service Representative** at Inspiro / 1800 Flowers (Apr 2023 – Aug 2023) — order fulfillment workflows, escalation tracking, and strict SLA customer care compliance.

• **Principal Consultant & Owner** at WJ Construction & Engineering (Sept 2012 – Present) — running small business development parameters, budget planning, data logs, and vendor operations coordination.

He holds a **BS in Information Technology (Major in System Engineering)** from Colegio de San Juan de Letran.`,

            services: `Japhette offers these core services:

📋 **Executive VA Support** — proactive dashboard organization, calendar filtering, and corporate operations management.

⚙️ **Operations Management** — formulating crisp standard operating procedures (SOP libraries), workflow audits, and process integration.

📊 **CRM & Data Administration** — database configuration, tracking pipeline analytics, and information governance.

🤖 **AI SOP Engineering** — structuring systematic standard operating guides using prompt engineering techniques.

🖥️ **Technical Support** — structural network diagnostics, software tool synchronization, and deployment workflows.

Would you like specifics on any item?`,

            rates: `Here are Japhette's typical engagement baselines:

| Service | Hourly Range | Retainer Format |
|---------|--------|----------------------|
| Executive VA Support | $8–12/hr | $1,200/mo (20 hrs/wk) |
| Operations Management | $12–18/hr | $1,800/mo (20 hrs/wk) |
| CRM & Data Governance | $10–15/hr | Project: $300–800 |
| AI SOP Engineering | Base Project | Project: $200–600 |

Rates remain open to alignment based on project criteria. Let us know what you are currently building!`,

            availability: `📍 **Timezone Mapping:** Philippine Standard Time (UTC+8)

🕐 **Standard Window:** Monday–Friday, 8AM–6PM PHT

🌐 **Adaptability:** Full coverage for US/EU operations overlap schedules.

✅ **Open to:** Retainer contracts, full-time system integration projects, or corporate virtual coordination.`,

            contact: `You can route project messages straight to Japhette via:

📧 **Email:** jap.pulido789@gmail.com
📱 **Viber Connection:** 09569027896
💼 **LinkedIn Profile:** linkedin.com/in/japhette-alec-pulido

Alternatively, submit an access request via the contact block on this portfolio interface.`,

            tools: `Japhette maintains fluid mastery over standard tech suites:
• **Productivity Ecosystems:** Google Workspace, Microsoft 365, Notion, ClickUp
• **CRM Stacks:** Salesforce, Zendesk, Hubspot
• **Logistical Sync:** TeamViewer, Slack, Discord, Lark, Outlook
• **Development & Design:** Git, GitHub Architecture, SAP Engines, Canva
• **AI Engines:** Prompt systems architecture via ChatGPT, Claude, and Google Gemini.`,

            skills: `Core Operational Competencies:
• Executive Support Performance (98%)
• System Documentation & SOP Layouts (95%)
• CRM Data Cleansing Loops (94%)
• Technical Automation Architecture (92%)
• Fiscal Sheet Dispute Auditing (82%)`,

            resume: `To download a full comprehensive copy of Japhette's system history, click the **"Download Resume"** trigger located in the top presentation fold. Let me know if you would like me to summarize specific parameters!`,

            ai: `Japhette integrates AI protocols directly into workflow designs:
• **AI SOP Engineering** — Deploying prompt logic models to rapidly scale enterprise systems documentation.
• **Prompt Code Audits** — Running diagnostic testing validation sweeps.
• **Dashboard Performance summaries** — Accelerating metrics generation for decision makers.`,

            casestudy: `**Featured Operations Framework: Fit Body Boot Camp**
• **Context:** 10,000 unverified entries, unstructured logs, scheduling overlap issues.
• **Action:** Executed extensive pipeline clean-up scripts, formulated an AI SOP documentation index, and mapped clear time-zone parameters.
• **Deliverable:** Attained a 40% administration drag drop, 100% processing ledger clarity, and 5x faster team onboarding speeds.`,

            hire: `Initiating an engagement is simple:
1. Email your roadmap specs directly to **jap.pulido789@gmail.com**.
2. Suggest an alignment slot alongside your active operational timezone.
3. Response cycles are completed in under 24 hours.`,

            default: `I can detail any of the following procedural layers for you:
• **Experience** — System history and chronologies.
• **Services** — Active operational execution blocks.
• **Rates** — Investment ranges and engagement profiles.
• **Availability** — Active working hours and timezone configurations.
• **Skills & Tools** — Frameworks and technical stacks.

What layer should we unpack next?`
        };

        function getResponse(input) {
            const q = input.toLowerCase().trim();
            if (/experience|background|history|work|career|job|employ|years/.test(q)) return knowledge.experience;
            if (/service|offer|do you do|can you do|help with|provide/.test(q)) return knowledge.services;
            if (/rate|price|cost|charge|fee|hour|retainer|budget|afford/.test(q)) return knowledge.rates;
            if (/available|timezone|time zone|hours|when|schedule|free/.test(q)) return knowledge.availability;
            if (/contact|reach|email|phone|viber|linkedin|talk|message|call/.test(q)) return knowledge.contact;
            if (/tool|platform|software|app|use|tech|stack/.test(q)) return knowledge.tools;
            if (/skill|proficien|expert|good at|capable|competen/.test(q)) return knowledge.skills;
            if (/resume|cv|download|pdf|document/.test(q)) return knowledge.resume;
            if (/ai|artificial|gemini|chatgpt|claude|automat|prompt/.test(q)) return knowledge.ai;
            if (/case|study|project|example|result|achieve|success|fit body|fbbc/.test(q)) return knowledge.casestudy;
            if (/hire|work with|engage|start|begin|onboard|contract/.test(q)) return knowledge.hire;
            if (/hello|hi|hey|good morning|good afternoon|good evening/.test(q)) {
                return `Hey there! 👋 Welcome to Japhette's portfolio workspace. I'm here to answer any queries about his professional capabilities or operational background. What would you like to explore?`;
            }
            if (/thank|thanks|appreciate/.test(q)) {
                return `Always a pleasure! 😊 Let me know if there are any other operations indices you need pulled.`;
            }
            if (/bye|goodbye|see you|later/.test(q)) {
                return `Thank you for stopping by the operations terminal! Feel free to drop an email to jap.pulido789@gmail.com at your convenience. Have an exceptional day! 👋`;
            }
            return knowledge.default;
        }

        function addMessage(text, isUser = false) {
            const msg = document.createElement('div');
            msg.className = `jp-msg ${isUser ? 'jp-msg-user' : 'jp-msg-bot'}`;
            msg.innerHTML = `<p>${formatMessage(text)}</p>`;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function formatMessage(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
        }

        function toggleChat() {
            const isOpen = chatWindow.classList.contains('open');
            chatWindow.classList.toggle('open');
            iconOpen.style.display = isOpen ? 'block' : 'none';
            iconClose.style.display = isOpen ? 'none' : 'block';
            if (!isOpen) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }

        chatToggle.addEventListener('click', toggleChat);
        chatMinimize.addEventListener('click', toggleChat);

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = chatInput.value.trim();
            if (!query) return;

            addMessage(query, true);
            chatInput.value = '';

            setTimeout(() => {
                const response = getResponse(query);
                addMessage(response);
            }, 300 + Math.random() * 300);
        });

        chatSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('jp-suggestion')) {
                const query = e.target.dataset.query;
                addMessage(query.charAt(0).toUpperCase() + query.slice(1), true);

                setTimeout(() => {
                    const response = knowledge[query] || knowledge.default;
                    addMessage(response);
                }, 300 + Math.random() * 300);
            }
        });
    })();
});
