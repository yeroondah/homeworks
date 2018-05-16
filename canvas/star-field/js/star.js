'use strict';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const starColors = [
  '#ffffff',
  '#ffe9c4',
  '#d4fbff'
];

canvas.addEventListener('click', makeStars);

function makeStars() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	let starNumber = 0;
	let starsQty = randomStarsQty();

	for (starNumber; starNumber < starsQty; starNumber++) {
		context.beginPath();
		context.arc(randomStarPositionX(), randomStarPositionY(), randomStarSize(), 0, 2 * Math.PI);
		context.fillStyle = randomStarColor();
		context.globalAlpha = randomStarBrightness();
		context.fill();
		context.closePath();
	}
}

function randomStarsQty() {
  let min = 200, max = 401;
  return Math.floor(Math.random() * (max - min) + min);
}

function randomStarColor() {
    let min = 0, max = 3;
		let colorIndex = Math.floor(Math.random() * (max - min) + min);
    return starColors[colorIndex];
}

function randomStarBrightness() {
  let min = 0.8, max = 1;
  let value = Math.round((Math.random() * (max - min) + min) * 10) / 10;
  return value;
}

function randomStarPositionX() {
  let min = 0, max = canvas.width;
  return Math.floor(Math.random() * (max - min) + min);
}

function randomStarPositionY() {
  let min = 0, max = canvas.height;
  return Math.floor(Math.random() * (max - min) + min);
}

function randomStarSize() {
  let min = 0.8, max = 1.1;
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

