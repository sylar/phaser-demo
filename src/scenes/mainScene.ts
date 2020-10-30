import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
  private logo: PhaserLogo
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.logo = new PhaserLogo(this, this.cameras.main.width / 2, -100)

    this.add
      .text(this.cameras.main.width, 0, `engine: Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 12
      })
      .setOrigin(1, 0)
  }

  update() {
    let stoppedBounce = this.logo.body.velocity.y.toFixed(2) === '-6.25'

    
    if (!stoppedBounce) {
      this.logo.rotation += 0.01
    }
  }
}
