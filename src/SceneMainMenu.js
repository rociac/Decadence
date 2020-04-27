import Phaser from 'phaser';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu ' });
  }

  preload() {
    this.load.image('town', './assets/town.png');
    this.load.image('btnPlay', './assets/btnPlay.png');
    this.load.image('btnPlayDown', './assets/btnPlayDown.png');
    this.load.image('btnPlayHover', './assets/btnPlayHover.png');
  }

  create() {
    this.add.image(400, 300, 'town').setScale(1.8);

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'DECADENCE', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnPlay',
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', () => {
      this.btnPlay.setTexture('btnPlayHover');
    }, this);

    this.btnPlay.on('pointerout', () => {
      this.setTexture('btnPlay');
    });

    this.btnPlay.on('pointerdown', () => {
      this.btnPlay.setTexture('btnPlayDown');
    }, this);

    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('btnPlay');
      this.scene.start('SceneMain');
    });

    this.title.setOrigin(0.5);
  }
}

export default SceneMainMenu;