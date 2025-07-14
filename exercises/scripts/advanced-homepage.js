/*
User Prompt: All styling should be in css/advanced-homepage.css, and all interactive functionality (like the mobile menu) must be in scripts/advanced-homepage.js. Make sure to enforce "neurotically detailed comments" explaining the purpose and reasoning behind every HTML tag, CSS rule and Javascript function. Make sure to include the full prompt as a comment block at the top of the main HTML file.
*/

// Ensure the DOM is fully loaded before executing any JavaScript.
// This prevents errors that might occur if scripts try to access elements that haven't been created yet.
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle Functionality ---

    // Get a reference to the mobile menu button (hamburger icon).
    // The '!' asserts that the element will not be null, useful if you're certain the element exists.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    // Get a reference to the mobile menu dropdown container.
    const mobileMenu = document.getElementById('mobile-menu');

    // Check if both elements exist before adding event listeners to prevent errors.
    if (mobileMenuButton && mobileMenu) {
        // Add a click event listener to the mobile menu button.
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the 'hidden' Tailwind CSS class on the mobile menu.
            // If 'hidden' is present, the menu becomes visible; if not, it becomes hidden.
            mobileMenu.classList.toggle('hidden');
        });

        // Get all navigation links within the mobile menu.
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        // Iterate over each mobile navigation link.
        mobileNavLinks.forEach(link => {
            // Add a click event listener to each link.
            link.addEventListener('click', () => {
                // When a link is clicked, hide the mobile menu.
                // This provides a better user experience, as the menu closes after navigation.
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // --- Scroll Reveal Animation Functionality ---

    // Get all elements that should have the scroll reveal animation.
    // These elements have the class 'scroll-reveal'.
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    // Configure options for the Intersection Observer.
    // The 'root' is the element that is used as the viewport for checking visibility of the target.
    // 'null' means the browser's viewport is used.
    // 'rootMargin' allows you to grow or shrink the root bounding box.
    // '0px 0px -100px 0px' means the animation will trigger when the element is 100px from the bottom of the viewport.
    // This makes the animation appear slightly before the element is fully in view, creating a smoother effect.
    // 'threshold' indicates the percentage of the target element which is visible in the root.
    // '0.1' means 10% of the element must be visible to trigger the callback.
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -100px 0px', // Trigger 100px before reaching the bottom
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Create a new Intersection Observer instance.
    // The callback function will be executed when the visibility of the observed elements changes.
    const observer = new IntersectionObserver((entries, observer) => {
        // Iterate over each 'entry' (observed element).
        entries.forEach(entry => {
            // Check if the element is currently intersecting (i.e., visible in the viewport based on options).
            if (entry.isIntersecting) {
                // If intersecting, add the 'active' class to trigger the CSS animation.
                entry.target.classList.add('active');
                // Stop observing the element once it has animated.
                // This prevents the animation from re-triggering if the user scrolls back and forth.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions); // Pass the defined options to the observer.

    // Iterate over each scroll reveal element and start observing it.
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Scrolling for Navigation Links ---

    // Select all anchor links that point to sections within the same page.
    // This includes links in both desktop and mobile navigation.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Add a click event listener to each anchor link.
        anchor.addEventListener('click', function (e) {
            // Prevent the default jump-to-anchor behavior.
            e.preventDefault();

            // Get the target element's ID from the href attribute (e.g., "#hero" -> "hero").
            const targetId = this.getAttribute('href').substring(1);
            // Get the actual target element using its ID.
            const targetElement = document.getElementById(targetId);

            // Check if the target element exists.
            if (targetElement) {
                // Calculate the offset to account for the fixed header.
                // Get the height of the fixed header.
                const headerOffset = document.querySelector('header').offsetHeight;
                // Calculate the position to scroll to: target element's top position minus header height.
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                // Scroll to the calculated position with smooth behavior.
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
