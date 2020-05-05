import Phaser from 'phaser';

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

export default Entity;
