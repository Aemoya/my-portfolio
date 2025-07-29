// Tailwind mobile menu toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
  // Start hidden
  mobileMenu.classList.add('hidden');
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
