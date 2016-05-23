export class Powerups {
  constructor(game) {
    this.game = game
    this.nextSpawnAt = 0
  }

  create() {
    this.hearts = this.game.add.group()
    this.hearts.enableBody = true
    this.game.time.events.loop(5000, this.recycle, this)
  }

  update() {}

  spawn(player, object) {
    if (this.nextSpawnAt > this.game.time.now) {
      return
    }
    this.nextSpawnAt = this.game.time.now + 15000 - player.speed * 100

    const numberOfBlocks = Math.random() * (2 - (player.speed / 20)) + (player.speed / 20)

    console.info('Number of hearts to spawn:', Math.ceil(numberOfBlocks))
    console.info('Spawning \u2665 at game time:', this.nextSpawnAt)

    for (let i = 0; i < Math.ceil(numberOfBlocks); i++) {
      let heart = this.hearts.create(Math.random() * (i * 350 - 350) + 350, 0, 'heart')
      heart.body.gravity.y = 400 + player.speed * 6
      heart.body.bounce.y = 0.7 + Math.random() * 0.2
    }
  }

  recycle() {
    if (this.hearts.x > this.game.world.width) {
      this.hearts.kill()
    }
  }
}
