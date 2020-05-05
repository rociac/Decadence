import Phaser from 'phaser';
import Player from './Entities/Player';
import FireSkull from './Entities/FireSkull';
import HellBeast from './Entities/HellBeast';
import heroIdle from './assets/hero-idle.png';
import heroRun from './assets/hero-run.png';
import heroJump from './assets/hero-jump.png';
import heroAttack from './assets/hero-attack.png';
import heroHurt from './assets/hero-hurt.png';
import skull from './assets/fire-skull.png';
import beast from './assets/hell-beast-idle.png';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    this.load.image('town', './src/assets/town.png');

    this.load.spritesheet('hero', heroIdle, {
      frameWidth: 38,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-run', heroRun, {
      frameWidth: 66,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-jump', heroJump, {
      frameWidth: 61,
      frameHeight: 61,
    });

    this.load.spritesheet('hero-attack', heroAttack, {
      frameWidth: 96,
      frameHeight: 48,
    });

    this.load.spritesheet('hero-hurt', heroHurt, {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet('fire-skull', skull, {
      frameWidth: 96,
      frameHeight: 112,
    });

    this.load.spritesheet('hell-beast-idle', beast, {
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

  init(data) {
    this.playerName = data.playerName;
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

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'hero',
    );

    this.player.setData('name', this.playerName);

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
            enemy = new HellBeast(this, 1200, 600);
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

    this.sword = this.physics.add.sprite(this.player.x, this.player.y);
    this.sword.body.allowGravity = false;
    this.sword.setActive(false).setVisible(false);

    this.container = this.add.container(0, 0, [this.player, this.sword]);

    this.physics.add.collider(
      this.container.list[1],
      this.enemies,
      (player, enemy) => {
        if (enemy) {
          enemy.explode(true);
          this.player.data.values.score += 50;
        }
      },
    );

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (
        !player.getData('isDead')
        && !enemy.getData('isDead')
        && !player.getData('isHurt')
      ) {
        player.hurt();
        enemy.explode(true);
        player.anims.play('hurt');
        player.once('animationcomplete', () => {
          player.setData('isHurt', false);
        });
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
      if (
        Phaser.Input.Keyboard.JustDown(this.keyK)
        && !this.player.getData('isHurt')
      ) {
        this.container.list[1].body.enable = true;
        this.container.list[0].body.setOffset(30, 9);
        this.container.list[1].x = this.player.x;
        this.container.list[1].y = this.player.y;
        this.container.list[1].body.setSize(60, 10);
        if (this.player.getData('moveRight')) {
          this.container.list[1].body.setOffset(40, 0);
        } else if (this.player.getData('moveLeft')) {
          this.container.list[1].body.setOffset(-75, 0);
        }
        this.player.anims.stop();
        this.player.play('attack', true);
        this.player.setData('isAttacking', true);
        this.player.once('animationcomplete', () => {
          this.container.list[1].body.enable = false;
          this.player.setData('isAttacking', false);
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
          && !this.player.getData('isAttacking')
        ) {
          this.player.play('idle', true);
        }
      }
    }
  }
}

export default SceneMain;
