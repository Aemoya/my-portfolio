document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Contact Form Submission (Placeholder - client-side only)
    // This part will only execute if the current page is contact.html
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
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
    }
});
