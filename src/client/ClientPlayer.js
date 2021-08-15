import ClientGameObject from './ClientGameObject';
import ClientEngine from './ClientEngine';

class ClientPlayer extends ClientGameObject {
  constructor(cfg) {
    super(cfg);

    this.playerName = cfg.namePlayer; //---имя игрока---

    const world = cfg.cell.world;

    world.game.setPlayer(this);
  }

  render(time) {
    super.render(time);

    const { world } = this;

    world.engine.renderSign({
      x: this.x + world.cellWidth / 2,
      y: this.y - 15,
      minWidth: world.cellWidth,
      maxWidth: world.cellWidth * 1.5,
      text: this.playerName,
    });
  }
}

export default ClientPlayer;
