import Phaser from 'phaser';

export default class EndGameScene extends Phaser.Scene {
  init(data) {
    this.scoreText = this.add.text(220, 120, `Your score is ${data.score}`);
    this.score = data.score;
  }

  constructor() {
    super('Endgame');
  }
}