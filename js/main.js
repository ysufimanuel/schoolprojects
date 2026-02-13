/**
 * WEBSITE SEKOLAH - JAVASCRIPT UTAMA
 * ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initHeroSlider();
    initStatsCounter();
    initScrollAnimation();
    initBackToTop();
    initCalendar();
    initGallery();
    initFormValidation();
    initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        menuOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Hero Slider
 */
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto slide
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Start slideshow
    startSlideShow();
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statNumbers = statsSection.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    function checkScroll() {
        if (animated) return;

        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            animated = true;
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

/**
 * Scroll Animation
 */
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85) {
                element.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 45px;
        height: 45px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-3px)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });
}

/**
 * Calendar
 */
function initCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;

    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Sample events (in production, this would come from a database)
    const events = {
        '2024-01-15': 'Rapat Guru',
        '2024-01-20': 'Ujian Tengah Semester',
        '2024-01-25': 'Hari Libur Nasional'
    };

    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let html = `
            <div class="calendar-header">
                <h3>${monthNames[month]} ${year}</h3>
                <div class="calendar-nav">
                    <button class="prev-month"><i class="fas fa-chevron-left"></i></button>
                    <button class="next-month"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="calendar-grid">
        `;

        // Day headers
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
        }

        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const hasEvent = events[dateStr];
            
            html += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'event' : ''}" data-date="${dateStr}">${day}</div>`;
        }

        // Next month days
        const remainingDays = 42 - (firstDay + daysInMonth);
        for (let day = 1; day <= remainingDays; day++) {
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        html += '</div>';
        calendarContainer.innerHTML = html;

        // Add event listeners
        calendarContainer.querySelector('.prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });

        calendarContainer.querySelector('.next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });

        // Day click events
        calendarContainer.querySelectorAll('.calendar-day:not(.other-month)').forEach(day => {
            day.addEventListener('click', function() {
                const dateStr = this.getAttribute('data-date');
                if (events[dateStr]) {
                    alert(`Acara pada ${dateStr}: ${events[dateStr]}`);
                }
            });
        });
    }

    generateCalendar(currentMonth, currentYear);
}

/**
 * Gallery Lightbox
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 2rem;
    `;

    lightbox.innerHTML = `
        <button class="lightbox-close" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        "><i class="fas fa-times"></i></button>
        <button class="lightbox-prev" style="
            position: absolute;
            left: 1rem;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
        "><i class="fas fa-chevron-left"></i></button>
        <img src="" alt="Gallery Image" style="max-width: 90%; max-height: 90%; object-fit: contain;">
        <button class="lightbox-next" style="
            position: absolute;
            right: 1rem;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
        "><i class="fas fa-chevron-right"></i></button>
    `;

    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    function openLightbox(index) {
        currentImageIndex = index;
        lightbox.querySelector('img').src = images[index];
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightbox.querySelector('img').src = images[currentImageIndex];
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightbox.querySelector('img').src = images[currentImageIndex];
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not exists
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
                        field.parentElement.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Field ini wajib diisi';
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });

            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailPattern.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Remove error on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Testimonials Slider
 */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const items = slider.querySelectorAll('.testimonial-item');
    if (items.length <= 1) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % items.length;
        showTestimonial(currentIndex);
    }

    // Auto rotate
    setInterval(nextTestimonial, 6000);
    showTestimonial(0);
}

// Initialize testimonials slider
document.addEventListener('DOMContentLoaded', initTestimonialsSlider);

/**
 * Search Functionality
 */
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            // In production, this would search the database
            alert('Mencari: ' + searchTerm);
        }
    });
}

// Initialize search
document.addEventListener('DOMContentLoaded', initSearch);

/**
 * Print Functionality
 */
function printPage() {
    window.print();
}

/**
 * Share Functionality
 */
function sharePage(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link telah disalin ke clipboard!');
        });
    }
}

/**
 * Download Functionality
 */
function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Accordion
 */
function initAccordion() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');

                // Close all items
                accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    });
}

// Initialize accordion
document.addEventListener('DOMContentLoaded', initAccordion);

/**
 * Tab System
 */
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');

    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanels = container.querySelectorAll('.tab-panel');

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active from all
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active to clicked
                this.classList.add('active');
                tabPanels[index].classList.add('active');
            });
        });
    });
}

// Initialize tabs
document.addEventListener('DOMContentLoaded', initTabs);

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/**
 * Sticky Header
 */
function initStickyHeader() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > topBarHeight) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Initialize sticky header
document.addEventListener('DOMContentLoaded', initStickyHeader);

// Console log for debugging
console.log('Website Sekolah - JavaScript Loaded Successfully!');
