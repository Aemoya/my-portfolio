document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close-button");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Function to open the modal
    function openModal(imageSrc) {
        modal.style.display = "flex"; // Show the modal and use flex for centering
        modalImage.src = imageSrc;
    }

    // Add click listeners to all gallery images
    galleryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Get the full image source from the data-full-src attribute
            const fullImageSrc = item.getAttribute('data-full-src');
            openModal(fullImageSrc);
        });
    });

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        modalImage.src = ""; // Clear image source for potential optimization
    }

    // Close modal when the close button (X) is clicked
    closeButton.addEventListener('click', closeModal);

    // Close modal when the user clicks anywhere on the dimmed background overlay, 
    // ensuring clicks on the image itself do not close the modal.
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Optional: Close modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === "flex") {
            closeModal();
        }
    });
});