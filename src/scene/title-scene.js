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
  }
}