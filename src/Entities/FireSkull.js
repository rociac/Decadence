import Phaser from 'phaser';
import Entity from './Entity';

class FireSkull extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'fire-skull', 'FireSkull');
    this.play('skull');
    this.setFlipX(true);
    this.angle = this.body.angle;
    this.body.setCollideWorldBounds(true);
    this.body.velocity.x = Phaser.Math.Between(200, 250);
  }
}

export default FireSkull;