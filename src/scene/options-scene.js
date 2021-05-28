import Phaser from 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(300, 200, 'checkedBox');
    this.musicText = this.add.text(340, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(300, 260, 'checkedBox');
    this.soundText = this.add.text(340, 250, 'Sound Enabled', { fontSize: 24 });

    this.text = this.add.text(300, 300, 'Game Instructions', { fontSize: 40 });
    this.soundText = this.add.text(300, 350, 'Use Arrow keys on your key board to play the game!', { fontSize: 16 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
    });

    this.menuButton = new Button(this, 400, 450, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        // this.sys.game.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}