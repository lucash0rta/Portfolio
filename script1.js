const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 10;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'black';
this.element = document.getElementById('caption').getBoundingClientRect();
console.log(this.element);

const imageFiles = ['renderPersonal.png', 'uberGame.png', 'insta.png', 'DaveCourt.png', 'cyberFeminism.png', 'speculativeFuture.png', 'draining.png', 'logo.png', 'ThreeDMe.png', 'paradiseClub.png', 'mediaPlayer.png'];
const imageLinks = {
    insta: "https://www.instagram.com/_lucashorta_/",
    DaveCourt: "https://lucash0rta.github.io/im2350/Portfolio/Houseparty.html",
    uberGame: "https://www.youtube.com/",
    cyberFeminism: "https://lucash0rta.github.io/im2350/Portfolio/Cyberfeminism.html",
    ThreeDMe: "https://lucash0rta.github.io/im2350/Portfolio/3dme.html",
    speculativeFuture: "https://www.google.com/maps",
    mediaPlayer: "https://lucash0rta.github.io/im2350/a2/e4/index.html",
    uberGame: "https://www.google.com/maps"
}
let testString = "insta.png"

let currentLink;

const selectedImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

const image = new Image();
image.src = selectedImageFile;

image.onload = () => {};

class Particle {
    constructor(effect) {
        this.effect = effect;
        this.size = 80;
        this.x = this.size + Math.random() * (this.effect.width - this.size * 2);
        this.y = this.size + Math.random() * (this.effect.height - this.size * 2);
        this.vx = Math.random() * 2 - 2;
        this.vy = Math.random() * 2 - 2;
        this.collided = false;
        this.attractForce = 0.1;
        this.hovered = false;
        this.imageSrc = imageFiles.pop();
        this.rectCollided = false;
    }

    draw(context) {
        context.fillStyle = 'gradient';
        context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    
        const size = this.hovered ? this.size * 3 : this.size;
        const image = new Image();
        image.src = this.imageSrc;
        const aspectRatio = image.width / image.height;
        let imgWidth = size;
        let imgHeight = size / aspectRatio;
        context.drawImage(image, this.x - imgWidth / 2, this.y - imgHeight / 2, imgWidth, imgHeight);
    }

    update() {
        
        const dx = this.x - this.effect.mouse.x;
        const dy = this.y - this.effect.mouse.y;
        const distance = Math.hypot(dx, dy);
        const force = this.effect.mouse.radius / distance;
        
        if (distance < this.effect.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * 0;
            this.y += Math.sin(angle) * 0;        
        }

        if (this.hovered) {
            this.vx = 0; 
            this.vy = 0; 
            console.log(this.imageSrc)
            currentLink = imageLinks[this.imageSrc.replace('.png', '')]
        } else {
            const centerX = this.effect.width / 2;
            const centerY = this.effect.height / 2;
            const dxCenter = centerX - this.x;
            const dyCenter = centerY - this.y;
            const distanceCenter = Math.hypot(dxCenter, dyCenter);
            const forceX = dxCenter / distanceCenter;
            const forceY = dyCenter / distanceCenter;

            this.vx += forceX * this.attractForce;
            this.vy += forceY * this.attractForce;
            

            for (const particle of this.effect.particles) {
                if (particle !== this) {
                    const dx = this.x - particle.x;
                    const dy = this.y - particle.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < (this.size + particle.size) / 2) {
                        const angle = Math.atan2(dy, dx);
                        const overlap = (this.size + particle.size) / 2 - distance;

                        this.x += Math.cos(angle) * overlap * 0.5;
                        this.y += Math.sin(angle) * overlap * 0.5;

                        if (!this.collided) {
                            this.vx *= 0.995; 
                            this.vy *= 0.995; 
                            this.collided = true;
                        }
                    } else {
                        this.collided = false;
                    }
                }
            }
        }

        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > this.effect.width) {
            this.vx *= -1;
        }
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > this.effect.height) {
            this.vy *= -1;
        }}
    }


if (this.x < this.size / 2) {
    this.x = this.size / 2;
    this.vx *= -0.5;
} else if (this.x > this.effect.width - this.size / 2) {
    this.x = this.effect.width - this.size / 2;
    this.vx *= -0.5;
}
if (this.y < this.size / 2) {
    this.y = this.size / 2;
    this.vy *= -0.5;
} else if (this.y > this.effect.height - this.size / 2) {
    this.y = this.effect.height - this.size / 2;
    this.vy *= -0.5;
}

this.x += this.vx;
this.y += this.vy;


reset() {
    this.x = this.size + Math.random() * (this.effect.width - this.size * 2);
    this.y = this.size + Math.random() * (this.effect.height - this.size * 2);
}


class Effect {
constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = imageFiles.length;
    this.createParticles();

    this.mouse = {
        x: 0,
        y: 0,
    }

    window.addEventListener('resize', e => {
        this.resize(window.innerWidth, window.innerHeight);
        this.element = document.getElementById('caption').getBoundingClientRect();
    });

    canvas.addEventListener('mousemove', (e) => {
        const canvasRect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;
        
        for (const particle of effect.particles) {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.hypot(dx, dy);
            
            if (distance < particle.size / 2 && !particle.hovered) {
                particle.hovered = true;
                document.body.style.cursor = "pointer";
            } else if (distance >= particle.size / 2 && particle.hovered) {
                particle.hovered = false;
                document.body.style.cursor = "auto";
            }
        }
    });
}

createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this));
    }
}

handleParticles(context) {
    this.particles.forEach(particle => {
        particle.draw(context);
        particle.update();
        
    });
    function drawRectangle() {
}

}

resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.context.fillStyle = 'blue';
    const gradient = this.context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(1, 'white');
    this.context.fillStyle = gradient;
    this.context.strokeStyle = 'grey';
    this.particles.forEach(particle => {
        particle.reset();
        
    })
}
}

const effect = new Effect(canvas, ctx);

function animate() {
ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
effect.handleParticles(ctx);
requestAnimationFrame(animate);
}
animate();

canvas.addEventListener('mousemove', e => {
for (const particle of effect.particles) {
    const dx = particle.x - e.clientX;
    const dy = particle.y - e.clientY;
    const distance = Math.hypot(dx, dy);
    if (distance < particle.size / 2) {
        particle.hovered = true;
    } else {
        particle.hovered = false;
    }
}
});

canvas.addEventListener('click', () => {
for (const particle of effect.particles) {
    if (particle.hovered && particle.imageSrc) {
        const link = imageLinks[particle.imageSrc.replace('.png', '')];
        if (link) {
            window.location.href = link;
        }
    }
}
});

