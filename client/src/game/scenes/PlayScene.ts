import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
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
          if (countdownDuration > 0)   countdownText.setText(''+countdownDuration);

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
  }
}
