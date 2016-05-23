import 'pixi.js'
import 'p2'
import * as Phaser from 'phaser'

import {game} from './game'
import {initialize} from './initialize'
import {play} from './play'

game.state.add('initialize', initialize)
game.state.add('play', play)
game.state.start('initialize')
