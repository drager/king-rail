import {game} from './game'
import {Player} from './player'
import {Powerups} from './powerups'
import {Blocks} from './blocks'

export const play = {
  create: function() {
    game.world.setBounds(-20, -20, 10000, game.height + 20)

    this.sky = game.add.tileSprite(0, 0, 1600, game.height - 30, 'sky')
    this.sky.autoScroll(-20, 0)
    this.platforms = game.add.group()
    this.platforms.enableBody = true
    this.tileWidth = this.game.cache.getImage('ground').width
    this.tileHeight = this.game.cache.getImage('ground').height

    this.platforms.createMultiple(250, 'ground')

    // Create the initial platform
    this.initPlatforms()

    // this.timer = game.time.events.loop(2000, this.addPlatform, this)

    this.cursors = game.input.keyboard.createCursorKeys()

    this.distanceCounter = 0
    this.distanceTraveled = game.add.text(10, 50, this.distanceCounter + 'm', {
      fontSize: 42,
      fill: '#ffffff'
    })

    this.gameover = game.add.text(game.world.centerX, game.world.centerY, '', {
      font: "bold 42px Roboto",
      fill: "#f44336", boundsAlignH: "center", boundsAlignV: "middle"
    })

    this.spacing = 20

    // Initialize the player
    this.player = new Player(game)
    this.player.create()
    this.character = this.player.character

    // Initialize the powerups!
    this.powerups = new Powerups(game)
    this.powerups.create()
    this.hearts = this.powerups.hearts

    // Initialize the blocks.
    this.blocksInstance = new Blocks(game)
    this.blocksInstance.create()
    this.blocks = this.blocksInstance.blocks


    this.game.time.events.loop(100, () => {
      this.blocksInstance.spawn(this.player)
    } , this)

    if (!this.lifeBar) {
      this.lifeBar = game.add.image()
    }
  },
  initPlatforms: function() {
    const bottom = this.game.world.width - this.tileWidth
    const top = this.tileHeight

     console.log('adding initial')

    //Keep creating platforms until they reach (near) the top of the screen
    for (let y = bottom; y > top - this.tileWidth; y = y - this.spacing) {
      this.addPlatform(0, game.world.height - 52)
    }

  },
  addTile: function(x, y) {

    console.log('Adding tile:', x, y)
    //Get a tile that is not currently on screen
    var tile = this.platforms.getFirstDead()

    if (tile) {
      // Reset it to the specified coordinates
      tile.reset(x, y)
      // tile.body.velocity.x = game.world.height - 52
      tile.body.velocity.y = 0
      tile.body.immovable = true

      // When the tile leaves the screen, kill it
      tile.checkWorldBounds = true
      tile.outOfBoundsKill = true
    }
  },
  addPlatform: function(y) {
    if (typeof(y) == "undefined") {
      y = 0
    }

    console.info('Adding platform at:', y)

    // Work out how many tiles we need to fit across the whole screen
    const tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth)

    // Add a hole randomly somewhere
    const hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1

    for (let i = 0; i < tilesNeeded; i++) {
      if (i != hole && i != hole + 1) {
        this.addTile(i * this.tileWidth, game.world.height - 52, 0)
      }
    }
  },
  updateLives: function(lives) {
    let x = 16
    for (let i = 0; i < lives; i++) {
      this.lifeBar.image = game.add.image(x * i, 16, 'heart')
    }
  },
  update: function() {
    game.physics.arcade.collide(this.character, this.platforms)
    game.physics.arcade.collide(this.hearts, this.blocks)
    game.physics.arcade.collide(this.blocks, this.platforms)
    game.physics.arcade.collide(this.hearts, this.platforms)
    game.physics.arcade.overlap(this.character, this.hearts,
      (_, heart) => this.player.onHit(this.player, heart))
    game.physics.arcade.overlap(this.blocks, this.character,
      (_, ground) => this.player.onHit(this.player, ground))

    game.camera.follow(this.character)

    // game.world.wrap(this.player, -(this.game.width/2), false, true, false)

    this.updateLives(this.player.lives)
    this.player.update(this.cursors)

    if (this.player.isDead) {
      this.gameover.text = 'Game over...'
    } else {
      this.distanceCounter += this.player.speed / 150
      this.distanceTraveled.text = Math.ceil(this.distanceCounter) + 'm'
    }

    // This will spawn new awesome powerups such as new lives.
    // this.powerups.spawn(this.player)

    // This will spawn new blocks which the player can collide with
    // and lose lives.
    // this.blocksInstance.spawn(this.player)
  },
}
