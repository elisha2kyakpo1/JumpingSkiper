/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("const preload = () => {\n  this.load.image('sky', './dist/assets/sky.png');\n  this.load.image('ground', './dist/assets/platform.png');\n  this.load.image('star', './dist/assets/star.png');\n  this.load.image('bomb', './dist/assets/bomb.png');\n  this.load.spritesheet('dude', './dist/assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n};\n\nconst config = {\n  type: Phaser.AUTO,\n  width: 800,\n  height: 600,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: { y: 300 },\n      debug: false,\n    },\n  },\n  scene: {\n    preload: () => preload,\n    create: () => create,\n    update: () => update\n  },\n};\n\nlet player;\nlet stars;\nlet bombs;\nlet platforms;\nlet cursors;\nlet score = 0;\nlet gameOver = false;\nlet scoreText;\n\nlet game = new Phaser.Game(config);\n\nconst create = () => {\n  //  A simple background for our game\n  this.add.image(400, 300, 'sky');\n\n  //  The platforms group contains the ground and the 2 ledges we can jump on\n  platforms = this.physics.add.staticGroup();\n\n  //  Here we create the ground.\n  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)\n  platforms.create(400, 568, 'ground').setScale(2).refreshBody();\n\n  //  Now let's create some ledges\n  platforms.create(600, 400, 'ground');\n  platforms.create(50, 250, 'ground');\n  platforms.create(750, 220, 'ground');\n\n  // The player and its settings\n  player = this.physics.add.sprite(100, 450, 'dude');\n\n  //  Player physics properties. Give the little guy a slight bounce.\n  player.setBounce(0.2);\n  player.setCollideWorldBounds(true);\n\n  //  Our player animations, turning, walking left and walking right.\n  this.anims.create({\n    key: 'left',\n    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n    frameRate: 10,\n    repeat: -1,\n  });\n\n  this.anims.create({\n    key: 'turn',\n    frames: [{ key: 'dude', frame: 4 }],\n    frameRate: 20,\n  });\n\n  this.anims.create({\n    key: 'right',\n    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n    frameRate: 10,\n    repeat: -1,\n  });\n\n  //  Input Events\n  cursors = this.input.keyboard.createCursorKeys();\n\n  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis\n  stars = this.physics.add.group({\n    key: 'star',\n    repeat: 11,\n    setXY: { x: 12, y: 0, stepX: 70 },\n  });\n\n  stars.children.iterate((child) => {\n  //  Give each star a slightly different bounce\n    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n  });\n\n  bombs = this.physics.add.group();\n\n  //  The score\n  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });\n\n  //  Collide the player and the stars with the platforms\n  this.physics.add.collider(player, platforms);\n  this.physics.add.collider(stars, platforms);\n  this.physics.add.collider(bombs, platforms);\n\n  this.physics.add.overlap(player, stars, collectStar, null, this);\n\n  this.physics.add.collider(player, bombs, hitBomb, null, this);\n};\n\nconst update = () => {\n  if (gameOver) {\n    return;\n  }\n\n  if (cursors.left.isDown) {\n    player.setVelocityX(-160);\n    player.anims.play('left', true);\n  } else if (cursors.right.isDown) {\n    player.setVelocityX(160);\n\n    player.anims.play('right', true);\n  } else {\n    player.setVelocityX(0);\n\n    player.anims.play('turn');\n  }\n\n  if (cursors.up.isDown && player.body.touching.down) {\n    player.setVelocityY(-330);\n  }\n};\n\nconst collectStar = (player, star) => {\n  star.disableBody(true, true);\n\n  //  Add and update the score\n  score += 10;\n  scoreText.setText(`Score: ${score}`);\n\n  if (stars.countActive(true) === 0) {\n    //  A new batch of stars to collect\n    stars.children.iterate((child) => {\n      child.enableBody(true, child.x, 0, true, true);\n    });\n\n    const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);\n\n    const bomb = bombs.create(x, 16, 'bomb');\n    bomb.setBounce(1);\n    bomb.setCollideWorldBounds(true);\n    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);\n    bomb.allowGravity = false;\n  }\n};\n\nconst hitBomb = (player, bomb) => {\n  this.physics.pause();\n\n  player.setTint(0xff0000);\n\n  player.anims.play('turn');\n\n  gameOver = true;\n};\n\n//# sourceURL=webpack://phaser3-game/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;