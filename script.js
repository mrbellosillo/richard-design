document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements
    const nav = document.querySelector('.navbar');
    const indicator = document.getElementById('nav-indicator');
    const links = document.querySelectorAll('.text-wrapper-6');
    const sections = document.querySelectorAll("section, .landing-page");
    const progressBar = document.getElementById("scroll-progress-bar");
    const backToTop = document.getElementById("back-to-top");
    const menuToggle = document.getElementById('menu-toggle');

    // 2. Nav Indicator Function
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // 2. Optimized Nav Indicator
        function moveIndicator(element) {
            if (!element || !indicator) return;
            
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Mobile: Vertical bar on the left of the link
                indicator.style.width = `4px`;
                indicator.style.height = `${element.offsetHeight}px`;
                indicator.style.left = `0px`;
                indicator.style.top = `${element.offsetTop}px`;
            } else {
                // Desktop: Horizontal underline
                indicator.style.width = `${element.offsetWidth}px`;
                indicator.style.height = `2px`;
                indicator.style.left = `${element.offsetLeft}px`;
                indicator.style.top = `auto`; 
            }
            indicator.style.opacity = "1";
        }

// 3. Consolidated Scroll Listener
window.addEventListener('scroll', () => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const landingSection = document.getElementById('landing-page');
    const headerElement = document.querySelector('.header');

    // --- A. Update Progress Bar ---
    if (progressBar) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }

    // --- B. Smart Header Logic (Minimize past Hero) ---
    if (landingSection && headerElement) {
        const landingHeight = landingSection.offsetHeight;
        // If scrolled past the hero section (minus 100px for a smoother transition)
        if (winScroll > landingHeight - 100) {
            headerElement.classList.add('minimized');
        } else {
            headerElement.classList.remove('minimized');
        }
    }

    // --- C. Back to Top Visibility (Using Classes for CSS transitions) ---
    if (backToTop) {
        if (winScroll > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    // --- D. ScrollSpy & Smart Animate Indicator ---
    let currentId = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (winScroll >= sectionTop - 250) {
            currentId = section.getAttribute("id");
        }
    });

    // --- E. The "Hide on Contact" Logic ---
    if (currentId === "contact") {
        if (indicator) indicator.style.opacity = "0";
        links.forEach(l => l.classList.remove("active"));
    } else {
        if (indicator) indicator.style.opacity = "1";
        links.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
                moveIndicator(link);
            }
        });
    }
});

    // 4. Smooth Scrolling & Mobile Menu Close
    const allLinks = document.querySelectorAll('.navbar a');
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                // Close mobile menu
                if (menuToggle) menuToggle.checked = false;
            }
        });
    });

    // 5. Stat Counter (Using Intersection Observer for performance)
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const increment = target / 30; // Snappier count
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));

    // 6. Reveal on Scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // Initial load position
    const initialActive = document.querySelector('.text-wrapper-6.active');
    if (initialActive) moveIndicator(initialActive);

    // --- Add this inside your DOMContentLoaded block ---

// --- 1. 3D TILT EFFECT ---
const tiltButtons = document.querySelectorAll('.tilt-btn');

tiltButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle rotation calculation
        const rotateX = (centerY - y) / 8; 
        const rotateY = (x - centerX) / 8;

        button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// --- 2. RIPPLE EFFECT ---
const rippleButtons = document.querySelectorAll('.ripple-btn');

rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        const rect = this.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        // Clean up previous ripples
        const oldRipple = this.querySelector('.ripple');
        if (oldRipple) oldRipple.remove();

        this.appendChild(circle);
    });
});

// --- MAGNETIC SOCIAL ICONS ---
const magneticItems = document.querySelectorAll('.magnetic-item');

magneticItems.forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Find the center of the icon
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate pull distance (0.3 is a subtle, professional gravity)
        const moveX = (e.clientX - centerX) * 0.3;
        const moveY = (e.clientY - centerY) * 0.3;

        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    item.addEventListener('mouseleave', function() {
        // Snap back to original position
        this.style.transform = `translate(0px, 0px)`;
    });
});

window.addEventListener('scroll', () => {
    // Standard scroll calculation
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle the 'show' class based on scroll depth
    if (backToTop) {
        if (winScroll > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

// Smooth Scroll Functionality
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.querySelectorAll('back-button').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'index.html#projects'; // Goes back to the projects section
    });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('minimized');
  } else {
    header.classList.remove('minimized');
  }
});

