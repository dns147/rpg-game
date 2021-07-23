import EventSourceMixin from '../common/EventSourceMixin';
import ClientCamera from './ClientCamera';
import ClientInput from './ClientInput';

class ClientEngine {
  constructor(canvas, game) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
      game,
      lastRenderTime: 0, //  время последнего рендера движка
      startTime: 0, //  время начала первого рендера, время старта игры
    });

    this.ctx = canvas.getContext('2d');

    this.loop = this.loop.bind(this);
  }

  // --- Запуск движка ---
  start() {
    this.loop();
  }

  // --- Обновление canvas ---
  loop(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp; //  установка стартового времени
    }

    this.lastRenderTime = timestamp; //  сохраняем время последнего рендера

    const { ctx, canvas } = this;
    ctx.fillstyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.trigger('render', timestamp); // --- Запуск события 'render' через метод 'this.trigger' класса ClientEngine
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  // --- Загрузка группы спрайтов ---
  loadSprites(spritesGroup) {
    this.imageLoaders = [];

    for (let groupName in spritesGroup) {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;

      for (let spriteName in group) {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      }
    }

    return Promise.all(this.imageLoaders); // --- ждем, когда все изображения загрузятся ---
  }

  // --- Обработчик загрузки изображений ---
  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;
      i.onload = () => resolve(i);
      i.src = url;
    });
  }

  // --- Отрисовка карты ---
  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteCfg.frames[frame];
    const img = this.images[spriteCfg.img];
    const camera = this.camera;

    this.ctx.drawImage(img, fx, fy, fw, fh, x - camera.x, y - camera.y, w, h);
  }

  // --- Отрисовка игрока ---
  renderPlayer({ playerURL, spriteW, spriteH, pX, pY }) {
    this.loadImage(playerURL);
    const img = this.images[playerURL];

    this.ctx.drawImage(img, spriteW, 0, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }
}

// --- Расширяем протитипы ClientEngine объектом EventSourceMixin, в котором
// содержаться методы для подписки на события ---
Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
