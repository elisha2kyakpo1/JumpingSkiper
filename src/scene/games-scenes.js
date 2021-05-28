import Phaser from 'phaser';
import Button from '../objects/button';

let stars;
let cursors;
let player;
let scoreText;
let score = 0;
let bombs;
let gameOverText;
const width = 640;
const height = 640;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');
    const platforms = this.physics.add.staticGroup();
    // this.cameras.main.startFollow(player, true);

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    gameOverText = this.add.text(400, 300, 'Game Over!', { fontSize: '55px', fill: '#9f1239' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(300);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${score}`);
    if (stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
        scoreText.setText(`Score: ${score + 10}`);
      });

      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      const bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
    this.gameOver = true;
    gameOverText.visible = true;
    this.gameButton = new Button(this, width / 2, height / 1.09 - 100, 'blueButton1', 'blueButton2', 'Restart!', 'Boot');
  }
}
