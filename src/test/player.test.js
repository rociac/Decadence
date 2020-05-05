import Phaser from 'phaser';
import Player from '../Entities/Player';
import SceneMain from '../SceneMain';

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

describe('Phaser', () => {
  it('should be an object', () => {
    expect(typeof Phaser).toBe('object');
  });

  it('should be version 3.22.0', () => {
    expect(Phaser.VERSION).toBe('3.22.0');
  });
});

describe('Player', () => {
  let game;
  let player;
  let scene;
  beforeEach(() => {
    game = new Phaser.Game(config);
    scene = game.scene.getScene('SceneMain');
  });

  describe('Creates Player', () => {
    expect(game.width).toBe(1260);
  });
});
