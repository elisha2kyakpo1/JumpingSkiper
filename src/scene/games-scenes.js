import Phaser from 'phaser';
// import Button from '../objects/button';

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

      // this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, LEVEL_HEIGHT);
      this.cameras.main.startFollow(player, true);
      // this.cameras.main.setZoom(0.75);
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

  // create() {
  //   // background color
  //   // this.stage.backgroundColor = '#6bf';

  //   // scaling
  //   // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //   // this.scale.maxWidth = this.game.width;
  //   // this.scale.maxHeight = this.game.height;
  //   // this.scale.pageAlignHorizontally = true;
  //   // this.scale.pageAlignVertically = true;
  //   // this.scale.setScreenSize(true);

  //   // physics
  //   // this.physics.startSystem(Phaser.Physics.ARCADE);

  //   // camera and platform tracking vars
  //   this.cameraXMin = 99999;
  //   this.platformXMin = 99999;

  //   // create platforms
  //   this.platformsCreate();

  //   // create hero
  //   this.heroCreate();

  //   // cursor controls
  //   this.cursor = this.input.keyboard.createCursorKeys();
  // }

  // update() {
  //   // this is where the main magic happens
  //   // the x offset and the width of the world are adjusted
  //   // to match the furthest point the hero has reached
  //   this.scene.setBounds(-this.hero.xChange,
  //     0, this.scene.width + this.hero.xChange, this.game.height);

  //   // the built in camera follow methods won't work for our needs, we create a custom one

  //   this.cameraXMin = Math.min(this.cameraXMin, this.hero.x - this.game.width + 130);
  //   this.camera.x = this.cameraXMin;

  //   // hero collisions and movement
  //   this.physics.arcade.collide(this.hero, this.platforms);
  //   this.heroMove();

  //   // these are pooled so they are very performant
  //   this.platforms.forEachAlive((elem) => {
  //     this.platformXMin = Math.min(this.platformXMin, elem.x);
  //     if (elem.x > this.camera.x + this.game.width) {
  //       elem.kill();
  //       this.platformsCreateOne(this.platformXMin - 70, this.scene.height - 50, 50);
  //     }
  //   }, this);
  // }

  // shutdown() {
  //   // reset everything, or the world will be messed up
  //   this.scene.setBounds(0, 0, this.game.width, this.game.height);
  //   this.cursor = null;
  //   this.hero.destroy();
  //   this.hero = null;
  //   this.platforms.destroy();
  //   this.platforms = null;
  // }

  // platformsCreate() {
  //   // platform basic setup
  //   this.platforms = this.add.group();
  //   this.platforms.enableBody = true;
  //   this.platforms.createMultiple(10, 'pixel');

  //   // create a batch of platforms that start to move across the level
  //   for (let i = 0; i < 9; i += 1) {
  //     this.platformsCreateOne(this.scene.width - 70 - 70 * i, this.scene.height - 50, 50);
  //   }
  // }

  // platformsCreateOne(x, y, width) {
  //   // this is a helper function since writing all of this out can get verbose elsewhere
  //   const platform = this.platforms.getFirstDead();
  //   platform.reset(x, y);
  //   platform.scale.x = width;
  //   platform.scale.y = 16;
  //   platform.body.immovable = true;
  //   return platform;
  // }

  // heroCreate() {
  //   // basic hero setup
  //   this.hero = game.add.sprite(this.scene.centerX, this.scene.height - 69, 'hero');
  //   this.hero.anchor.set(0.5);

  //   // track where the hero started and how much the distance has changed from that point
  //   this.hero.xOrig = this.hero.x;
  //   this.hero.xChange = 0;

  //   // hero collision setup
  //   // disable all collisions except for down
  //   this.physics.arcade.enable(this.hero);
  //   this.hero.body.gravity.y = 500;
  //   this.hero.body.checkCollision.up = false;
  //   this.hero.body.checkCollision.left = false;
  //   this.hero.body.checkCollision.right = false;
  // }

  // heroMove() {
  //   // handle the left and right movement of the hero
  //   if (this.cursor.left.isDown) {
  //     this.hero.body.velocity.x = -400;
  //   } else if (this.cursor.right.isDown) {
  //     this.hero.body.velocity.x = 400;
  //   } else {
  //     this.hero.body.velocity.x = 0;
  //   }

  //   // handle hero jumping
  //   if (this.cursor.up.isDown && this.hero.body.touching.down) {
  //     this.hero.body.velocity.y = -350;
  //   }

  //   // wrap world coordinated so that you can warp from top to bottom
  //   this.scene.wrap(this.hero, this.hero.width / 2, false);

  //   // track the maximum amount that the hero has travelled
  //   this.hero.xChange = Math.max(this.hero.xChange, Math.abs(this.hero.x - this.hero.xOrig));
  // }
}

// const game = new Phaser.Game(500, 300, Phaser.CANVAS, '');
// game.state.add('Play', Jumper.Play);
// game.state.start('Play');