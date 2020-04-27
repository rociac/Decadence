import Phaser from 'phaser';
import Entity from './Entity';

class Player extends Entity {
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
    if (this.body.onFloor()) {
      this.play('run', true);
    }
    this.setData('moveRight', true);
  }

  moveLeft() {
    this.body.setVelocityX(-this.getData('speed'));
    this.setFlipX(true);
    if (this.body.onFloor()) {
      this.play('run', true);
    }
    this.setData('moveLeft', true);
  }

  jump() {
    this.body.setVelocityY(-600);
    this.play('jump', true);
  }

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
        this,
      );
    }

    if (this.getData('hitPoints') === 0) {
      this.setData('isDead', true);
      this.scene.scene.start('SceneGameOver');
      this.explode(true);
    }
  }
}

export default Player;