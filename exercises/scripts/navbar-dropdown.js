// Neurotically detailed comments for scripts/navbar-dropdown.js

// This script handles the interactivity of the dropdown menu in the navigation bar.
// Specifically, it toggles the visibility of the "More" dropdown when its
// associated button is clicked.

// --- Interaction Behavior: Dropdown Toggle ---

// 1. Get references to the necessary DOM elements.
//    We need the button that triggers the dropdown and the dropdown menu itself.
const dropdownToggle = document.querySelector('.dropdown-toggle');
// document.querySelector() is a method that returns the first Element within the document
// that matches the specified selector (in this case, an element with the class 'dropdown-toggle').
// This button is responsible for opening/closing the dropdown.

const dropdownMenu = document.querySelector('.dropdown-menu');
// This selects the unordered list (<ul>) that contains the dropdown links.
// This is the element whose visibility we will be toggling.

// 2. Check if both elements exist on the page.
//    This is good practice to prevent errors if the HTML elements aren't found
//    (e.g., if the script runs before the HTML is fully loaded, or if the class names are wrong).
if (dropdownToggle && dropdownMenu) {
    // If both elements are found, proceed to add the event listener.

    // 3. Add an event listener to the dropdown toggle button.
    //    An event listener "listens" for a specific event (like a 'click') on an element.
    dropdownToggle.addEventListener('click', function() {
        // addEventListener() takes two arguments:
        //    - The type of event to listen for (e.g., 'click', 'mouseover', 'submit').
        //    - A function (called a "callback function") to execute when the event occurs.

        // Inside this function, 'this' refers to the element on which the event listener was placed (dropdownToggle).

        // 4. Toggle the 'show' class on the dropdown menu.
        //    The classList property returns a DOMTokenList collection of the class attributes of the element.
        //    The toggle() method then adds or removes a specified class from the element's class list.
        //    - If the class is present, it removes it.
        //    - If the class is absent, it adds it.
        //    This is a convenient way to switch between two states (visible/hidden) using CSS.
        dropdownMenu.classList.toggle('show');
        // When 'show' is added, our CSS rules (in navbar-dropdown.css) for `.dropdown-menu.show`
        // will make the menu visible (`display: block`, `opacity: 1`, etc.).
        // When 'show' is removed, the default `.dropdown-menu` styles (hidden) will apply.

        // 5. Update the ARIA attribute for accessibility.
        //    aria-expanded tells assistive technologies (like screen readers) whether the
        //    dropdown content that the button controls is currently visible.
        const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        // Get the current value of the 'aria-expanded' attribute. It's a string, so compare to 'true'.
        dropdownToggle.setAttribute('aria-expanded', !isExpanded);
        // Set 'aria-expanded' to the opposite of its current value.
        // If it was 'true', set it to 'false'. If it was 'false', set it to 'true'.
        // This helps users with screen readers understand the state of the dropdown.
    });

    // 6. Optional: Close the dropdown if a click occurs outside of it.
    //    This provides a better user experience, as users expect dropdowns to close
    //    when they click elsewhere on the page.
    document.addEventListener('click', function(event) {
        // We add another event listener, this time to the entire document.
        // The 'event' object contains information about the click, including 'event.target'
        // which is the actual element that was clicked.

        // Check if the clicked element is NOT the dropdown toggle AND NOT inside the dropdown menu itself.
        // The .contains() method checks if one element is a descendant of another.
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            // If the click was outside both the button and the menu, hide the dropdown.
            if (dropdownMenu.classList.contains('show')) {
                // Only hide if it's currently visible.
                dropdownMenu.classList.remove('show'); // Remove the 'show' class to hide it.
                dropdownToggle.setAttribute('aria-expanded', 'false'); // Update ARIA for accessibility.
            }
        }
    });
} else {
    // If for some reason the elements aren't found (e.g., HTML structure changed),
    // log a message to the console for debugging purposes.
    console.warn("Navbar dropdown elements not found. Check .dropdown-toggle and .dropdown-menu classes.");
}