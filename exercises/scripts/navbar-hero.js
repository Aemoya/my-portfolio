// Current time is Wednesday, July 9, 2025 at 11:10:20 AM CDT.
// Current location is Corpus Christi, Texas, United States.

// This JavaScript file (scripts/navbar-hero.js) handles the interactive behavior
// of the dropdown menu in navbar-hero.html.

// INTERACTION BEHAVIOR:
// When the "More" button is clicked:
// 1. The visibility of the dropdown menu is toggled (shown/hidden).
// 2. The `aria-expanded` attribute of the "More" button is toggled
//    between "true" and "false" for accessibility purposes.
// When a click occurs anywhere outside the dropdown menu and the "More" button:
// 1. The dropdown menu is hidden if it's currently open.

document.addEventListener('DOMContentLoaded', () => {
    // This ensures that the JavaScript code only runs after the entire HTML document
    // has been fully loaded and parsed. This is crucial because our script
    // needs to access HTML elements (like the button and dropdown menu),
    // and if it tries to do so before they exist in the DOM, it will result in errors.

    const dropdownToggle = document.getElementById('dropdownMoreButton');
    // Gets a reference to the HTML button element with the ID 'dropdownMoreButton'.
    // This is our "More" button that triggers the dropdown.

    const dropdownMenu = document.querySelector('.dropdown-menu');
    // Gets a reference to the first HTML element with the class 'dropdown-menu'.
    // This is the container for our dropdown links.

    if (dropdownToggle && dropdownMenu) {
        // Checks if both the dropdown toggle button and the dropdown menu
        // were successfully found in the HTML. This prevents errors if the IDs/classes change
        // or if the elements are missing for some reason.

        dropdownToggle.addEventListener('click', (event) => {
            // Adds an event listener to the 'dropdownToggle' button.
            // When this button is clicked, the provided function will be executed.
            // `event` is the event object, containing information about the click.

            event.stopPropagation();
            // `event.stopPropagation()` stops the click event from "bubbling up"
            // to parent elements in the DOM. This is important here because we have
            // a separate listener on the `document` (below) that closes the dropdown.
            // If we didn't stop propagation, clicking the button would immediately
            // re-trigger the document listener and close the dropdown again.

            dropdownMenu.classList.toggle('show');
            // Toggles the 'show' class on the `dropdownMenu` element.
            // - If 'show' is present, it removes it (hiding the menu).
            // - If 'show' is absent, it adds it (showing the menu).
            // The 'show' class in CSS is responsible for applying `display: block`,
            // `opacity: 1`, and `transform: translateY(0)` to make it visible.

            const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            // Checks the current value of the `aria-expanded` attribute.
            // It will be 'true' if the dropdown is currently expanded, 'false' otherwise.

            dropdownToggle.setAttribute('aria-expanded', !isExpanded);
            // Toggles the `aria-expanded` attribute.
            // If `isExpanded` was true, it sets it to false, and vice-versa.
            // This is crucial for accessibility, informing screen readers about the
            // current state of the dropdown.
        });

        document.addEventListener('click', (event) => {
            // Adds a click event listener to the entire HTML document.
            // This listener will be triggered whenever any part of the document is clicked.

            // Checks if the clicked element (event.target) is NOT the dropdown toggle button
            // AND if the clicked element is NOT inside the dropdown menu.
            // `dropdownMenu.contains(event.target)` returns true if `event.target` is
            // a descendant of `dropdownMenu` (i.e., clicked inside the menu).
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                // If the click happened outside both the button and the menu:
                if (dropdownMenu.classList.contains('show')) {
                    // Check if the dropdown menu is currently visible (has the 'show' class).
                    dropdownMenu.classList.remove('show');
                    // If it is, remove the 'show' class to hide it.
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    // Update `aria-expanded` to 'false' for accessibility.
                }
            }
        });
    } else {
        console.warn('Dropdown elements not found. Check your HTML IDs and classes.');
        // Logs a warning to the console if the elements couldn't be found.
        // This is helpful for debugging during development.
    }
});