const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');

document.querySelectorAll('.image-container').forEach(container => {
    const zoomBtn = container.querySelector('.zoom-btn');
    const stayBtn = container.querySelector('.stay-btn');
    const overlay = container.querySelector('.image-overlay');
    const img = container.querySelector('img');

    // 1. OPEN Lightbox
    zoomBtn.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scrolling
    });

    // Inside your zoomBtn click listener:
   zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('project-7')) {
            lightbox.classList.add('wide-view');
        } else {
            lightbox.classList.remove ('wide-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('project-7-1')) {
            lightbox.classList.add('mobile-view');
        } else {
            lightbox.classList.remove ('mobile-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('project-8-1')) {
            lightbox.classList.add('mobile-view');
        } else {
            lightbox.classList.remove ('mobile-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('cs-2')) {
            lightbox.classList.add('mobile-view');
        } else {
            lightbox.classList.remove ('mobile-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('cs-3d')) {
            lightbox.classList.add('wide-view');
        } else {
            lightbox.classList.remove ('wide-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        
        // --- NEW LOGIC FOR PROJECT 7 ---
        if (container.classList.contains('cs-3m')) {
            lightbox.classList.add('mobile-view');
        } else {
            lightbox.classList.remove ('mobile-view');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    // 2. STAY (Hide overlay temporarily)
    stayBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });

    // Reset overlay when mouse leaves
    container.addEventListener('mouseleave', () => {
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
    });
});

document.querySelectorAll('.image-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Only trigger the "whole container click" on mobile/tablet
        if (window.innerWidth <= 1024) {
            const img = container.querySelector('img');
            const lightbox = document.getElementById('lightbox-overlay');
            const lightboxImg = document.getElementById('lightbox-img');

            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                
                // Keep your existing wide-view/mobile-view logic here
                lightbox.classList.remove('wide-view', 'mobile-view');
                if (container.classList.contains('project-7') || container.classList.contains('cs-3d')) {
                    lightbox.classList.add('wide-view');
                } else if (container.classList.contains('project-7-1') || container.classList.contains('cs-3m')) {
                    lightbox.classList.add('mobile-view');
                }

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

document.querySelectorAll('.image-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Only trigger the "Full Area" tap on mobile devices
        if (window.innerWidth <= 1024) {
            // Find the image inside this container
            const img = container.querySelector('img');
            const lightbox = document.getElementById('lightbox-overlay');
            const lightboxImg = document.getElementById('lightbox-img');

            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                
                // Clear previous views and add mobile logic
                lightbox.classList.remove('wide-view', 'mobile-view');
                
                // If the container is a mobile-specific screenshot (like your OJT dashboard)
                if (container.classList.contains('mobile-version') || 
                    container.classList.contains('project-7-1')) {
                    lightbox.classList.add('mobile-view');
                }

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

// 3. CLOSE Lightbox
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
};

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox(); // Close if clicking background
});

document.addEventListener('DOMContentLoaded', () => {
    // Apply enter animation immediately
    document.body.classList.add('page-enter');

    const navLinks = document.querySelectorAll('.page-indicator a, .back-button, .mini-cards-grid a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const destination = this.getAttribute('href') || 'index.html';
            
            // Don't trigger for hash links or Lightbox
            if (destination.startsWith('#')) return;

            e.preventDefault();

            // Determine direction
            // If it's the "Back" button, slide to the right
            if (this.classList.contains('back-button')) {
                document.body.classList.add('page-exit-back');
            } else {
                // Otherwise, assume it's "Next" and slide to the left
                document.body.classList.add('page-exit-next');
            }

            // Small delay to let the animation play before changing URL
            setTimeout(() => {
                window.location.href = destination;
            }, 450);
        });
    });
});

let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX - 100) {
      // Swiped Left -> Go Next Project
      const nextBtn = document.querySelector('.page-indicator a:last-child');
      if (nextBtn) nextBtn.click();
  }
  if (touchendX > touchstartX + 100) {
      // Swiped Right -> Go Previous Project
      const prevBtn = document.querySelector('.page-indicator a:first-child');
      if (prevBtn) prevBtn.click();
  }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
});
});

