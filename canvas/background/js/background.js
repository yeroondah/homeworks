const wall = document.getElementById('wall');
const ctx = wall.getContext('2d');
const wallW = window.innerWidth;
const wallH = window.innerHeight;

const figureCount = Math.floor((Math.random() * 1000) + 1);
const figures = [];

const PI = Math.PI;
const FPS = 20;

wall.setAttribute('width', wallW);
wall.setAttribute('height', wallH);

class Figure {
  constructor() {
    this.x = Math.floor(Math.random() * wallW);
    this.y = Math.floor(Math.random() * wallH);
    this.newX = 0;
    this.newY = 0;
    this.size = randomNumber(0.1, 0.6, true);
    this.color = '#ffffff';
    this.strokeWidth = 5 * this.size;
    this.isRandomNewPoint = (figureCount / 2) < randomNumber(0, figureCount);
  }

  newPoint() {
    const time = Date.now();

    if (this.isRandomNextPoint) {
      this.newX = this.x + Math.sin((50 + this.x + (time / 10)) / 100) * 3;
      this.newY = this.y + Math.sin((45 + this.x + (time / 10)) / 100) * 4;
    } else {
      this.newX = this.x + Math.sin((this.x + (time / 10)) / 100) * 5;
      this.newY = this.y + Math.sin((10 + this.x + (time / 10)) / 100) * 2;
    }
  }

  draw() {
    this.newPoint();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.strokeWidth;
  }
}

class Tac extends Figure {
  constructor() {
    super();
    this.radius = 12 * this.size;
  }

  draw() {
    super.draw();
    ctx.arc(this.newX, this.newY, this.radius, 0, 2 * PI);
    ctx.stroke();
  }
}

class Tic extends Figure {
  constructor() {
    super();
    this.width = 20 * this.size;
    this.radius = this.width / 2;
    this.angel = randomNumber(0, 360);
    this.rotationSpeed = randomNumber(-0.2, 0.2, true);
  }

  draw() {
    super.draw();
    this.rotated();
    ctx.translate(this.newX, this.newY);
    ctx.rotate(this.angel * PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -this.radius);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.radius);
    ctx.moveTo(0, 0);
    ctx.lineTo(-this.radius, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();
    ctx.stroke();
  }

  rotated() {
    this.angel += this.rotationSpeed;

    if (this.angel < 0) {
      this.angel += 360;
    } else if (this.angel > 360) {
      this.angel -= 360;
    }
  }
}

function randomNumber(min, max, float = false) {
  return float ? (min + (Math.random() * (max - min))).toFixed(1) : Math.floor(min + Math.random() * (max + 1 - min));
}

function animateFigure() {
  const time = new Date().getTime() * (FPS / 1000);

  ctx.clearRect(0, 0, wallW, wallH);

  figures.forEach((figure) => {
    figure.draw();
  });

  window.requestAnimationFrame(animateFigure);
}

function init() {
  for (let i = 0; i < figureCount; i++) {
    const figure = (i <= figureCount / 2) ? new Tic() : new Tac();
    figures.push(figure);
    figure.draw();
  }

  animateFigure();
}

init();