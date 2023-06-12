import { Scene } from 'phaser'
import {useCandidatStore} from '@/store/StoreCandidat'
import eventsCenter from './EventsCenter'
import sky from '@/game/assets/sky.png'
//import bomb from '@/game/assets/bomb.png'
import butonstart from '@/game/assets/butonstart.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import Cadrane from './Cadrane'



export default class BootScene extends Scene {
  
  testdata={};

  constructor () {
    super({ key: 'BootScene' })
    this.candidat = useCandidatStore()
    console.log('Boot scene created')
    this.testdata.items=[
      /*{
        item:'Care este culoarea ta preferata?',
        type:'static',
        subitems:['1. Albastru','2. Rosu','3. Verde','4. Negru']
      },
      {
        item:'Unde ati prefera sa va petreceti concediul?',
        type:'static',
        subitems:['1. Intr-o tara nordica, rece!','2. Aproape de casa!','3. Intr-o zona calda, la mare!','4. La munte pentru a practica sport extrem!']
      },*/
      {
        item:'cadrane',
        type:'dinamic',
        subitems:[]
      }

   ]



  }
  
  preload () {
    this.load.image('sky', sky)
    this.load.image('buton_start',butonstart)
    //this.load.image('bomb', bomb)
    this.load.audio('thud', [thudMp3, thudOgg])
  }

  create () {
  //  this.text = this.add.text(100, 50, 'Nume: '+this.candidat.numecandidat);

 eventsCenter.emit('date-sosite',this.testdata.items) 
   const btn= this.add.image(800,1000,'buton_start')
   
   btn.setInteractive()

   btn.on('pointerdown',()=>{
   console.log(this.candidat.numecandidat)
    //this.scene.run('PlayScene')
    this.scene.add('cadrane',Cadrane,true,{
      durataRepriza:120000,
      durataAntrenament:60000,
      instructiuni:[{
        text:'Priviti ecranul, observati existenta unor cadrane care au pe margine zone mai inchise la culoare. Intre cadrane se afla o banda albastra'
      },
      {
        text:'Sarcina dvs. va fi sa urmariti acele care se rotesc continuu. Cand oricare dintre ace atinge o zona albastra, va trebui sa apasati o anumita tasta, corespunzatoare acelui cadran. Tastele vor fi precizate mai tarziu.'
      },
    {
      text:'La rindul ei, banda albastra dintre cadrane incepe sa-si schimbe culoarea la anumite intervale. Si in acest caz va trebui sa actionati o tasta imediat ce veti observa acest lucru.'
    },{
      text:'Tastele care trebuie actionate sunt urmatoarele:',
      subtextstanga:'pentru BANDA tasta BLANK, actionata cu mana stanga',
      subtextdreapta:'pentru CADRANE tastele cursor actionate cu 3 degete de la mana dreapta'
    },{
      text:'RETINETI: Urmariti simultan toate cadranele si banda. Apasati "sagetile" numai cind acele intra pe zonele albastre. Apasati BLANK numai cind banda incepe sa isi schimbe culoarea. Orice alte apasari sunt erori. Omiterea apasarilor necesare este considerata eroare. \nApasati B pentru inceperea unei reprize de antrenament>' 
    }],
      cadrane:[
      {
        nume:'cadran_sus',
        centruX:800,
        centruY:300,
        razaMare:180,
        razaMica:140,
        segmente:[{start:40,stop:70},{start:113,stop:143},{start:170,stop:200},{start:235,stop:270},{start:280,stop:290},{start:330,stop:12}],
        viteza:0.0033
      },
      {
        nume:'cadran_stinga',
        centruX:380,
        centruY:620,
        razaMare:180,
        razaMica:140,
        segmente:[{start:0,stop:90},{start:165,stop:212},{start:250,stop:290}],
        viteza:-0.0033
      },
      {
        nume:'cadran_dreapta',
        centruX:1220,
        centruY:620,
        razaMare:180,
        razaMica:140,
        segmente:[{start:20,stop:45},{start:75,stop:155},{start:210,stop:280},{start:330,stop:360}],
        viteza:-0.0033
      }],
      bara:{
        x:620,
        y:720,
        scalare:7,
        durata:3000,
        pauza:7000
      }
    }
    )
    btn.setVisible(false)
   
   })

   // this.scene.start('PlayScene')
   
  }
}
