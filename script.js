document.addEventListener('DOMContentLoaded', () => {
    const cursorTrail = document.getElementById('cursor-trail');
    const trailElements = [];
    const numTrailElements = 10;
    const trailDelay = 50;

    for (let i = 0; i < numTrailElements; i++) {
        const div = document.createElement('div');
        div.classList.add('trail');
        cursorTrail.appendChild(div);
        trailElements.push(div);
    }

    document.addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;

        trailElements.forEach((el, i) => {
            setTimeout(() => {
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            }, i * trailDelay);
        });
    });
});
