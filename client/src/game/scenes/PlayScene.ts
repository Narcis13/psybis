import { Scene } from 'phaser'
import eventsCenter from './EventsCenter'
import Cadrane from './Cadrane'

export default class PlayScene extends Scene {
  index =0
  items={}
  questionText =null
  answerTexts = []
  constructor () {
    console.log('Play Scene constructor')
    super({ key: 'PlayScene' })
    this.index=0
    var that = this
    eventsCenter.on('date-sosite',(items)=>{
      console.log('Eveniment date sosiste receptionat',items)
      that.items=items
    })

  }

  init(){
    console.log('init')
    
   this.cursors = this.input.keyboard.createCursorKeys()


  }

   afiseazaIntrebare(idx:number){
    console.log('afisez intrebare',idx)
    var question = this.items[idx].item;
    var answerOptions = this.items[idx].subitems;
    this.questionText.setText(question)
    let i=0
    answerOptions.map((answer=>{
      this.answerTexts[i].setText(answer)
      i++
    }))
   // var correctAnswerIndex = 0; // Index of the correct answer in answerOptions
    

   }

  create () {
    console.log('PlayScene a fost creata')
    

    this.questionText = this.add.text(800, 200, '', { font: "72px Arial", color: "#ffffff", align: "center" ,wordWrap:{width:1600}});
    this.questionText.setOrigin(0.5, 0.5);

    // Create the answer option texts
   //console.log(this.items[this.index])
    for (var i = 0; i < this.items[0].subitems.length; i++) {
        var answerText = this.add.text(400, 300 + (i * 50), '', { font: "24px Arial", color: "#ffffff", align: "left" });
        answerText.setOrigin(0.0, 0.5);
        this.answerTexts.push(answerText);
        
        // Set up a click event for each answer option
        answerText.setInteractive();
 
      }
      this.afiseazaIntrebare(this.index)
    var that = this

      this.input.on('gameobjectdown', function ( go) {
        console.log('gameObject clicked',that.index)
        if(that.index<that.items.length-1){
          that.index++
          if(that.items[that.index].type=='static'){
            that.afiseazaIntrebare(that.index)
          }
          else {
            //aici incarc dinamic o scena...
           // console.log('Incerc sa lansez scena dinamica',that.items[that.index].item)
            that.scene.add(that.items[that.index].item,Cadrane,false,[
              {
                nume:'cadran_sus',
                centruX:800,
                centruY:300,
                razaMare:180,
                razaMica:140,
                segmente:[{start:34,stop:83},{start:115,stop:145},{start:175,stop:230},{start:280,stop:330}],
                viteza:0.01
              },
              {
                nume:'cadran_stinga',
                centruX:380,
                centruY:620,
                razaMare:180,
                razaMica:140,
                segmente:[{start:20,stop:70},{start:180,stop:255}],
                viteza:-0.008
              },
              {
                nume:'cadran_dreapta',
                centruX:1220,
                centruY:620,
                razaMare:180,
                razaMica:140,
                segmente:[{start:42,stop:52},{start:110,stop:125},{start:280,stop:320}],
                viteza:-0.006
              }
            ])
            that.scene.switch(that.items[that.index].item)
          }
         
        }
    });

   


  }

  update () {

    if (this.cursors.down.isDown){
      console.log('cursor down')
     
    }
  }
}
