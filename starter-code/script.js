// hamburger menu //

const menuToggle = document.getElementById('menuToggle');
        const menuOverlay = document.getElementById('menuOverlay');
        let isOpen = false;

        menuToggle.addEventListener('click', () => {
            isOpen = !isOpen;
            
            if (isOpen) {
                menuOverlay.classList.add('active');
                menuToggle.src = 'assets/shared/icon-close.svg';
                menuToggle.alt = 'close';
            } else {
                menuOverlay.classList.remove('active');
                menuToggle.src = 'assets/shared/icon-hamburger.svg';
                menuToggle.alt = 'open';
            }
        });

        // Close menu when clicking on a menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuToggle.src = 'assets/shared/icon-hamburger.svg';
                menuToggle.alt = 'open';
                isOpen = false;
            });
     






        //Menu active states + destination//

// Get current page filename
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Function to set active menu item for main navigation
function setActiveMenuItem() {
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    allMenuItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // Check if current page is a destination page
        const isDestinationPage = currentPage.startsWith('destination-');
        
        // Mark destination nav as active if on any destination page
        if (isDestinationPage && href === 'destination-moon.html') {
            item.classList.add('active');
        } 
        // Otherwise check for exact match
        else if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Function to set active planet
function setActivePlanet() {
    const planetLinks = document.querySelectorAll('.planets-list a');
    
    planetLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Set active states on page load
setActiveMenuItem();
setActivePlanet();

// Handle hamburger menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        
        if (menuOverlay.classList.contains('active')) {
            menuToggle.src = 'assets/shared/icon-close.svg';
        } else {
            menuToggle.src = 'assets/shared/icon-hamburger.svg';
        }
    });
}

// Optional: Add swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const planets = ['destination-moon.html', 'destination-mars.html', 'destination-europa.html', 'destination-titan.html'];
    const currentIndex = planets.indexOf(currentPage);
    
    if (currentIndex === -1) return;
    
    // Swipe left (next planet)
    if (touchEndX < touchStartX - 50 && currentIndex < planets.length - 1) {
        window.location.href = planets[currentIndex + 1];
    }
    
    // Swipe right (previous planet)
    if (touchEndX > touchStartX + 50 && currentIndex > 0) {
        window.location.href = planets[currentIndex - 1];
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});








// CREW NAVIGATION LOGIC //

// Auto-rotation timer for crew pages
let crewRotationTimer;
const crewPages = ['crew-commander.html', 'crew-pilot.html', 'crew-specialist.html', 'crew-engineer.html'];
const AUTO_ROTATION_DELAY = 12000; // 12 seconds

function setActiveCrewMember() {
    // Check if we're on a crew page
    const isCrewPage = currentPage.startsWith('crew-');
    
    if (!isCrewPage) return;
    
    // Set active progress bar for all versions (mobile, tablet, desktop)
    const allProgressBars = document.querySelectorAll('.progress-bar a');
    
    allProgressBars.forEach(progressBar => {
        const href = progressBar.getAttribute('href');
        const parentDiv = progressBar.parentElement;
        
        if (href === currentPage) {
            parentDiv.classList.add('active');
        } else {
            parentDiv.classList.remove('active');
        }
    });
    
    // Keep "Crew" nav item active on all crew pages
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === 'crew-commander.html') {
            item.classList.add('active');
        }
    });
}

function goToNextCrewMember() {
    const currentIndex = crewPages.indexOf(currentPage);
    
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % crewPages.length;
    window.location.href = crewPages[nextIndex];
}

function startCrewRotation() {
    const isCrewPage = currentPage.startsWith('crew-');
    
    if (!isCrewPage) return;
    
    // Clear any existing timer
    if (crewRotationTimer) {
        clearInterval(crewRotationTimer);
    }
    
    // Start auto-rotation
    crewRotationTimer = window.setTimeout(() => {
        goToNextCrewMember();
    }, AUTO_ROTATION_DELAY);
}

function stopCrewRotation() {
    if (crewRotationTimer) {
        clearTimeout(crewRotationTimer);
    }
}

// Swipe functionality for crew pages
let crewTouchStartX = 0;
let crewTouchEndX = 0;

function handleCrewSwipe() {
    const currentIndex = crewPages.indexOf(currentPage);
    
    if (currentIndex === -1) return;
    
    // Stop auto-rotation when user swipes
    stopCrewRotation();
    
    // Swipe left (next crew member)
    if (crewTouchEndX < crewTouchStartX - 50 && currentIndex < crewPages.length - 1) {
        window.location.href = crewPages[currentIndex + 1];
    }
    // Swipe left from last page (loop to first)
    else if (crewTouchEndX < crewTouchStartX - 50 && currentIndex === crewPages.length - 1) {
        window.location.href = crewPages[0];
    }
    
    // Swipe right (previous crew member)
    if (crewTouchEndX > crewTouchStartX + 50 && currentIndex > 0) {
        window.location.href = crewPages[currentIndex - 1];
    }
    // Swipe right from first page (loop to last)
    else if (crewTouchEndX > crewTouchStartX + 50 && currentIndex === 0) {
        window.location.href = crewPages[crewPages.length - 1];
    }
}

