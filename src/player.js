export class Player {
  constructor(game) {
    this.game = game
    this.speed = 20
    this.lives = 3
    this.isDead = false
    this.canMove = true
    this.cursors = null
    this.character = null
  }

  create(cursors) {
    this.character = this.game.add.sprite(32, this.game.world.height - 150, 'player')
    this.game.physics.arcade.enable(this.character)
    this.character.body.bounce.y = 0.2
    this.character.body.gravity.y = 300
    this.character.body.collideWorldBounds = true
    this.group = this.game.add.group()

    // Start the player Physics
    this.game.physics.arcade.enable(this.character, Phaser.Physics.ARCADE)
  }

  update(cursors) {
    this.cursors = cursors

    this.game.camera.x += 4
    this.character.body.velocity.x = 150 + this.speed

    if (this.cursors.up.isDown && this.character.body.touching.down) {
      this.character.body.velocity.y = -200
    }

    if (this.cursors.right.isDown) {
      this.character.body.velocity.x = 190
    }

    if (this.cursors.down.isDown) {
      this.character.body.velocity.y = 180
    }

    this.speed += 0.08

    if (this.lives < 1) {
      if (!this.isDead) {
        this.character.body.velocity.x = 0
        // Would be nice to play a death sound here.
      }
      this.isDead = true
    }
  }

  onHit(player, object) {
    console.info('Collecting:', object.key)
    if (object.key === 'heart') {
      object.kill()
      // Would be nice to play a powerup sound here.
      if (player.lives < 3) {
        player.lives += 1
      }
    } else {
      // Would be nice to play a little destruction sound here.
      object.kill()
      player.lives -= 1
    }
    console.info('Lives:', player.lives)
  }

  move(pointer) {
    if (this.canMove) {
      this.canMove = false
    }
  }

  decreaseLives() {
    this.lives -= 1
  }
}
