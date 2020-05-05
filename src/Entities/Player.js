import Phaser from 'phaser';
import Entity from './Entity';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('score', 0);
    this.setData('speed', 200);
    this.setScale(2);
    this.body.setSize(30, 40);
    this.body.setOffset(4, 9);
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
    this.body.setOffset(20, 9);
    if (this.body.onFloor()) {
      this.play('run', true);
    }
    this.setData('moveRight', true);
    this.setData('moveLeft', false);
  }

  moveLeft() {
    this.body.setVelocityX(-this.getData('speed'));
    this.setFlipX(true);
    this.body.setOffset(13, 9)
    if (this.body.onFloor()) {
      this.play('run', true);
    }
    this.setData('moveLeft', true);
    this.setData('moveRight', false);
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

    if (this.body.velocity.x === 0 && !this.getData('isAttacking')) {
      this.body.setOffset(4, 9);
    }

    if (this.getData('hitPoints') === 0) {
      this.setData('isDead', true);
      this.scene.scene.start('SceneGameOver', { name: this.getData('name'), score: this.getData('score') });
      this.explode(true);
    }
  }
}

export default Player;