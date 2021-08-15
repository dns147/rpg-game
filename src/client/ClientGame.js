import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.canvas = document.getElementById(cfg.tagId);
    this.namePlayer = cfg.namePlayer; //--- имя игрока ---

    this.engine = this.createEngine(); // Создание движка игры
    this.map = this.createWorld(); // Создание карты
    this.initEngine();
    // Инициализация/запуск движка
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(this.canvas, this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg, this.namePlayer);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    // ---Вызов ф-ии загрузки спрайтов, на выходе имеем промис ---
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        // --- Регистация события 'render' через метод 'this.engine.on' класса ClientEngine
        this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });

      this.engine.start(); // --- Запуск движка, только после того как все изображения загрузятся ---
      this.initKeys();
    });
  }

  movePlayer(state, x, y, dir) {
    if (state && this.player.motionProgress === 1) {
      const canMovie = this.player.moveByCellCoord(x, y, (cell) => {
        return cell.findObjectsByType('grass').length;
      });

      if (canMovie) {
        this.player.setState(dir);
        this.player.once('motion-stopped', () => this.player.setState('main'));
      }
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        this.movePlayer(keydown, -1, 0, 'left');
      },
      ArrowRight: (keydown) => {
        this.movePlayer(keydown, 1, 0, 'right');
      },
      ArrowDown: (keydown) => {
        this.movePlayer(keydown, 0, 1, 'down');
      },
      ArrowUp: (keydown) => {
        this.movePlayer(keydown, 0, -1, 'up');
      },
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
