import Phaser from 'phaser';
import Entity from './Entity';

class HellBeast extends Entity {
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

export default HellBeast;