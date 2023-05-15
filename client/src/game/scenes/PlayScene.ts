import { Scene } from 'phaser'
import eventsCenter from './EventsCenter'
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
          that.afiseazaIntrebare(that.index)
        }
    });

   


  }

  update () {

    if (this.cursors.down.isDown){
      console.log('cursor down')
     
    }
  }
}
