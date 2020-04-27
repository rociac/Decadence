import SceneGameOver from './SceneGameOver';

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('isHurt', false);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.body.setVelocity(0, 0);
      if (canDestroy) {
        this.destroy();
      } else {
        this.setVisible(false);
      }
      this.setData('isDead', true);
    }
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('score', 0);
    this.setData('speed', 200);
    this.setScale(2);
    this.setData('isAttacking', false);
    this.setData('timerAttackDelay', 10);
    this.setData('timerAttackTick', this.getData('timerAttackDelay') - 1);
    this.play('idle');
    this.body.setCollideWorldBounds(true);
    this.setData('hitPoints', 3);
  }

  moveRight() {
    this.body.setVelocityX(this.getData('speed'));
    this.setFlipX(false);
    this.body.setOffset(15, 0);
    this.body.onFloor() && this.play('run', true);
    this.setData('moveRight', true);
  }

  moveLeft() {
    this.body.setVelocityX(-this.getData('speed'));
    this.setFlipX(true);
    this.body.onFloor() && this.play('run', true);
    this.setData('moveLeft', true);
  }

  jump() {
    this.body.setVelocityY(-600);
    this.play('jump', true);
  }

  attack() { }

  hurt() {
    this.setData('isHurt', true);
    this.data.values.hitPoints -= 1;
  }

  update() {
    this.body.setVelocityX(0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isAttacking')) {
      this.play('attack', true);
      if (this.getData('isAttacking') && this.getData('moveRight')) {
        this.body.setOffset(60, 0);
      }
      this.on(
        'animationcomplete',
        () => {
          this.body.setOffset(0);
        },
        this
      );
    }

    if (this.getData('hitPoints') === 0) {
      this.setData('isDead', true);
      this.scene.scene.start('SceneGameOver');
      this.explode(true);
    }
  }
}

export class FireSkull extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'fire-skull', 'FireSkull');
    this.play('skull');
    this.setFlipX(true);
    this.angle = this.body.angle;
    this.body.setCollideWorldBounds(true);
    this.body.velocity.x = Phaser.Math.Between(200, 250);
  }
}

export class HellBeast extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'hell-beast', 'HellBeast');
    this.setScale(2);
    this.body.velocity.x = -Phaser.Math.Between(50, 100);
    this.body.setSize(40, 60);
    this.body.setOffset(5, 10);
    this.play('beast-idle');
    this.body.setCollideWorldBounds(true);
  }
}
