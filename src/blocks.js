export class Blocks {
  constructor(game) {
    this.game = game
    this.nextSpawnAt = 0
  }

  create() {
    this.group = this.game.add.group()
    this.group.enableBody = true
    this.group.physicsBodyType = Phaser.Physics.ARCADE
    this.group.createMultiple(3, 'sword', 0, false)

    this.game.time.events.loop(5000, this.recycle, this)
  }

  update() {}

  spawn(player, object) {
    if (this.nextSpawnAt > this.game.time.now) {
      return
    }
    console.info('Spawning new sword')
    this.nextSpawnAt = this.game.time.now + 2000 - player.speed * 30
    var newSword = this.group.getFirstDead()
    var random = this.game.rnd.integerInRange(45, this.game.world.height)
    if (newSword) {
      newSword.reset(-120, random)
      newSword.body.gravity.y = 400 + player.speed
      newSword.body.gravity.x = 800 + player.speed
    }
  }

  recycle() {
    const child = this.group.getFirstAlive()
    if (child !== null && child.x > this.game.world.width) {
      child.kill()
    }
  }
}
