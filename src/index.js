import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scene/games-scenes';
import BootScene from './scene/boot-scene';
import PreloaderScene from './scene/preloader-scene';
import TitleScene from './scene/title-scene';
import OptionsScene from './scene/options-scene';
import CreditsScene from './scene/credits-scene';
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
    this.scene.start('Boot');
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

window.game = new Game();
