import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

const $inputName = document.getElementById('name');
const button = document.querySelector('.btn');

if (!$inputName.value) {
  button.disabled = true;
}

$inputName.addEventListener('input', () => {
  button.disabled = false;
});

button.addEventListener('click', () => {
  const socket = io('https://jsprochat.herokuapp.com');

  const $startGame = document.querySelector('.start-game');
  const $nameForm = document.getElementById('nameForm');

  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  const submitName = (e) => {
    e.preventDefault();

    if ($inputName.value) {
      ClientGame.init({
        tagId: 'game',
        namePlayer: $inputName.value,
      });

      socket.emit('start', $inputName.value);

      $chatWrap.style.display = 'block';

      $nameForm.removeEventListener('submit', submitName);
      $startGame.remove();
    }
  };

  $nameForm.addEventListener('submit', submitName);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    if ($input.value) {
      socket.emit('chat message', $input.value);

      $input.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    $message.insertAdjacentHTML(
      'beforeend',
      `<p style = "color: green"><strong>${getTime(data.time)}<strong>: ${data.msg}</p>`,
    );
  });

  socket.on('chat disconnect', (data) => {
    $message.insertAdjacentHTML(
      'beforeend',
      `<p style = "color: red"><strong>${getTime(data.time)}<strong>: ${data.msg}</p>`,
    );
  });

  socket.on('chat online', (data) => {
    let namesOnline = '';

    data.names.forEach((v) => {
      if (v.name) {
        namesOnline += `${v.name},` + ' ';
      }
    });

    console.log(data.names);

    $message.insertAdjacentHTML(
      'beforeend',
      `<p style = "color: brown"><strong>${getTime(data.time)}<strong>: Online(${data.online}) - ${namesOnline}</p>`,
    );
  });

  socket.on('chat message', (data) => {
    if (data.name === 'dns147') {
      $message.insertAdjacentHTML(
        'beforeend',
        `<p style = "color: blue"><strong>${getTime(data.time)}<strong> - ${data.msg}</p>`,
      );
    } else {
      $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}<strong> - ${data.msg}</p>`);
    }
  });
});
