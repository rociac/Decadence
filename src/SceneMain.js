import Phaser from 'phaser';
import Player from './Entities/Player';
import FireSkull from './Entities/FireSkull';
import HellBeast from './Entities/HellBeast';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    this.load.image('town', './src/assets/town.png');
    this.load.audio('song', './src/assets/song.mp3');

    this.load.spritesheet('hero', './src/assets/hero-idle.png', {
      frameWidth: 38,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-run', './src/assets/hero-run.png', {
      frameWidth: 66,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-jump', './src/assets/hero-jump.png', {
      frameWidth: 61,
      frameHeight: 61,
    });

    this.load.spritesheet('hero-attack', './src/assets/hero-attack.png', {
      frameWidth: 96,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-hurt', './src/assets/hero-hurt.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet('fire-skull', './src/assets/fire-skull.png', {
      frameWidth: 96,
      frameHeight: 112,
    });

    this.load.spritesheet('hell-beast-idle', './src/assets/hell-beast-idle.png', {
      frameWidth: 55,
      frameHeight: 67,
    });

    this.load.spritesheet(
      'hell-beast-attack',
      './src/assets/hell-beast-attack.png',
      {
        frameWidth: 64,
        frameHeight: 64,
      },
    );
  }

  create() {
    this.add.image(400, 300, 'town').setScale(1.8);
    this.music = this.sound.add('song', { loop: 'true' });
    this.music.play();

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

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'hero',
    );

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    this.enemies = this.add.group();
    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          if (this.getEnemiesByType('FireSkull').length < 5) {
            enemy = new FireSkull(this, 60, 600);
          }
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('HellBeast').length < 5) {
            enemy = new HellBeast(
              this,
              1200,
              600,
            );
          }
        }
        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.scoreText = this.add.text(16, 16, 'SCORE: ', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.lives = this.add.text(1000, 16, 'LIVES: ', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.physics.add.collider(this.player, this.enemies, (
      player,
      enemy,
    ) => {
      if (
        enemy
        && !player.getData('isAttacking')
        && !player.getData('isHurt')
      ) {
        enemy.explode(true);
        player.hurt();
        player.play('hurt');
        player.on('animationcomplete', () => {
          player.setData('isHurt', false);
        });
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (
      player,
      enemy,
    ) => {
      if (player.getData('isAttacking')) {
        enemy.destroy();
        player.data.values.score += 50;
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    this.scoreText.setText(`SCORE:${this.player.getData('score')}`);
    this.lives.setText(`LIVES:${this.player.getData('hitPoints')}`);
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyK.isDown && !this.player.getData('isHurt')) {
        this.player.setData('isAttacking', true);
        this.time.addEvent({
          delay: 400,
          callback: () => {
            this.player.setData('isAttacking', false);
          },
        });
      } else {
        if (
          this.keyD.isDown
          && !this.player.getData('isAttacking')
          && !this.player.getData('isHurt')
        ) {
          this.player.moveRight();
        } else if (
          this.keyA.isDown
          && !this.player.getData('isAttacking')
          && !this.player.getData('isHurt')
        ) {
          this.player.moveLeft();
        }

        if (this.keyD.isUp) {
          this.player.setData('moveRight', false);
        }
        if (this.keyA.isUp) {
          this.player.setData('moveLeft', false);
        }
        if (
          this.keySpace.isDown
          && this.player.body.onFloor()
          && !this.player.getData('isHurt')
        ) {
          this.player.jump();
        }
        if (
          this.player.body.velocity.x === 0
          && this.player.body.velocity.y === 0
          && this.player.body.onFloor()
          && !this.player.getData('isHurt')
        ) {
          this.player.play('idle', true);
        }
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (
        enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
  }
}

export default SceneMain;
