import { Scene } from 'phaser'

export default class Cadrane extends Scene {
    line;
    text;
    points;
    lines;
    fgraphics;
    mgraphics;
    stanga;
    dreapta;
    sus;
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
       this.text = this.add.text(100, 50, '');
   
       // Create the bigger circle
       var biggerCircle = this.add.circle(400, 300, 180, 0xadd8e6);
       biggerCircle.setStrokeStyle(2, 0x0000ff);
   
       // Create the smaller circle
       var smallerCircle = this.add.circle(400, 300, 140, 0xadd8e6);
       smallerCircle.setStrokeStyle(2, 0x0000ff);

       this.fgraphics = this.add.graphics();

       this.fgraphics.lineStyle(40, 0x0000ff, 1);

       //  Without this the arc will appear closed when stroked
       this.fgraphics.beginPath();

       this.fgraphics.arc(400, 300, 160, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(270), false);

       this.fgraphics.strokePath();

       this.fgraphics.beginPath();
       this.fgraphics.arc(400, 300, 160, Phaser.Math.DegToRad(20), Phaser.Math.DegToRad(70), false);

       this.fgraphics.strokePath();

       /*this.line=this.add.line(400, 300, 0, 0, 140, 0, 0xff66ff);
       line.setOrigin(0.0,0.0)*/


       this.lines = [
        new Phaser.Geom.Line(400, 300, 400, 160)
  
    ];

    this.points = [
        this.lines[0].getPointA()

    ];
    this.mgraphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }, fillStyle: { color: 0x0000aa } });

    this.stanga = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update(){
         
        this.mgraphics.clear();
        var unghi;
        for (let i = 0; i < this.lines.length; i++)
        {
            Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], 0.01);

            this.mgraphics.strokeLineShape(this.lines[i]);
            var angle = Phaser.Geom.Line.Angle(this.lines[i]);
           
            if(angle<0) 
                unghi=360+Phaser.Math.RadToDeg(angle)
            else
                unghi=Phaser.Math.RadToDeg(angle)
           // this.text.setText(`${unghi}`);
          
        }

        if (Phaser.Input.Keyboard.JustDown(this.stanga)){
             console.log('STANGA')
            if((unghi>=20&&unghi<=70)||(unghi>=180&&unghi<=270)){
                this.text.setText('CORECT')
            }
            else {
                this.text.setText('INCORECT')
            }
        }
    }
} 