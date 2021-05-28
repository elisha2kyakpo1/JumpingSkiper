import Phaser from 'phaser';
import Button from '../objects/button';

const width = 640;
const height = 640;
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(this, width / 2, height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, width / 2, height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, width / 2, height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    this.creditsButton = new Button(this, width / 2, height / 2 + 200, 'blueButton1', 'blueButton2', 'Leaderboad', 'Leaderboard');
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}