// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initTypingEffect();
    initScrollSpy();
    initSkillBars();
    initCounters();
    initContactForm();
    initScrollTop();
    
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    }
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typedElement = document.getElementById('typed');
    if (!typedElement) return;
    
    const texts = [
        'Web Developer',
        'PHP Developer',
        'Laravel Specialist',
        'Frontend Developer',
        'Seeking Internship'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isEnd = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            const typeSpeed = isDeleting ? 50 : 100;
            const normalSpeed = Math.random() * typeSpeed + typeSpeed;
            const fastSpeed = Math.random() * 60 + 30;
            setTimeout(type, isEnd ? fastSpeed : normalSpeed);
        }
    }
    
    setTimeout(type, 1000);
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillsSection = document.getElementById('skills');
    
    if (!skillLevels.length || !skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillLevels.forEach(bar => {
                    const width = bar.getAttribute('data-level');
                    bar.style.width = width + '%';
                });
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const aboutSection = document.getElementById('about');
    
    if (!counters.length || !aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            if (current > target) current = target;
                            counter.textContent = Math.floor(current);
                            setTimeout(updateCounter, 16);
                        }
                    };
                    
                    updateCounter();
                });
                observer.unobserve(aboutSection);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // In production, replace with actual AJAX call
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Style the button
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
        transition: all 0.3s ease;
    `;
    
    // Show/hide button
    function toggleScrollTop() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
    
    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleScrollTop);
    toggleScrollTop();
}

// ===== PARTICLES CONFIG =====
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#00d9ff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00d9ff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            }
        },
        retina_detect: true
    });
}