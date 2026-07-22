// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const tabEl = document.getElementById(tabName + '-tab');
        if (tabEl) {
            tabEl.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Music Control
const musicControl = document.getElementById('musicControl');
let isMusicPlaying = true;

window.addEventListener('load', () => {
    console.log('🎮 VoidedClient Website Loaded');
    console.log('🎵 Music: Misery by Pupsies - UNMUTED');
    playMusicUnmuted();
});

function playMusicUnmuted() {
    const musicIframe = document.createElement('iframe');
    musicIframe.style.display = 'none';
    musicIframe.style.width = '0';
    musicIframe.style.height = '0';
    musicIframe.src = 'https://www.youtube.com/embed/hXCIH5VTWyg?autoplay=1&loop=1&playlist=hXCIH5VTWyg&controls=0&mute=0';
    musicIframe.allow = 'autoplay';
    document.body.appendChild(musicIframe);
    
    isMusicPlaying = true;
    updateMusicIcon();
}

musicControl.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;
    updateMusicIcon();
    if (isMusicPlaying) {
        playMusicUnmuted();
    }
});

function updateMusicIcon() {
    if (isMusicPlaying) {
        musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicControl.style.animation = 'pulse 1s infinite';
    } else {
        musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicControl.style.animation = 'none';
    }
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Navigation Active State
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
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

console.log('✅ VoidedClient Website Ready');
console.log('🎮 28 Modules Loaded');
console.log('🎵 Music UNMUTED - Autoplay Enabled');
