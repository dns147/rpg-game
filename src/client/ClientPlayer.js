class ClientPlayer {
  constructor(game, engine, canvas, playerURL) {
    Object.assign(this, {
      game,
      engine,
      canvas,
      playerURL,
      spriteW: 48,
      spriteH: 48,
    });
  }

  init() {
    const { playerURL, spriteW, spriteH, canvas } = this;

    this.engine.renderPlayer({
      playerURL,
      spriteW,
      spriteH,
      pX: (canvas.width - spriteW / 2) / 2,
      pY: (canvas.height - spriteH / 2) / 2,
    });
  }
}

export default ClientPlayer;
