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
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.start('Game');
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

const Config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 640,
  height: 640,
  zoom: 1,
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [
    BootScene,
    GameScene,
    PreloaderScene,
    TitleScene,
    CreditsScene,
    OptionsScene,
  ],
};

// eslint-disable-next-line no-new
// new Phaser.Game(gameConfig);
window.game = new Game(Config);
