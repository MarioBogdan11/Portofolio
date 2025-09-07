// Email copy-to-clipboard and feedback
document.addEventListener('DOMContentLoaded', function() {
    var emailBtn = document.getElementById('email-btn');
    var feedback = document.getElementById('email-feedback');
    if (emailBtn && feedback) {
        emailBtn.addEventListener('click', function(e) {
            // Copy email to clipboard
            var email = 'bogdanmariogg11@gmail.com';
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email);
            } else {
                // fallback for old browsers
                var temp = document.createElement('input');
                temp.value = email;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
            }
            // Show feedback
            feedback.style.display = 'inline-block';
            setTimeout(function() {
                feedback.style.display = 'none';
            }, 1400);
            // Let mailto still work
        });
    }
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - headerHeight - 40;
        if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.substring(1) === current) link.classList.add('active');
    });
});

// Add loading animation
window.addEventListener('load', () => { document.body.classList.add('loaded'); });

// Profile image hover effect enhancement
const profileImage = document.querySelector('.profile-image-wrapper');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => { profileImage.style.transform = 'scale(1.05)'; });
    profileImage.addEventListener('mouseleave', () => { profileImage.style.transform = 'scale(1)'; });
}

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home-section');
    if (parallax) {
        const speed = scrolled * 0.2;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to the name
const nameElement = document.querySelector('.logo h1');
if (nameElement) {
    const name = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < name.length) {
            nameElement.textContent += name.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 300);
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu after clicking a link (mobile)
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (navList.classList.contains('open')) {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));
}

// Reveal-on-scroll using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
} else {
    // Fallback
    revealEls.forEach(el => el.classList.add('visible'));
    // no-op
}

// Toggle header shadow when scrolled
const updateScrolled = () => {
    if (window.scrollY > 8) document.body.classList.add('scrolled');
    else document.body.classList.remove('scrolled');
};
window.addEventListener('scroll', updateScrolled);
window.addEventListener('load', updateScrolled);
