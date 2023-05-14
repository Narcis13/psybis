import { Scene } from 'phaser'
import eventsCenter from './EventsCenter'
import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import butonstart from '@/game/assets/butonstart.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'

export default class BootScene extends Scene {
  
  testdata={}
  
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
   this.testdata.items=[
      {
        item:'Care este culoarea ta preferata?',
        type:'static',
        subitems:['1. Albastru','2. Rosu','3. Verde','4. Negru']
      },
      {
        item:'Unde ati prefera sa va petreceti concediul?',
        type:'static',
        subitems:['1. Intr-o tara nordica, rece!','2. Aproape de casa!','3. Intr-o zona calda, la mare!','4. La munte pentru a practica sport extrem!']
      }

   ]
 

   const btn= this.add.image(800,1000,'buton_start')
   btn.setInteractive()
   btn.on('pointerdown',()=>{
    eventsCenter.emit('date-sosite',this.testdata.items) 
    this.scene.run('PlayScene')
    btn.setVisible(false)
   })
   // this.scene.start('PlayScene')
   
  }
}
