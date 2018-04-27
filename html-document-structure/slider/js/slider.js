'use strict';

const sliders = document.querySelectorAll('.slider');

for (let slider of sliders) {
  initSlider(slider);
}

function initSlider(slider) {
  const sliderNav = slider.querySelector('.slider-nav');
  const first = sliderNav.querySelector('[data-action="first"]');
  const prev = sliderNav.querySelector('[data-action="prev"]');
  const next = sliderNav.querySelector('[data-action="next"]');
  const last = sliderNav.querySelector('[data-action="last"]');
  const slides = slider.querySelector('.slides');

  slides.firstElementChild.classList.add('slide-current');

  let currentSlide = slides.querySelector('.slide-current');

  updateControl(currentSlide);

  sliderNav.addEventListener('click', (event) => {
    if (event.target.classList.contains('disabled')) {
	  return;
	}

	currentSlide.classList.remove('slide-current');

	switch(event.target) {
	  case first:
		currentSlide = slides.firstElementChild;
		break;
	  case prev:
		currentSlide = currentSlide.previousElementSibling;
		break;
	  case next:
	    currentSlide = currentSlide.nextElementSibling;
		break;
	  case last:
		currentSlide = slides.lastElementChild;
		break;
	}

	updateControl(currentSlide);

	currentSlide.classList.add('slide-current');
  });

  function updateControl(currentSlide) {
	first.classList.toggle('disabled', !currentSlide.previousElementSibling);
	prev.classList.toggle('disabled', !currentSlide.previousElementSibling);
	next.classList.toggle('disabled', !currentSlide.nextElementSibling);
	last.classList.toggle('disabled', !currentSlide.nextElementSibling);
  }
}
