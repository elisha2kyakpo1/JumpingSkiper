import Phaser from 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(250, 100, 'Game Instructions', { fontSize: 40 });
    this.soundText = this.add.text(250, 200, 'Use Arrow keys on your key board to play the game!', { fontSize: 16 });

    this.menuButton = new Button(this, 400, 300, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}