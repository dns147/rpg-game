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

    this.engine = this.createEngine(); // Создание движка игры
    this.map = this.createWorld(); // Создание карты
    this.initEngine(); // Инициализация/запуск движка
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(this.canvas);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    // ---Вызов ф-ии загрузки спрайтов, на выходе имеем промис ---
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        // --- Регистация события 'render' через метод 'this.engine.on' класса ClientEngine
        this.map.render(time);
      });

      this.engine.start(); // --- Запуск движка, только после того как все изображения загрузятся ---
      this.initKeys();
    });
  }

  movePlayer(x, y) {
    this.player.moveByCellCoord(x, y, (cell) => {
      return cell.findObjectsByType('grass').length;
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.movePlayer(-1, 0);
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.movePlayer(1, 0);
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.movePlayer(0, 1);
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.movePlayer(0, -1);
        }
      }
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
