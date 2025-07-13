// scripts/accordion.js

// Neurotically Detailed JavaScript Comments:
// This script manages the interactivity of the accordion interface, 
// ensuring only one section is open at a time and handling ARIA attributes 
// for accessibility.

/* INTERACTIVITY BEHAVIOR:
    The script implements an "exclusive" accordion behavior: 
    When a header is clicked, its corresponding content panel expands, 
    and all other currently open panels automatically collapse.
*/

/* ACCESSIBILITY SUPPORT:
    The script toggles the 'aria-expanded' attribute on the buttons and 
    updates the 'data-state' on the content panels. This ensures screen 
    readers are informed about the current state of the accordion.
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all accordion buttons.
    // We target buttons within elements that have the class 'accordion-header'. 
    // These are the elements the user interacts with.
    const accordionButtons = document.querySelectorAll('.accordion-header button');

    // 2. Define the main click handler function for the accordion.
    function handleAccordionClick(event) {
        // 'event.currentTarget' refers to the button that was clicked.
        const clickedButton = event.currentTarget;
        
        // Find the associated content panel for the clicked button.
        // We use the 'aria-controls' attribute on the button to get the ID 
        // of the content panel it controls.
        const contentId = clickedButton.getAttribute('aria-controls');
        const contentPanel = document.getElementById(contentId);

        // Determine the current state of the clicked button.
        const isExpanded = clickedButton.getAttribute('aria-expanded') === 'true';

        // 3. Exclusive Accordion Logic (Collapse all others, expand the clicked one)

        // Iterate through ALL accordion buttons.
        accordionButtons.forEach(button => {
            const currentContentId = button.getAttribute('aria-controls');
            const currentContentPanel = document.getElementById(currentContentId);

            // Check if the current button is the one that was clicked.
            if (button === clickedButton) {
                // If it's the clicked button, toggle its state.
                // If it was expanded, collapse it. If it was collapsed, expand it.
                
                if (isExpanded) {
                    // Case A: The clicked button was already expanded. 
                    // We need to collapse it.
                    
                    // Update ARIA for accessibility: Set aria-expanded to false.
                    button.setAttribute('aria-expanded', 'false');
                    
                    // Update data-state for CSS/JS: Set to 'collapsed'.
                    currentContentPanel.setAttribute('data-state', 'collapsed');
                    
                    // Optional: If CSS relies on height=0 and transitions (recommended), 
                    // this data-state update handles the visual collapse.
                } else {
                    // Case B: The clicked button was collapsed. 
                    // We need to expand it.

                    // Update ARIA: Set aria-expanded to true.
                    button.setAttribute('aria-expanded', 'true');
                    
                    // Update data-state: Set to 'expanded'. This triggers the CSS animation.
                    currentContentPanel.setAttribute('data-state', 'expanded');
                }
            } else {
                // If it's NOT the clicked button, ensure it is collapsed.
                
                // Only collapse if it is currently expanded.
                if (button.getAttribute('aria-expanded') === 'true') {
                    // Update ARIA: Collapse the button.
                    button.setAttribute('aria-expanded', 'false');
                    
                    // Update data-state: Collapse the content panel.
                    currentContentPanel.setAttribute('data-state', 'collapsed');
                }
            }
        });
    }

    // 4. Attach Event Listeners to all buttons.
    // We loop through the list of buttons and add a 'click' event listener to each one.
    accordionButtons.forEach(button => {
        button.addEventListener('click', handleAccordionClick);
    });

    // 5. Initial state setup (Optional, but ensures consistency)
    // When the page loads, ensure all content panels have the correct 
    // initial data-state corresponding to their aria-expanded="false" state in HTML.
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.setAttribute('data-state', 'collapsed');
    });
});