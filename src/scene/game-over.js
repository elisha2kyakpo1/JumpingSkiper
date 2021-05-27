import Phaser from 'phaser';
// import topScores from '../scores/topScores';

export default class EndGameScene extends Phaser.Scene {
  // init(data) {
  //   this.scoreText = this.add.text(220, 120, `Your score is ${data.score}`);
  //   this.score = data.score;
  // }

  constructor() {
    super('Endgame');
  }

  create() {
    this.nameInput = this.add.dom(320, 320).createFromCache('form');
    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('down', async () => {
      const name = this.nameInput.getChildByName('name');
      if (name.value !== '') {
        await postUserScore(name.value, this.score);
        name.value = '';
        if (this.error) this.error.destroy();
        this.scene.start('Leaderboard', { score: this.score });
      } else {
        this.error = this.add.text(320, 220, 'Please enter name');
      }
    });
  }
}