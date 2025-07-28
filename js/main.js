document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu and overlay selectors (use class for consistency)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('nav a, .nav-link-mobile');
    const pageSections = document.querySelectorAll('.page-section');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Function to show a specific page section
    function showPage(pageId) {
        pageSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
            document.title = `Alexandra Moya Art - ${targetSection.dataset.title}`;
        } else {
            // Show 404 page if target section not found
            document.getElementById('404').classList.remove('hidden');
            document.getElementById('404').classList.add('active');
            document.title = `Alexandra Moya Art - Page Not Found`;
        }
    }

    // Handle initial page load based on URL hash
    const initialHash = window.location.hash.substring(1); // Remove '#'
    if (initialHash) {
        showPage(initialHash);
    } else {
        showPage('home'); // Default to home page
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get ID without '#'
            showPage(targetId);
            // Close mobile menu if open
            if (mobileNavOverlay.classList.contains('open')) {
                mobileNavOverlay.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            }
            // Update URL hash without reloading
            window.history.pushState(null, '', link.getAttribute('href'));
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });

    // Hamburger menu toggle (robust, works for all pages)
    if (hamburgerMenu && mobileNavOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            const isOpen = hamburgerMenu.classList.toggle('open');
            mobileNavOverlay.classList.toggle('open');
            hamburgerMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close overlay when a link is clicked
        mobileNavOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('open');
                mobileNavOverlay.classList.remove('open');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Contact Form Submission (client-side only for demonstration)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        console.log('Contact Form Submission:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('Submission Email:', 'aemoya01@gmail.com');

        // Display a success message (instead of alert)
        formMessage.textContent = 'Thank you for your message! Alexandra will get back to you soon.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('text-secondary-accent'); // Greenish for success

        // Clear the form
        contactForm.reset();

        // Hide message after a few seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });
});