// Touch event listeners for crew swipe
document.addEventListener('touchstart', e => {
    if (currentPage.startsWith('crew-')) {
        crewTouchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', e => {
    if (currentPage.startsWith('crew-')) {
        crewTouchEndX = e.changedTouches[0].screenX;
        handleCrewSwipe();
    }
});

// Manual click on progress bars (stops auto-rotation)
document.querySelectorAll('.progress-bar a').forEach(link => {
    link.addEventListener('click', (e) => {
        stopCrewRotation();
    });
});

// Pause auto-rotation on mouse hover (desktop) or touch (mobile)
document.addEventListener('mouseenter', (e) => {
    if (e.target.closest('.progress-bar') || e.target.closest('.crew-content')) {
        stopCrewRotation();
    }
}, true);

// Resume auto-rotation when mouse leaves
document.addEventListener('mouseleave', (e) => {
    if (e.target.closest('.progress-bar') || e.target.closest('.crew-content')) {
        startCrewRotation();
    }
}, true);

// Initialize crew navigation
setActiveCrewMember();
startCrewRotation();










// TECHNOLOGY NAVIGATION LOGIC //

// Auto-rotation timer for technology pages
let techRotationTimer;
const techPages = ['technology-vehicle.html', 'technology-spaceport.html', 'technology-capsule.html'];
const TECH_AUTO_ROTATION_DELAY = 40000; // 40 seconds 

function setActiveTechnology() {
    // Check if we're on a technology page
    const isTechPage = currentPage.startsWith('technology-');
    
    if (!isTechPage) return;
    
    // Set active button for all versions (mobile, tablet, desktop)
    const allTechButtons = document.querySelectorAll('.btn a');
    
    allTechButtons.forEach(btn => {
        const href = btn.getAttribute('href');
        const parentButton = btn.parentElement;
        
        if (href === currentPage) {
            parentButton.classList.add('active');
        } else {
            parentButton.classList.remove('active');
        }
    });
    
    // Keep "Technology" nav item active on all technology pages
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === 'technology-vehicle.html') {
            item.classList.add('active');
        }
    });
}

function goToNextTechnology() {
    const currentIndex = techPages.indexOf(currentPage);
    
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % techPages.length;
    window.location.href = techPages[nextIndex];
}

function startTechRotation() {
    const isTechPage = currentPage.startsWith('technology-');
    
    if (!isTechPage) return;
    
    // Clear any existing timer
    if (techRotationTimer) {
        clearTimeout(techRotationTimer);
    }
    
    // Start auto-rotation
    techRotationTimer = setTimeout(() => {
        goToNextTechnology();
    }, TECH_AUTO_ROTATION_DELAY);
}

function stopTechRotation() {
    if (techRotationTimer) {
        clearTimeout(techRotationTimer);
    }
}

// Click event listeners for technology buttons (stops auto-rotation)
document.querySelectorAll('.btn a').forEach(link => {
    link.addEventListener('click', (e) => {
        stopTechRotation();
    });
});

// Pause auto-rotation on mouse hover (desktop) or touch (mobile)
document.addEventListener('mouseenter', (e) => {
    if (e.target.closest('.btn') || e.target.closest('.tech-content')) {
        stopTechRotation();
    }
}, true);

// Resume auto-rotation when mouse leaves
document.addEventListener('mouseleave', (e) => {
    if (e.target.closest('.btn') || e.target.closest('.tech-content')) {
        startTechRotation();
    }
}, true);

// Swipe functionality for technology pages (optional enhancement)
let techTouchStartX = 0;
let techTouchEndX = 0;

function handleTechSwipe() {
    const currentIndex = techPages.indexOf(currentPage);
    
    if (currentIndex === -1) return;
    
    // Stop auto-rotation when user swipes
    stopTechRotation();
    
    // Swipe left (next technology)
    if (techTouchEndX < techTouchStartX - 50 && currentIndex < techPages.length - 1) {
        window.location.href = techPages[currentIndex + 1];
    }
    // Swipe left from last page (loop to first)
    else if (techTouchEndX < techTouchStartX - 50 && currentIndex === techPages.length - 1) {
        window.location.href = techPages[0];
    }
    
    // Swipe right (previous technology)
    if (techTouchEndX > techTouchStartX + 50 && currentIndex > 0) {
        window.location.href = techPages[currentIndex - 1];
    }
    // Swipe right from first page (loop to last)
    else if (techTouchEndX > techTouchStartX + 50 && currentIndex === 0) {
        window.location.href = techPages[techPages.length - 1];
    }
}

// Touch event listeners for technology swipe
document.addEventListener('touchstart', e => {
    if (currentPage.startsWith('technology-')) {
        techTouchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', e => {
    if (currentPage.startsWith('technology-')) {
        techTouchEndX = e.changedTouches[0].screenX;
        handleTechSwipe();
    }
});

// Initialize technology navigation
setActiveTechnology();
startTechRotation();




});