/* File: scripts/modal.js
    
    This script handles the interactive behavior of the modal popup. 
    It manages opening the modal when the thumbnail is clicked and closing it via the close button or clicking outside the image.
*/

// NAMED COMMENTS:
// INTERACTION BEHAVIOR:
// 1. Open Modal: When the 'thumbnail-trigger' button is clicked, the 'active' class is added to the 'imageModal' element.
// 2. Close Modal (Button): When the 'close-button' is clicked, the 'active' class is removed from 'imageModal'.
// 3. Close Modal (Outside Click): When the 'modal' container (which includes the overlay) is clicked, if the click target is the modal container itself (and not the content inside it), the modal is closed.

document.addEventListener('DOMContentLoaded', (event) => {
    // We wrap all JavaScript execution in 'DOMContentLoaded'. This ensures that the HTML document (DOM) 
    // is fully parsed and loaded before we try to select and manipulate any elements.

    // 1. Select the necessary elements from the HTML using their IDs.
    const modal = document.getElementById('imageModal');
    // This is the main modal container element.
    
    const openButton = document.getElementById('openModalButton');
    // This is the button that serves as the thumbnail trigger.
    
    const closeButton = document.getElementById('closeModalButton');
    // This is the 'X' button inside the modal used to close it.

    // --- Modal Open Functionality ---
    
    if (openButton) {
        // We check if the openButton element exists before adding an event listener to prevent errors.
        openButton.addEventListener('click', () => {
            // Add an event listener for the 'click' event on the thumbnail button.
            
            // When clicked, we add the 'active' class to the modal element.
            // This 'active' class in CSS (css/modal.css) changes the modal's display property from 'none' to 'flex', making it visible.
            modal.classList.add('active');

            // Optional: You might want to prevent the body from scrolling when the modal is open.
            // document.body.style.overflow = 'hidden'; 
        });
    }

    // --- Modal Close Functionality (Button) ---
    
    if (closeButton) {
        // Check if the closeButton element exists.
        closeButton.addEventListener('click', () => {
            // Add an event listener for the 'click' event on the close button.
            
            // When clicked, we remove the 'active' class from the modal.
            // This hides the modal again based on the CSS rules.
            modal.classList.remove('active');

            // Optional: Restore scrolling on the body.
            // document.body.style.overflow = 'auto';
        });
    }

    // --- Modal Close Functionality (Outside Click) ---
    
    if (modal) {
        // Check if the modal element exists.
        modal.addEventListener('click', (event) => {
            // Add an event listener to the entire modal container.
            
            // This is a common pattern for closing modals when clicking the overlay.
            
            // We check if the element that was actually clicked (event.target) 
            // is exactly the modal container itself.
            if (event.target === modal) {
                // If the user clicked on the modal container (the dimmed area), 
                // but NOT on the content (image or button) inside the modal-content div, 
                // then we close the modal.
                modal.classList.remove('active');

                // Optional: Restore scrolling on the body.
                // document.body.style.overflow = 'auto';
            }
        });
    }
});