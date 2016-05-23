const innerWidth = window.innerWidth
const innerHeight = window.innerHeight
const gameRatio = innerWidth/innerHeight
export const game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO, '')
