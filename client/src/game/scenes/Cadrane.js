import { Scene } from 'phaser'

export default class Cadrane extends Scene {

    constructor(){
        super({ key: 'cadrane' })
        console.log('Scena cadrane')
    }
    init(config){
        console.log('Init Cadrane',config)

    }
    preload(){


    }

    create(){
       // this.add.text(400, 300 , 'cadrane!!!', { font: "24px Arial", color: "#ffffff", align: "left" });

   
       // Create the bigger circle
       var biggerCircle = this.add.circle(400, 300, 180, 0xadd8e6);
       biggerCircle.setStrokeStyle(2, 0x0000ff);
   
       // Create the smaller circle
       var smallerCircle = this.add.circle(400, 300, 140, 0xadd8e6);
       smallerCircle.setStrokeStyle(2, 0x0000ff);

       const graphics = this.add.graphics();

       graphics.lineStyle(40, 0x0000ff, 1);

       //  Without this the arc will appear closed when stroked
       graphics.beginPath();

       graphics.arc(400, 300, 160, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(270), false);

       graphics.strokePath();

       graphics.beginPath();
       graphics.arc(400, 300, 160, Phaser.Math.DegToRad(300), Phaser.Math.DegToRad(350), false);

       graphics.strokePath();

       this.add.line(400, 300, 0, 0, 140, 0, 0xff66ff);
    }

    update(){

    }
} 