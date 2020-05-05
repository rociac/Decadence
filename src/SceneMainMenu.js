import Phaser from 'phaser';
import town from './assets/town.png';
import buttonPlay from './assets/btnPlay.png';
import buttonPlayDown from './assets/btnPlayDown.png';
import buttonPlayHover from './assets/btnPlayHover.png';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu ' });
  }

  preload() {
    this.load.image('town', town);
    this.load.image('btnPlay', buttonPlay);
    this.load.image('btnPlayDown', buttonPlayDown);
    this.load.image('btnPlayHover', buttonPlayHover);
  }

  create() {
    this.add.image(400, 300, 'town').setScale(1.8);

    this.getLeaderboard();

    this.inputField = document.querySelector('.username');

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'DECADENCE', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.usernameText = this.add.text(
      this.game.config.width * 0.5,
      240,
      'USERNAME',
      {
        fontFamily: 'monospace',
        fontSize: 18,
        fontStyle: 'bold',
        color: '#ffffff',
        aling: 'center',
      },
    );

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnPlay',
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', () => {
      this.btnPlay.setTexture('btnPlayHover');
    });

    this.btnPlay.on('pointerout', () => {
      this.btnPlay.setTexture('btnPlay');
    });

    this.btnPlay.on('pointerdown', () => {
      this.btnPlay.setTexture('btnPlayDown');
    });

    this.btnPlay.on('pointerup', () => {
      if (this.inputField.value.length > 0) {
        const playerName = this.inputField.value;
        this.inputField.style.display = 'none';
        this.scene.start('SceneMain', { playerName });
      } else {
        this.inputField.classList.add('error');
      }
      this.btnPlay.setTexture('btnPlay');
    });

    this.title.setOrigin(0.5);
    this.usernameText.setOrigin(0.5);
  }

  async getLeaderboard() {
    this.gameId = 'yTrKl8bdMoKRXSDAOur8';
    this.baseUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameId}/scores/`;
    this.leaderboard = document.querySelector('.leaderboard__data');
    try {
      const response = await fetch(this.baseUrl);
      const leaderboardData = await response.json();
      const sortedLeaderboard = leaderboardData.result.sort(
        (a, b) => parseInt(b.score, 10) - parseInt(a.score, 10),
      );
      sortedLeaderboard.forEach(user => {
        const li = document.createElement('li');
        const name = document.createElement('p');
        const score = document.createElement('p');
        name.innerHTML += user.user;
        score.innerHTML += user.score;
        li.appendChild(name);
        li.appendChild(score);
        this.leaderboard.appendChild(li);
      });
      return sortedLeaderboard;
    } catch (e) {
      return e;
    }
  }

  // setInfo(leaderboardData) {
  //   const infoElements = `

  //   `
  // }
}

export default SceneMainMenu;
