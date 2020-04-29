import Phaser from 'phaser';
import SceneMainMenu from './SceneMainMenu';
import SceneMain from './SceneMain';
import SceneGameOver from './SceneGameOver';

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
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);
