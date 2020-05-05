import Phaser from 'phaser';
import SceneMainMenu from './SceneMainMenu';
import SceneMain from './SceneMain';
import SceneGameOver from './SceneGameOver';
import './main.scss';

const config = {
  type: Phaser.WEBGL,
  width: 1260,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
    },
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
