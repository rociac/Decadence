class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    this.load.image('town', './assets/town.png');

    this.load.spritesheet('hero', './assets/hero-idle.png', {
      frameWidth: 38,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-run', './assets/hero-run.png', {
      frameWidth: 66,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-jump', './assets/hero-jump.png', {
      frameWidth: 61,
      frameHeight: 61,
    });

    this.load.spritesheet('hero-attack', './assets/hero-attack.png', {
      frameWidth: 96,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-hurt', './assets/hero-hurt.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet('fire-skull', './assets/fire-skull.png', {
      frameWidth: 96,
      frameHeight: 112,
    });

    this.load.spritesheet('hell-beast-idle', './assets/hell-beast-idle.png', {
      frameWidth: 55,
      frameHeight: 67,
    });

    this.load.spritesheet(
      'hell-beast-attack',
      './assets/hell-beast-attack.png',
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }

  create() {
    this.add.image(400, 300, 'town').setScale(1.8);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('hero'),
      frameRate: 7,
      repeat: -1,
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('hero-run'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('hero-jump'),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('hero-attack'),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: 'hurt',
      frames: this.anims.generateFrameNumbers('hero-hurt'),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: 'skull',
      frames: this.anims.generateFrameNumbers('fire-skull'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beast-idle',
      frames: this.anims.generateFrameNumbers('hell-beast-idle'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beast-attack',
      frames: this.anims.generateFrameNumbers('hell-beast-attack'),
      frameRate: 20,
      repeat: -1,
    });
  }

  update() {}
}

export default SceneMain;
