import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    parent: 'phaser-Game',
    width: 800,
    height: 600,
    dom: {
      createContainer: true,
    },
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};
