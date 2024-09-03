document.addEventListener('DOMContentLoaded', () => {
    const projectRows = document.querySelectorAll('.project-row');
    const imageContainer = document.getElementById('imageContainer');

    function closeAllDetails(exceptThis) {
        projectRows.forEach(row => {
            const detailsDiv = row.nextElementSibling;
            if (detailsDiv !== exceptThis && detailsDiv.style.display === 'block') {
                detailsDiv.style.opacity = '0';
                detailsDiv.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    detailsDiv.style.display = 'none';
                }, 500);
            }
        });
    }

    projectRows.forEach(row => {
        row.addEventListener('click', () => {
            const detailsDiv = row.nextElementSibling;
            if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
                closeAllDetails(detailsDiv);
                detailsDiv.style.display = 'block';
                setTimeout(() => {
                    detailsDiv.style.opacity = '1';
                    detailsDiv.style.transform = 'translateY(0)';
                }, 50);
            } else {
                detailsDiv.style.opacity = '0';
                detailsDiv.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    detailsDiv.style.display = 'none';
                }, 500);
            }
        });

        row.addEventListener('mouseenter', () => {
            const img = document.createElement('img');
            img.src = row.dataset.image;
            img.alt = row.querySelector('.project-title').textContent;
            img.classList.add('project-image');
            imageContainer.appendChild(img);
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'translateY(0)';
            }, 50);
        });

       /*  row.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const imgs = imageContainer.querySelectorAll('.project-image');
                imgs.forEach(img => {
                    img.style.opacity = '0';
                    img.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        img.remove();
                    }, 3000);
                });
            }, 6000); // 6 seconds delay
        }); */
    });
});


// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Changes to position and z-index for the renderer's DOM element
renderer.domElement.style.position = 'fixed';  // Make the three.js canvas fixed
renderer.domElement.style.top = '50%';        // Center it vertically
renderer.domElement.style.left = '50%';       // Center it horizontally
renderer.domElement.style.transform = 'translate(-50%, -50%)';  // Ensure proper centering
renderer.domElement.style.zIndex = '-5';      // Send it behind all other content

document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);  // Set background to white

// Add a test cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// Set up light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0);
scene.add(light);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.95); // Slightly dimmer to create depth
fillLight.position.set(-10, 5, 10); // Position it on the opposite side of the key light
scene.add(fillLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Dim ambient light

// Set up emissive ball
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0xffffaa,
    emissiveIntensity: 5,
    shininess: 100
});

const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 5, 0);
scene.add(ball);

// Load animated 3D model
const loader = new THREE.GLTFLoader();
let mixer;
loader.load('2d_Sculpt_Test_anim_decimated.glb', (gltf) => {
    const model = gltf.scene;

        // Scale the model
        const scaleFactor = 0.5; // Adjust this value to change the scale
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
    scene.add(model);

// Set up animation
mixer = new THREE.AnimationMixer(model);
const clips = gltf.animations;
if (clips && clips.length > 0) {
    clips.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
    });
}

}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

// Set initial camera position
camera.position.z = 70;
camera.position.y = -1;

// Animation variables
let time = 0;
const cameraRadius = 2; // Reduce the camera radius for less movement
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    time += 0.002; // Slow down the time increment for a slower animation

    // Update animation mixer
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }

    // Move the camera in and out slightly
    camera.position.z = Math.sin(time) * cameraRadius + 8; // +5 to keep it close to the initial position

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
