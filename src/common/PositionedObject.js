//  PositionedObject - это абстрактный класс, определяющий объекты, 
//  которые НЕ двигаются по карте, но имеют мировые (то есть в рамках 
//  всего мира, а не канваса) координаты. Так же они запоминают свои 
//  размер - высоту и ширину. От PositionedObject наследуют ClientCell и 
//  MovableObject.

import EventSourceMixin from './EventSourceMixin';
class PositionedObject {
  constructor(cfg) {
    Object.assign(
      this,
      {
        cfg,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      cfg,
    );
  }

  /**
   * Координаты объекта в мире
   * @param {int} offset_percent_x Сдвиг относительно верхнего левого угла в процентах от размера объекта
   * @param {int} offset_percent_y Сдвиг относительно верхнего левого угла в процентах от размера объекта
   */
  worldPosition(offset_percent_x = 0, offset_percent_y = 0) {
    return {
      x: this.x + (this.width * offset_percent_x) / 100,
      y: this.y + (this.height * offset_percent_y) / 100,
    };
  }

  worldBounds() {
    const { x, y, width, height } = this;
    return { x, y, width, height };
  }

  /**
   * Координаты объекта относительно окна отображения (канваса)
   * @param {int} offset_percent_x Сдвиг относительно верхнего левого угла в процентах от размера объекта
   * @param {int} offset_percent_y Сдвиг относительно верхнего левого угла в процентах от размера объекта
   */
  canvasPosition(offset_percent_x = 0, offset_percent_y = 0) {
    const pos = this.worldPosition(offset_percent_x, offset_percent_y);

    return {
      x: pos.x,
      y: pos.y,
    };
  }
}

Object.assign(PositionedObject.prototype, EventSourceMixin);

export default PositionedObject;
