import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';
import ClientGame from './client/ClientGame';

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

function renderPlayer(n) {
  cycle = (cycle + 1) % shots;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, cycle * spriteW, n * 48, spriteW, spriteH, pX, pY, 48, 48);
}

function walk(timestamp) {
  switch (bottomPressed) {
    case 'Down':
    case 'ArrowDown':
      pY += 10;
      renderPlayer(0);
      break;

    case 'Left':
    case 'ArrowLeft':
      pX -= 10;
      renderPlayer(1);
      break;

    case 'Right':
    case 'ArrowRight':
      pX += 10;
      renderPlayer(2);
      break;

    case 'Up':
    case 'ArrowUp':
      pY -= 10;
      renderPlayer(3);
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

  window.requestAnimationFrame(walk);
}

img.addEventListener('load', () => {
  ctx.drawImage(img, spriteW, 0, spriteW, spriteH, pX, pY, 48, 48);
  window.requestAnimationFrame(walk);
});

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});
