// Theme Toggle Script
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Function to toggle the theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Event Listener for Theme Toggle
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme when the page loads
window.addEventListener('load', initializeTheme);

// Hamburger Menu Script
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
    hamburger.setAttribute('aria-expanded', 
        hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDots = document.querySelector('.slider-dots');

// Create dots
if (testimonialCards.length > 0 && sliderDots) {
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        sliderDots.appendChild(dot);
    });
}

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.slider-dot').forEach(dot => dot.classList.remove('active'));
    
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
        document.querySelectorAll('.slider-dot')[index].classList.add('active');
        currentTestimonial = index;
    }
}

// Testimonial navigation buttons
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    });
}

// Auto-advance testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Donation amount buttons
const amountBtns = document.querySelectorAll('.amount-btn');
amountBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        amountBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Progress bar animation
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = progressFill.getAttribute('data-progress');
                progressFill.style.width = progress + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressObserver.observe(progressFill);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll animations for sections
const animatedElements = document.querySelectorAll('.program-card, .feature-item, .story-card, .event-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
}
