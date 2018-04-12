'use strict';

const nav = document.getElementById('nav');
const links = nav.getElementsByTagName('a');
const fullSizeImage = document.getElementById('view');

Array.from(links).forEach(link => {
  link.addEventListener('click', showFullImage);
  link.addEventListener('click', markCurrent);
});

function clearClassList() {
  for (let link of links) {
    if (link.classList.contains('gallery-current')) {
      link.classList.remove('gallery-current');
    }
  }
}

function showFullImage(event) {
  event.preventDefault();
  fullSizeImage.src = this.href;
}

function markCurrent(event) {
  if (!this.classList.contains('gallery-current')) {
    clearClassList();
    this.classList.add('gallery-current');
  }
}