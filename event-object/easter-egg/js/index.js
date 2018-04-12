'use strict';

let navigation = document.getElementsByTagName('nav');
let secretDiv = document.getElementsByClassName('secret');
let pressedKeys = [];
let secretKeys = [
  'KeyY',
  'KeyT',
  'KeyN',
  'KeyJ',
  'KeyK',
  'KeyJ',
  'KeyU',
  'KeyB',
  'KeyZ',
]
document.addEventListener('keydown', hotKeys);
document.addEventListener('keydown', collectedKeys);

function hotKeys(event) {
  if(!event.ctrlKey) {
    return;
  }
  if(!event.altKey) {
      return;
  }
  if (event.code === 'KeyT') {
    toggleVisible();
  }
}

function toggleVisible() {
  for (let nav of navigation) {
    nav.classList.toggle('visible');
  }
}

function collectedKeys(event) {
  pressedKeys.push(event.code);
  checkingKeys();
}

function checkingKeys() {
  for (let index = 0; index < pressedKeys.length; index++) {
    if (pressedKeys[index] !== secretKeys[index]) {
      showSecret();
    }
    if (pressedKeys.join('') === secretKeys.join('')) {
      showSecret('show');
    }
  }
}

function showSecret(status) {
  for (let secret of secretDiv) {
    if(status === 'show') {
      secret.classList.add('visible');
    }
    else {
      secret.classList.remove('visible');
    }
  }
  pressedKeys = [];
}