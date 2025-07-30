// Tailwind mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton) {
    console.warn('Mobile menu button not found.');
    return;
  }
  if (!mobileMenu) {
    console.warn('Mobile menu element not found.');
    return;
  }

  // Start hidden and invisible
  mobileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('opacity-100');
    if (isOpen) {
      mobileMenu.classList.remove('opacity-100', 'scale-100');
      mobileMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    } else {
      mobileMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'scale-100');
    }
  });
});
