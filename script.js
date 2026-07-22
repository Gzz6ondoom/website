// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.style.transform = 'rotate(0deg)';
    });
});

// Smooth scrolling for navigation links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and social buttons
document.querySelectorAll('.feature-card, .social-btn').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Music Control
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

// Attempt to play music on startup
window.addEventListener('load', () => {
    console.log('🎵 VoidedClient MC Website Loaded');
    console.log('🎵 Music: Misery by Pupsies - Hidden Autoplay');
    
    // Try to play music automatically
    attemptMusicAutoplay();
});

function attemptMusicAutoplay() {
    // Create an iframe to play the YouTube video in the background
    const musicIframe = document.createElement('iframe');
    musicIframe.style.display = 'none';
    musicIframe.width = '0';
    musicIframe.height = '0';
    musicIframe.src = 'https://www.youtube.com/embed/hXCIH5VTWyg?autoplay=1&loop=1&playlist=hXCIH5VTWyg&controls=0';
    musicIframe.allow = 'autoplay';
    document.body.appendChild(musicIframe);
    
    isMusicPlaying = true;
    updateMusicControlIcon();
}

// Music control button
musicControl.addEventListener('click', () => {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function playMusic() {
    attemptMusicAutoplay();
    isMusicPlaying = true;
    updateMusicControlIcon();
    console.log('🎵 Music Playing');
}

function pauseMusic() {
    isMusicPlaying = false;
    updateMusicControlIcon();
    console.log('🔇 Music Paused');
}

function updateMusicControlIcon() {
    if (isMusicPlaying) {
        musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicControl.classList.add('playing');
    } else {
        musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicControl.classList.remove('playing');
    }
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Handle button clicks with feedback
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add some interactive effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(220, 20, 60, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(220, 20, 60, 0.2)';
    });
});

// Responsive font size
function updateFontSize() {
    const width = window.innerWidth;
    if (width < 480) {
        document.documentElement.style.fontSize = '14px';
    } else if (width < 768) {
        document.documentElement.style.fontSize = '15px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
}

updateFontSize();
window.addEventListener('resize', updateFontSize);

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - close menu
        navLinks.classList.remove('active');
        menuToggle.style.transform = 'rotate(0deg)';
    }
}

// Prevent layout shift on scroll
document.documentElement.style.scrollPaddingTop = '70px';

// Log initialization
console.log('✅ VoidedClient MC - Website Fully Initialized');
console.log('📱 Mobile Optimized');
console.log('🎵 Music Hidden Autoplay Enabled');