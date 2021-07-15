import PositionedObject from '../common/PositionedObject';
import sprites from '../configs/sprites';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelCfg) {
    super();

    const worldHeight = levelCfg.map.length;
    const worldWidth = levelCfg.map[0].length;
    const cellSize = engine.canvas.height / levelCfg.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }

  // --- Отрисовка карты через метод renderSpriteFrame класса ClientEngine ---
  init() {
    const { levelCfg, map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = [];
        }

        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellCfg: levelCfg.map[row][col],
        });
      }
    }
  }

  // --- Проходимся по миру и рисуем ячейки ---
  render(time) {
    const {map, worldWidth, worldHeight} = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        map[row][col].render(time);
      }
    }
  }

  // --- Берём ячейку мира и возвращаем её ---
  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
