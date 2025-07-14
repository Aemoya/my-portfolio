/*
This JavaScript file (scripts/mobile-menu.js) is responsible for controlling the
toggle behavior of the mobile navigation menu. It handles showing and hiding
the menu when the hamburger icon is clicked, and also manages the animation
of the hamburger icon itself.
*/

// --- DOM Element Selection ---
// It's good practice to get references to the HTML elements we'll be interacting with
// as soon as the DOM (Document Object Model) is ready.

// Select the hamburger icon button.
// `document.querySelector()` returns the first element that matches the specified CSS selector.
// We're looking for an element with the class 'hamburger-icon'.
const hamburgerIcon = document.querySelector('.hamburger-icon');

// Select the mobile navigation menu.
// We're looking for an element with the ID 'mobileMenu'.
// Using `getElementById` is often slightly more performant for IDs.
const mobileMenu = document.getElementById('mobileMenu');

// --- State Management ---
// A variable to keep track of whether the menu is currently open or closed.
// This helps in toggling its state correctly.
let isMenuOpen = false;

// --- Event Listener Setup ---
// We attach an event listener to the hamburger icon.
// This function will be executed whenever the 'click' event occurs on the hamburgerIcon element.
hamburgerIcon.addEventListener('click', () => {
    // When the hamburger icon is clicked, we call the `toggleMobileMenu` function.
    toggleMobileMenu();
});

// --- Core Function: toggleMobileMenu ---
/*
This function is responsible for:
1. Toggling the 'is-active' class on the hamburger icon for its animation.
2. Toggling the 'is-open' class on the mobile menu for its visibility and slide animation.
3. Updating the `aria-expanded` attribute for accessibility.
*/
function toggleMobileMenu() {
    // Toggle the 'is-active' class on the hamburger icon.
    // `classList.toggle()` adds the class if it's not present, and removes it if it is.
    // This class triggers the CSS animation to transform the hamburger into an 'X' (close icon).
    hamburgerIcon.classList.toggle('is-active');

    // Toggle the 'is-open' class on the mobile menu.
    // This class controls the `max-height` property in CSS, creating the slide-down/up effect.
    mobileMenu.classList.toggle('is-open');

    // Update the `isMenuOpen` state variable.
    // This flips the boolean value: if true, it becomes false; if false, it becomes true.
    isMenuOpen = !isMenuOpen;

    // Update the `aria-expanded` attribute for accessibility.
    // Screen readers use this attribute to inform users whether the menu is currently expanded.
    // We set it to 'true' if the menu is open, and 'false' if it's closed.
    hamburgerIcon.setAttribute('aria-expanded', isMenuOpen);
}

// --- Optional: Close menu when a navigation link is clicked ---
// This enhances user experience by automatically closing the menu after a selection is made.

// Select all navigation links within the mobile menu.
// `querySelectorAll()` returns a NodeList (similar to an array) of all matching elements.
const navLinks = mobileMenu.querySelectorAll('.nav-list a');

// Loop through each navigation link.
navLinks.forEach(link => {
    // Add a click event listener to each link.
    link.addEventListener('click', () => {
        // If the menu is currently open, close it.
        // We check `isMenuOpen` to avoid trying to close an already closed menu,
        // although `toggleMobileMenu` handles this gracefully, it's good practice.
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// --- Optional: Close menu when clicking outside (for larger screens or general usability) ---
// This is a common pattern for dropdowns.

// Add a click event listener to the entire document.
document.addEventListener('click', (event) => {
    // Check if the menu is open AND the click did NOT originate from inside the menu
    // AND the click did NOT originate from the hamburger icon itself.
    // `mobileMenu.contains(event.target)` checks if the clicked element is inside the mobileMenu.
    // `hamburgerIcon.contains(event.target)` checks if the clicked element is inside the hamburgerIcon.
    if (isMenuOpen && !mobileMenu.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        // If all conditions are met, close the menu.
        toggleMobileMenu();
    }
});

// --- Optional: Handle window resize ---
// If the window is resized to a desktop view while the mobile menu is open,
// it should automatically close to prevent layout issues.

// Add a resize event listener to the window.
window.addEventListener('resize', () => {
    // Get the current width of the viewport.
    const viewportWidth = window.innerWidth;

    // Define the breakpoint at which the mobile menu should typically be hidden by CSS.
    // This should match the `min-width` in your CSS media query (e.g., 768px).
    const breakpoint = 768;

    // If the viewport width is greater than or equal to the breakpoint AND the menu is currently open,
    if (viewportWidth >= breakpoint && isMenuOpen) {
        // Close the mobile menu.
        toggleMobileMenu();
    }
});
