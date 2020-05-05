import Phaser from 'phaser';
import buttonRestart from './assets/btnRestart.png';
import buttonRestartHover from './assets/btnRestartHover.png';
import buttonRestartDown from './assets/btnRestartDown.png';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('btnRestart', buttonRestart);
    this.load.image('btnRestartHover', buttonRestartHover);
    this.load.image('btnRestartDown', buttonRestartDown);
  }

  init(data) {
    this.user = data.name;
    this.points = data.score;
  }

  create() {
    this.postLeaderboard();
    this.add.image(400, 300, 'town').setScale(1.8);
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.score = this.add.text(this.game.config.width * 0.5, 230, `SCORE: ${this.points}`, {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.score.setOrigin(0.5);


    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('btnRestartHover');
    });

    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('btnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('btnRestartDown');
    });

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('btnRestart');
      this.scene.start('SceneMain');
    });
  }

  async postLeaderboard() {
    const gameId = 'yTrKl8bdMoKRXSDAOur8';
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
    const dataUser = { user: this.user, score: this.points };

    const params = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(dataUser),
      method: 'POST',
    };

    fetch(url, params)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    // try {
    //   const response = await fetch(url, params);
    //   const postLeaderboardData = await response.json();
    // } catch (e) {
    //   console.log(e);
    // }
  }
}

export default SceneGameOver;