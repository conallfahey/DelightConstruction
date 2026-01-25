// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForms = document.querySelectorAll('.contact-form');
    if (contactForms.length) {
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(this);
                
                // Determine required fields based on inputs present
                const nameInput = this.querySelector('[name="name"]');
                const emailInput = this.querySelector('[name="email"]');
                const messageInput = this.querySelector('[name="message"]');
                
                let isValid = true;
                
                if (nameInput && !nameInput.value.trim()) isValid = false;
                if (emailInput && !emailInput.value.trim()) isValid = false;
                if (messageInput && !messageInput.value.trim()) isValid = false;

                // Special case for lead magnet which might only have an email input without name attribute
                // (though good practice is to name it)
                const genericEmail = this.querySelector('input[type="email"]');
                if (!emailInput && genericEmail && !genericEmail.value.trim()) isValid = false;

                if (!isValid) {
                    alert('Please fill in all required fields.');
                    return;
                }

                alert('Thank you! We have received your submission.');
                this.reset();
            });
        });
    }

    // Header background on scroll - removed to keep consistent dark background

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
