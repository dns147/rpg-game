import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
const bottomPressed = {};
let pX = 276;
let pY = 276;

const img = document.createElement('img');
img.src = SenseiWalk;

document.addEventListener('keydown', (e) => {
  bottomPressed[e.code] = true;
});

document.addEventListener('keyup', (e) => {
  bottomPressed[e.code] = false;
});

function makeBackground() {
  const grad = ctx.createRadialGradient(300, 300, 20, 300, 300, 400);
  grad.addColorStop(0, 'gold');
  grad.addColorStop(0.5, 'green');
  grad.addColorStop(1, 'blue');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 600);
}

function movePlayer() {
  if (bottomPressed.Down || bottomPressed.ArrowDown) {
    pY += 10;
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    makeBackground();
    ctx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, pX, pY, 48, 48);
  }

  if (bottomPressed.Up || bottomPressed.ArrowUp) {
    pY -= 10;
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    makeBackground();
    ctx.drawImage(img, cycle * spriteW, 3 * 48, spriteW, spriteH, pX, pY, 48, 48);
  }

  if (bottomPressed.Right || bottomPressed.ArrowRight) {
    pX += 10;
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    makeBackground();
    ctx.drawImage(img, cycle * spriteW, 2 * 48, spriteW, spriteH, pX, pY, 48, 48);
  }

  if (bottomPressed.Left || bottomPressed.ArrowLeft) {
    pX -= 10;
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    makeBackground();
    ctx.drawImage(img, cycle * spriteW, 1 * 48, spriteW, spriteH, pX, pY, 48, 48);
  }

  if (pX < 0) {
    pX = 0;
  } else if (pX > 552) {
    pX = 552;
  }

  if (pY < 0) {
    pY = 0;
  } else if (pY > 552) {
    pY = 552;
  }
}

img.addEventListener('load', () => {
  makeBackground();
  ctx.drawImage(img, 0, 0, spriteW, spriteH, pX, pY, 48, 48);
  setInterval(movePlayer, 120);
});
