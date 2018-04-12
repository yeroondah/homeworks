'use strict';

let sounds = Array.from(document.getElementsByTagName('audio'));
let keys = Array.from(document.getElementsByTagName('li'));
let noteSet = document.getElementsByClassName('set');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
for (let key of keys) {
  key.addEventListener('click', playNote)
}


const notes = {
  middle: [
    'sounds/middle/first.mp3',
    'sounds/middle/second.mp3',
	'sounds/middle/third.mp3',
	'sounds/middle/fourth.mp3',
	'sounds/middle/fifth.mp3'
  ],

  lower: [
    'sounds/lower/first.mp3',
    'sounds/lower/second.mp3',
    'sounds/lower/third.mp3',
    'sounds/lower/fourth.mp3',
    'sounds/lower/fifth.mp3'
  ],

  higher: [
    'sounds/higher/first.mp3',
    'sounds/higher/second.mp3',
    'sounds/higher/third.mp3',
    'sounds/higher/fourth.mp3',
    'sounds/higher/fifth.mp3'
  ]
};


loadNoteSet();

function loadNoteSet() {
  for(let set of noteSet) {
    if (set.classList.contains('middle')) {
      chooseSet(notes.middle);
    }
    if (set.classList.contains('lower')) {
      chooseSet(notes.lower);
    }
    if (set.classList.contains('higher')) {
      chooseSet(notes.higher);
    }
  }
}

function chooseSet(set) {
  sounds.reduce(function(previousValue, current, index, arr) {
	current.removeAttribute('src');
	current.setAttribute('src', set[index]);
  }, 0);
}


function playNote() {
  let note = this.childNodes[1];
  if(note.paused) {
    note.play();
  }
  else {
    note.currentTime = 0;
  }
}


function keyDown(e) {
  if (e.shiftKey) {
    for(let set of noteSet) {
	  set.classList.remove('middle');
	  set.classList.add('lower');
    }
    loadNoteSet();
  }
  if (e.altKey) {
    for(let set of noteSet) {
	  set.classList.remove('middle');
	  set.classList.add('higher');
	}
	loadNoteSet();
  }
}

function keyUp(e) {
  if (e.key === 'Shift') {
	for(let set of noteSet) {
	  set.classList.remove('lower');
	  set.classList.add('middle');
    }
	loadNoteSet();
  }
  if (e.key === 'Alt') {
	for(let set of noteSet) {
	  set.classList.remove('higher');
	  set.classList.add('middle');
	}
	loadNoteSet();
  }
}