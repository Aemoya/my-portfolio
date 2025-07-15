// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
});

// Parallax Hero
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    const scrollPosition = window.pageYOffset;
    heroImage.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});
