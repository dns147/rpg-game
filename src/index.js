import './index.scss';
import ClientGame from './client/ClientGame';

const inputNamePlayer = document.getElementById('name');
const button = document.querySelector('.btn');
const enterRoom = document.querySelector('.start-game');

if (!inputNamePlayer.value) {
  button.disabled = true;
}

inputNamePlayer.addEventListener('input', () => {
  button.disabled = false;
});

button.addEventListener('click', () => {
  enterRoom.remove();
  ClientGame.init({ tagId: 'game', namePlayer: inputNamePlayer.value });
});
