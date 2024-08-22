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

        row.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const imgs = imageContainer.querySelectorAll('.project-image');
                imgs.forEach(img => {
                    img.style.opacity = '0';
                    img.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        img.remove();
                    }, 300);
                });
            }, 6000); // 6 seconds delay
        });
    });
});