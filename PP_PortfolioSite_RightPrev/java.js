const projects = [
    {
        year: '2024',
        title: 'Existential Crisis',
        role: 'Virtual Reality Developer',
        technologies: 'Unity, VR, Sound Design, 3D Modeling',
        description: 'An immersive virtual reality experience exploring themes of existence and perception. Exhibited at ISEA 2024 and ACMI Audience Lab. Collaborated with director Stephanie Andrews from RMIT University. Responsible for sound design, interaction design, XR input programming, 3D modeling & rigging, lighting design, and VFX using Unity\'s VFX Graph.',
        image: 'ExistentialCrisis.png'
    },
    {
        year: '2024',
        title: 'MycoCosm Studio',
        role: 'Creative Coder & Animator',
        technologies: 'Web Development, AI, Conceptual Design',
        description: 'An exploration of non-anthropocentric ways of being, rethinking digital spaces through the lens of mycelial networks. Partnered with RMIT University, Elisava, and London College of Communication. Created websites as digital collages, used AI in concept development, and engaged in rethinking digital communication. To be showcased at Barcelona Design Week in October 2024.',
        image: 'IMG_2212.png'
    },
    {
        year: '2024',
        title: 'Extending Heritage with Hanoi Ad Hoc',
        role: 'Speaker and Presenter',
        technologies: 'VR, 3D Modeling, Digital Twin Creation',
        description: 'Explored how VR and 3D technologies can be used in heritage preservation. Created a VR walkthrough and video essay as part of an RMIT study tour. Developed a digital twin of "The Grid" exhibition at the Gia Lam Train Factory. Presented at ISEA Conference 2024, including a research paper on low-cost photogrammetry methods in dense urban environments.',
        image: 'uberGame.png'
    },
    {
        year: '2024',
        title: 'Non-Linear Narrative Project',
        role: '3D Artist & Animator',
        technologies: 'ZBrush, Maya, Unity, Substance Painter',
        description: 'Developed an autonomous non-linear narrative piece. Created concept art, digital sculpting, complex rigging, 3D modeling, advanced shader techniques, and texturing. Integrated the final piece to be self-running within Unity.',
        image: 'NonLinearNarrative.png'
    },
    {
        year: '2023',
        title: 'House Party - Dave Court',
        role: 'Photogrammetry-Based 3D House Remodeling',
        technologies: 'Photogrammetry, 3D Modeling, Texturing',
        description: 'Remodeled a house using photogrammetry and optimized textures. Captured detailed photographs, edited in Photoshop, utilized professional photogrammetry for scale reference, and remodeled with optimized geometry and precise texture integration.',
        image: 'DaveCourt.png'
    },
    {
        year: '2023',
        title: '3D-ME',
        role: 'Personalized Avatars for 3D Social Platforms',
        technologies: 'Photogrammetry, 3D Modeling, Rigging, Animation',
        description: 'Created personalized avatars using facial scans and photogrammetry. Utilized photogrammetry for detailed facial features, edited in Photoshop, remodeled and optimized geometry, and modeled clothing, rigged, and animated the avatars.',
        image: '3DME.png'
    },
    {
        year: '2023',
        title: 'Custom Media Player',
        role: 'Creative Coder',
        technologies: 'Java, HTML, CSS, 3D Modeling',
        description: 'Developed a custom media player as a creative coding experiment. Sought design inspiration from established media players, designed 3D assets, and utilized Java, HTML, and CSS for animation.',
        image: 'mediaPlayer.png'
    },
    {
        year: '2023',
        title: 'Cyber-Feminist Speculative Future',
        role: '3D Artist & Animator',
        technologies: 'Unreal Engine, Metahumans, Mixamo, Blender',
        description: 'Created a short animation and poem inspired by cyberfeminist literature. Explored cyberfeminism concepts, developed imagery, created mood boards, executed 3D modeling, texturing, and dynamic animation. Enhanced realism using Unreal Engine\'s live link for motion capture.',
        image: 'cyberFeminism.png'
    },
    {
        year: '2023',
        title: 'Draining - In Disillusion',
        role: '3D Environment Designer',
        technologies: '3D Modeling, Animation, Rendering',
        description: 'Collaborated with video producers to develop creative concepts for VFX shots. Designed 3D environments based on client briefs. Modeled, textured, animated, and rendered the video.',
        image: 'Draining.png'
    },
    {
        year: '2023',
        title: 'Paradise Club - The Seed',
        role: '3D Environment Designer',
        technologies: '3D Modeling, Animation, Rendering',
        description: 'Collaborated with video producers to develop creative concepts for VFX shots. Designed 3D environments based on client briefs. Modeled, textured, animated, and rendered the video.',
        image: 'ParadiseClub.png'
    },
    {
        year: '2023',
        title: 'Brew Finder',
        role: 'UX/UI Designer',
        technologies: 'Figma',
        description: 'Designed Brew Finder, a high-fidelity, functioning prototype in Figma. Created an engaging user experience tailored for Melbourne\'s coffee enthusiasts.',
        image: 'BrewFinder.png'
    },
    {
        year: '2023',
        title: 'Anada Spanish Restaurant',
        role: 'Waiter & Content Creator',
        technologies: 'DSLR, Adobe Premiere Pro',
        description: 'While working as a waiter, contributed to the restaurant\'s marketing efforts by creating visual content for social media channels. Produced short videos and photos for Instagram reels, wrote engaging captions, and assisted in developing promotional materials.',
        image: 'Anada.png'
    }
];

const tableBody = document.querySelector('#projectTable tbody');
const imageContainer = document.getElementById('imageContainer');

projects.forEach((project, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${project.year}</td>
        <td class="project-title">${project.title}</td>
        <td>${project.role}</td>
        <td>${project.technologies}</td>
    `;

    const detailsRow = document.createElement('tr');
    detailsRow.innerHTML = `
        <td colspan="4">
            <div class="project-details">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </td>
    `;

    row.addEventListener('click', () => {
        const details = detailsRow.querySelector('.project-details');
        if (details.style.display === 'none' || details.style.display === '') {
            details.style.display = 'block';
            setTimeout(() => {
                details.style.opacity = '1';
                details.style.transform = 'translateY(0)';
            }, 50);
        } else {
            details.style.opacity = '0';
            details.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                details.style.display = 'none';
            }, 500);
        }
    });

    row.addEventListener('mouseenter', () => {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.classList.add('project-image');
        imageContainer.appendChild(img);
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, 50);
    });

    row.addEventListener('mouseleave', () => {
        // Delay the effect by 15 seconds (15000 milliseconds)
        setTimeout(() => {
            const imgs = imageContainer.querySelectorAll('.project-image');
            imgs.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    img.remove();
                }, 300);
            });
        }, 6000); // 15 seconds delay
    });

    tableBody.appendChild(row);
    tableBody.appendChild(detailsRow);
});