class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('town', './assets/town.png')
    this.load.image('btnRestart', './assets/btnRestart.png');
    this.load.image('btnRestartHover', './assets/btnRestart.png');
    this.load.image('btnRestart', './assets/btnRestart.png');
  }

  create() {
    this.add.image(400, 300, 'town').setScale(1.8);
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnRestart'
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('btnRestartHover');

    }, this);

    this.btnRestart.on('pointerout', () => {
      this.setTexture('btnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('btnRestartDown');
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('btnRestart');
      this.scene.start('SceneMain');
    }, this);
  }
}

export default SceneGameOver;