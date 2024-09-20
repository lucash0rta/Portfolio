document.addEventListener('DOMContentLoaded', () => {
  const slideshows = [
    {
      container: document.getElementById('slideshow'),
      slides: document.querySelectorAll('#slideshow .slide'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      timeline: document.querySelector('.timeline'),
      timelineItems: document.querySelectorAll('.timeline-item'),
      progressBar: document.querySelector('.progress-bar'),
      currentSlide: 0
    },
    {
      container: document.getElementById('slideshow-personal'),
      slides: document.querySelectorAll('#slideshow-personal .slide'),
      prevBtn: document.getElementById('prevBtnPersonal'),
      nextBtn: document.getElementById('nextBtnPersonal'),
      timeline: document.querySelector('.personal-timeline'),
      timelineItems: document.querySelectorAll('.personal-timeline .timeline-item'),
      progressBar: document.querySelector('.personal-progress-bar'),
      currentSlide: 0
    }
  ];

  slideshows.forEach(slideshow => {
    const showSlide = (n) => {
      slideshow.slides[slideshow.currentSlide].classList.remove('active');
      slideshow.timelineItems[slideshow.currentSlide].classList.remove('active');
      slideshow.currentSlide = (n + slideshow.slides.length) % slideshow.slides.length;
      slideshow.slides[slideshow.currentSlide].classList.add('active');
      slideshow.timelineItems[slideshow.currentSlide].classList.add('active');
      updateProgressBar(slideshow);
    };

    const updateProgressBar = (slideshow) => {
      const progress = ((slideshow.currentSlide + 1) / slideshow.slides.length) * 100;
      slideshow.progressBar.style.width = `${progress}%`;
    };

    slideshow.prevBtn.addEventListener('click', () => showSlide(slideshow.currentSlide - 1));
    slideshow.nextBtn.addEventListener('click', () => showSlide(slideshow.currentSlide + 1));

    slideshow.timelineItems.forEach((item, index) => {
      item.addEventListener('click', () => showSlide(index));
    });

    updateProgressBar(slideshow);
  });
});