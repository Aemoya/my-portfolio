document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Script is running.");

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Mobile menu toggle
    if (mobileMenuButton) { // Check if button exists before adding listener
        mobileMenuButton.addEventListener('click', () => {
            console.log("Hamburger icon clicked!");
            mobileMenu.classList.toggle('hidden');
            console.log(`Mobile menu is now hidden: ${mobileMenu.classList.contains('hidden')}`);
        });
    } else {
        console.error("Mobile menu button not found!");
    }

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                console.log("Mobile menu closed after link click.");
            }
        });
    });

    // Contact Form Submission (Placeholder - client-side only)
    // This part will only execute if the current page is contact.html
    if (contactForm) { // Check if form exists before adding listener
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Contact form submitted (client-side simulation).");
            // In a real application, you would send this data to a backend server.
            // For this prototype, we'll just simulate success.
            formMessage.classList.remove('hidden', 'text-red-500');
            formMessage.classList.add('text-[#B3B34D]');
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.reset(); // Clear the form
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000); // Hide message after 5 seconds
        });
    } else {
        console.log("Contact form not found on this page.");
    }
});
