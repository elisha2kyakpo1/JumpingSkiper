import Phaser from 'phaser';
import { getUserScores } from '../API/leader-board';
import Button from '../objects/button';
import topScores from '../scores/topScores';

export default class LeaderboardScene extends Phaser.Scene {
  init(data) {
    this.score = data.score;
  }

  constructor() {
    super('Leaderboard');
  }

  async create() {
    this.add.text(180, 100, 'Leaderboard', { fontSize: '45px' });
    this.scores = await getUserScores();
    this.topScores = topScores(this.scores.result);

    this.add.text(100, 200, `1) ${this.topScores[0].user} - ${this.topScores[0].score}`, { fontSize: '32px' });
    this.add.text(100, 250, `2) ${this.topScores[1].user} - ${this.topScores[1].score}`, { fontSize: '32px' });
    this.add.text(100, 300, `3) ${this.topScores[2].user} - ${this.topScores[2].score}`, { fontSize: '32px' });

    if (this.score) {
      const myPos = (this.topScores, this.score);
      this.add.text(100, 350, 'Your Score', { fontSize: '25px' });
      this.add.text(100, 400, `${myPos}) ${this.topScores[myPos - 1].user} - ${this.topScores[myPos - 1].score}`, { fontSize: '32px' });
    }
    this.homeButton = new Button(this, 320, 500, 'blueButton1', 'blueButton2', 'Home', 'Title');
  }
}