import {game} from './game'

export const initialize = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.physics.startSystem(Phaser.Physics.ARCADE)
  },
  preload: () => {
    game.load.image('sky', '../assets/sky.png')
    game.load.image('ground', '../assets/grass.gif')
    game.load.image('heart', '../assets/heart.gif')
    game.load.image('player', '../assets/king32.png', 32, 48)
    game.load.image('sword', '../assets/sword.png', 32, 48)
  },
  create: () => {
    game.stage.backgroundColor = 'red'
    game.state.start('play')
  },
  update: () => {},
}
