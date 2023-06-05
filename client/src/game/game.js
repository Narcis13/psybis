import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene.js'
import PlayScene from '@/game/scenes/PlayScene.js'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }
