// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Typing effect
const typingText = document.querySelector('.typing-text');
const texts = ['TECH ENTHUSIAST', 'SPORTS LOVER', 'AVID READER', 'PUBLIC SERVANT'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
}

setTimeout(type, 1000);

// Smooth scroll
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 240, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.about-card, .skill-card, .social-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add staggered delays
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.grid-bg');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add glitch effect on hover
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.social-icon');
        icon.style.animation = 'glitch 0.3s';
        setTimeout(() => {
            icon.style.animation = '';
        }, 300);
    });
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                stat.style.animation = 'pulse 1s ease-in-out';
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
// Hacker Matrix Background Effect
const matrix = document.getElementById('matrix');
const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';
const fontSize = 14;
let columns = window.innerWidth / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) drops[i] = 1;

function drawMatrix() {
    let ctx = document.createElement('canvas').getContext('2d');
    matrix.innerHTML = ''; 
    matrix.appendChild(ctx.canvas);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#0F0'; // হ্যাকিং গ্রিন কালার
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }, 33);
}
drawMatrix();
// ব্যাকগ্রাউন্ড মিউজিক অটো-প্লে ফাংশন
const audio = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
const musicControl = document.getElementById("music-control");

// পেজে একবার ক্লিক করলেই মিউজিক বাজবে (ব্রাউজার পলিসির জন্য)
window.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicIcon.className = "fas fa-volume-up";
    }
}, { once: true });

// বাটন দিয়ে মিউজিক অন/অফ করার সুবিধা
musicControl.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicIcon.className = "fas fa-volume-up";
    } else {
        audio.pause();
        musicIcon.className = "fas fa-volume-mute";
    }
});
