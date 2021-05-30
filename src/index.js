import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scene/games-scenes';
import BootScene from './scene/boot-scene';
import PreloaderScene from './scene/preloader-scene';
import TitleScene from './scene/title-scene';
import OptionsScene from './scene/options-scene';
import CreditsScene from './scene/credits-scene';
import LeaderboardScene from './scene/leaderboardScene';
import Model from './model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LeaderBoard', LeaderboardScene);

    this.scene.start('Boot');
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

const button = document.getElementById('button');

button.onclick = () => {
  const inputUsername = document.getElementById('username');
  const user = JSON.stringify(inputUsername.value);
  const div = document.getElementById('login');
  if (localStorage) {
    if (inputUsername.value !== '') {
      localStorage.clear();
      const local = localStorage.setItem('user', user);
      console.log(local);
      div.removeChild(inputUsername);
      div.removeChild(button);
      div.classList += 'dnone';
      window.game = new Game();
    }
  }
};
