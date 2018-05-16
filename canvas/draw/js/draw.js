'use strict';

const draw = document.getElementById('draw');
const ctx = draw.getContext('2d');
const PI = Math.PI;
let drawing = false; // Статус рисования
const lineSize = changeLineSize(); // Размер
const hue = changeHue(); // Цвет

ctx.lineJoin = 'round';
ctx.lineCap = 'round';

document.body.style.overflow = 'hidden';

sizeDraw();

window.addEventListener('resize', () => {
  sizeDraw();
});

draw.addEventListener("mousedown", (e) => {
  drawing = true;
});

draw.addEventListener("mouseup", () => {
  drawing = false;
});

draw.addEventListener("mouseleave", () => {
  drawing = false;
});

draw.addEventListener("mousemove", (e) => {
  if (drawing) {
    const point = [e.offsetX, e.offsetY];
    circle(point, lineSize(), hue(e));
  }
});

draw.addEventListener('dblclick', () => {
  ctx.clearRect(0, 0, draw.width, draw.height);
});

function circle(point, size, hue) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.arc(...point, size, 0, 2 * PI);
  ctx.fill();
}

function sizeDraw() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  draw.setAttribute('width', width);
  draw.setAttribute('height', height);

  ctx.clearRect(0, 0, width, height);
}

function changeLineSize() {
  const lineMinWidth = 5;
  const lineMaxWidth = 100;
  let currentLineWidth = lineMinWidth;
  let inc = true;

  return function () {
    if (currentLineWidth < lineMaxWidth && inc) {
      return currentLineWidth++;
    } else {
      inc = false;
    }

    if (currentLineWidth > lineMinWidth && !inc) {
      return currentLineWidth--;
    } else {
      inc = true;
    }
  }
}

function changeHue() {
  const minHue = 0;
  const maxHue = 359;
  let currentHue = 0;

  return function (event) {
    event.shiftKey ? currentHue-- : currentHue++;

    if (currentHue < minHue) {
      currentHue = maxHue;
    }

    if (currentHue > maxHue) {
       currentHue = minHue;
    }

    return currentHue;
  }
}