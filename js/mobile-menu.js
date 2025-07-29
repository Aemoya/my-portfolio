// Tailwind mobile menu toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
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
}
