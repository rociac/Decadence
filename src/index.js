import Phaser from 'phaser';
import SceneMain from './SceneMain';

const config = {
  type: Phaser.WEBGL,
  width: 1260,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 1500 },
    },
  },
  scene: [SceneMain],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);
