import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = null;
let pX = (canvas.width - spriteW) / 2;
let pY = (canvas.height - spriteH) / 2;

const img = document.createElement('img');
img.src = SenseiWalk;

document.addEventListener('keydown', (e) => {
  bottomPressed = e.code;
});

document.addEventListener('keyup', () => {
  bottomPressed = null;
});

function makeBackground() {
  const grad = ctx.createRadialGradient(300, 300, 20, 300, 300, 400);
  grad.addColorStop(0, 'gold');
  grad.addColorStop(0.5, 'green');
  grad.addColorStop(1, 'blue');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderGame(n) {
  cycle = (cycle + 1) % shots;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  makeBackground();
  ctx.drawImage(img, cycle * spriteW, n * 48, spriteW, spriteH, pX, pY, 48, 48);
}

function movePlayer() {
  switch (bottomPressed) {
    case 'Down':
    case 'ArrowDown':
      pY += 10;
      renderGame(0);
      break;

    case 'Left':
    case 'ArrowLeft':
      pX -= 10;
      renderGame(1);
      break;

    case 'Right':
    case 'ArrowRight':
      pX += 10;
      renderGame(2);
      break;

    case 'Up':
    case 'ArrowUp':
      pY -= 10;
      renderGame(3);
      break;

    default:
      bottomPressed = null;
  }

  if (pX < 0) {
    pX = 0;
  }

  if (pX > canvas.width - spriteW) {
    pX = canvas.width - spriteW;
  }

  if (pY < 0) {
    pY = 0;
  }

  if (pY > canvas.height - spriteH) {
    pY = canvas.height - spriteH;
  }
}

img.addEventListener('load', () => {
  makeBackground();
  ctx.drawImage(img, spriteW, 0, spriteW, spriteH, pX, pY, 48, 48);
  setInterval(movePlayer, 120);
});
