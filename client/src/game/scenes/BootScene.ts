import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import butonstart from '@/game/assets/butonstart.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('buton_start',butonstart)
    this.load.image('bomb', bomb)
    this.load.audio('thud', [thudMp3, thudOgg])
  }

  create () {
   const btn= this.add.image(800,1000,'buton_start')
   btn.setInteractive()
   btn.on('pointerdown',()=>{
    this.scene.start('PlayScene')
   })
   // this.scene.start('PlayScene')
   
  }
}
