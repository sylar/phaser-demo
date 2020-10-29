import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `engine: Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 12
      })
      .setOrigin(1, 0)
  }
}
