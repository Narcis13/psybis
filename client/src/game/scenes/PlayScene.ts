import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  index 
  questionText =null

  constructor () {
    super({ key: 'PlayScene' })
    this.index=0
  }

init(){
  console.log('init')
this.cursors = this.input.keyboard.createCursorKeys()
}

   afiseazaIntrebare(){
    //console.log('afisez intrebare')
    var question = "What is the capital of France?  ";
    var answerOptions = ["Paris", "Madrid", "Rome", "Berlin"];
    var correctAnswerIndex = 0; // Index of the correct answer in answerOptions
    
    this.questionText = this.add.text(800, 200+Math.random()*20, question, { font: "72px Arial", color: "#ffffff", align: "center" ,wordWrap:{width:1600}});
    this.questionText.setOrigin(0.5, 0.5);

    // Create the answer option texts
    var answerTexts = [];
    for (var i = 0; i < answerOptions.length; i++) {
        var answerText = this.add.text(400, 300 + (i * 50), answerOptions[i], { font: "24px Arial", color: "#ffffff", align: "center" });
        answerText.setOrigin(0.5, 0.5);
        answerTexts.push(answerText);
        var that=this
        // Set up a click event for each answer option
        answerText.setInteractive();
        this.input.on('gameobjectdown', function (pointer, gameObject) {
            if (answerTexts.indexOf(gameObject) === correctAnswerIndex) {
                // The clicked answer is correct, so remove the question and answer texts
                that.questionText.setVisible(false)
               // questionText.destroy();
                for (var i = 0; i < answerTexts.length; i++) {
                    answerTexts[i].destroy();
                }
                that.index++
              //  that.afiseazaIntrebare();
            }
        });
      }
   }

  create () {
    /*this.add.image(400, 300, 'sky')

    const bomb = this.physics.add.image(400, 200, 'bomb')
    bomb.setCollideWorldBounds(true)
    bomb.body.onWorldBounds = true // enable worldbounds collision event
    bomb.setBounce(1)
    bomb.setVelocity(200, 20)

    this.sound.add('thud')
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', { volume: 0.75 })
    })*/

    var countdownDuration=10;
    var countdownText = this.add.text(400, 300, ''+countdownDuration, { font: "144px Arial", color: "#ffffff", align: "center" });
    countdownText.setOrigin(0.5, 0.5);
    countdownText.setScale(1.5, 1.5);
    var that=this
    var timer = this.time.addEvent({
        delay: 1000,
        callback: function() {
            countdownDuration--;
          //  console.log(countdownDuration)
          if (countdownDuration > 0)  {
            countdownText.setText(''+countdownDuration)
          }  
          else
          countdownText.destroy()
          if(countdownDuration==0) {
            countdownText.destroy()
            this.afiseazaIntrebare()
          };

            var prevCountdownText = countdownText;

            if (countdownDuration >= 0) {
                countdownText = that.add.text(400, 300, ''+countdownDuration, { font: "144px Arial", color: "#ffffff", align: "center" });
                countdownText.setOrigin(0.5, 0.5);
                countdownText.setScale(1.5, 1.5);
                countdownText.setAlpha(1);

                that.tweens.add({
                    targets: prevCountdownText,
                    alpha: 0,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    duration: 500,
                    onComplete: function() {
                        prevCountdownText.destroy();
                    }
                });
            }
        },
        callbackScope: that,
        repeat: countdownDuration
    });
  }

  update () {

    if (this.cursors.down.isDown){
      console.log('cursor down')
      this.questionText.setVisible(true)
    }
  }
}
