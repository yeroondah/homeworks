'use strict';

const counter = document.getElementById('counter');
const btnInc = document.getElementById('increment');
const btnDec = document.getElementById('decrement');
const btnReset = document.getElementById('reset');

if (sessionStorage.countValue === undefined) {
  sessionStorage.countValue = 0;
}

counter.textContent = sessionStorage.countValue;

btnInc.addEventListener('click', () => {
  counter.textContent = ++sessionStorage.countValue;
});

btnDec.addEventListener('click', () => {
  counter.textContent = sessionStorage.countValue <= 0 ? 0 : --sessionStorage.countValue;
});

btnReset.addEventListener('click', () => {
  sessionStorage.countValue = 0;
  counter.textContent = 0;
});
