document.addEventListener('DOMContentLoaded', (event) => {
    const backgroundAnimation = document.querySelector('.background-animation');
    
    function updateBackground() {
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = (hue1 + 180) % 360;
        backgroundAnimation.style.background = `linear-gradient(45deg, hsl(${hue1}, 100%, 50%), hsl(${hue2}, 100%, 50%))`;
    }

    setInterval(updateBackground, 5000);

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
});