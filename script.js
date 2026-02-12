/**
 * AVSTRALIYA LOYIHASI - ASOSIY JS FAYLI
 * Muallif: Nazarboy
 */

// --- 1. DOM yuklanganda ishga tushadigan funksiyalar ---
document.addEventListener('DOMContentLoaded', function () {
    // AOS (Animate On Scroll) kutubxonasini ishga tushirish
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    // Sliderni birinchi slayd bilan boshlash
    showSlide(0);
});

// --- 2. Tungi reja (Dark Mode) ---
const toggle = document.getElementById('theme-toggle');
if (toggle) {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Ikonkani o'zgartirish (oy/quyosh)
        const icon = toggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });
}

// --- 3. Dengizlar Slideri ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length === 0) return;

    // Index chegarasini tekshirish (tsikl ko'rinishida)
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Aktiv slaydni yangilash
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
}

// Global tugmalar uchun funksiya
window.changeSlide = function (step) {
    showSlide(currentSlide + step);
};

// Avtomatik slayd o'zgarishi (har 5 soniyada)
if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// --- 4. Navbar va Scroll effektlari ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Navbar dizaynini skrolga qarab o'zgartirish
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = "rgba(255, 255, 255, 0.9)";
        navbar.style.boxShadow = "none";
    }

    // AOS ishlamay qolsa, zaxira animatsiyasi
    const sections = document.querySelectorAll('.section-box');
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 600;
        if (top > offset) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
});

// --- 5. Video Modal (Sayt ichida ochish) ---
function playVideo(bird) {
    let videoUrl = "";
    const videoElem = document.getElementById('birdVideo');
    const modalElem = document.getElementById('videoModal');

    if (!videoElem || !modalElem) return;

    // Video manzillarini tanlash (Embed formatida)
    if (bird === 'emu') videoUrl = "https://www.youtube.com/embed/FjIuK7K3N_0";
    else if (bird === 'lira') videoUrl = "https://www.youtube.com/embed/q6E0U6XvKxw";
    else if (bird === 'all') videoUrl = "https://www.youtube.com/embed/R9pI-I9P5iU";

    videoElem.src = videoUrl;
    modalElem.style.display = "block";
    document.body.style.overflow = "hidden"; // Video ochiqligida skrolni to'xtatish
}

function closeVideo() {
    const modalElem = document.getElementById('videoModal');
    const videoElem = document.getElementById('birdVideo');

    if (modalElem) modalElem.style.display = "none";
    if (videoElem) videoElem.src = ""; // Videoni to'xtatish
    document.body.style.overflow = "auto"; // Skrolni qaytarish
}

// --- 6. Tashqi havolada ochish (Zaxira yoki tugmalar uchun) ---
function openBirdVideo(bird) {
    let url = "";
    if (bird === 'emu') url = "https://www.youtube.com/watch?v=4uOshlT-Cpg";
    else if (bird === 'lira') url = "https://www.youtube.com/watch?v=mSB71jNq-yQ";
    else if (bird === 'kukabara') url = "https://www.youtube.com/watch?v=UXA0-YI9B_M";

    if (url) window.open(url, "_blank");
}