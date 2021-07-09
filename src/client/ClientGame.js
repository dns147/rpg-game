import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import ClientPlayer from './ClientPlayer';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world2.json';
import SenseiWalk from '../assets/Male-4-Walk.png';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
    });

    this.canvas = document.getElementById(cfg.tagId);

    this.engine = this.createEngine(); // Создание движка игры
    this.map = this.createWorld(); // Создание карты
    this.player = this.createPlayer(); // Создание игрока
    this.initEngine(); // Инициализация/запуск движка
  }

  createEngine() {
    return new ClientEngine(this.canvas);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createPlayer() {
    return new ClientPlayer(this, this.engine, this.canvas, SenseiWalk);
  }

  initEngine() {
    // ---Вызов ф-ии загрузки спрайтов, на выходе имеем промис ---
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, time) => {
        // --- Регистация события 'render' через метод 'this.engine.on' класса ClientEngine
        this.map.init();
        this.player.init();
      });

      this.engine.start(); // --- Запуск движка, только после того как все изображения загрузятся ---
    });
  }

  // --- Инициализация игры
  // данный метод используется только для самого класса, а не для его экзэмпляров ---
  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
