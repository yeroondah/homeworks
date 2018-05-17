'use strict';

const canvas = document.getElementById('draw');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let penSize = 100;
let maxPenSizeReached = false;
let penHue = 0;
let drawing = false;
let pointsX = [];
let pointsY = [];
let shiftPressed = false;

window.addEventListener('resize', () => {
  canvasResize();
  clearCanvas();
});

canvas.addEventListener('dblclick', clearCanvas);

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  context.beginPath();
  context.fillStyle = `hsl(${penHue}, 100%, 50%)`;
  context.arc(e.clientX, e.clientY, penSizeChanger() / 2, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
  pointsX = [];
  pointsY = [];
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  pointsX = [];
  pointsY = [];
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    pointsX.push(e.clientX);
    pointsY.push(e.clientY);
    
    unitePoints();
  };
});

window.addEventListener('keydown', function(e) {
  if (!e.repeat) {
    if (e.key === 'Shift') {
      shiftPressed = true;
    }
  }	
});

window.addEventListener('keyup', function(e) {
  if (e.key === 'Shift') {
    shiftPressed = false;
  }	
});



function unitePoints() {
  context.beginPath();
  context.lineWidth = penSize;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.strokeStyle = `hsl(${penHue}, 100%, 50%)`;
  context.moveTo(pointsX[pointsX.length - 2], pointsY[pointsY.length - 2]);
  context.lineTo(pointsX[pointsX.length - 1], pointsY[pointsY.length - 1]);
  context.stroke();
  context.closePath();
  penHueChanger();
  penSizeChanger();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function penSizeChanger() {
  if (maxPenSizeReached === false) {
    if (penSize === 100) {
      maxPenSizeReached = true;
    }
    return penSize++;
  }
   
  if(maxPenSizeReached === true) {
    if (penSize === 5) {
      maxPenSizeReached = false;
    }
    return penSize--;
  }
}

function penHueChanger() {
  if (shiftPressed === false) {
    if (penHue === 359) {
      penHue = 0;
    }
    penHue++;
  }
   
  if(shiftPressed === true) {
    if (penHue === 0) {
      penHue = 359;
    }
    penHue--;
  }
}