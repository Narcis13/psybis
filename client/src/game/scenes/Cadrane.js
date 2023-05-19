import { Scene } from 'phaser'
import green from '@/game/assets/green.png'
export default class Cadrane extends Scene {
    config;
    text;
    points;
    lines;
    fgraphics;
    mgraphics;
    stanga;
    dreapta;
    sus;
    meter;
    constructor(){
        super({ key: 'cadrane' })
        console.log('Scena cadrane')
        this.lines=[]
        this.points=[]
    }
    init(config){
        console.log('Init Cadrane',config)
        this.config=config;
    }
    preload(){

        this.load.image("green",green);
    }

    creezCadran(){
        var idx=0;
       this.config.map(cfg=>{
            var biggerCircle = this.add.circle(cfg.centruX, cfg.centruY, cfg.razaMare, 0xadd8e6);
            biggerCircle.setStrokeStyle(2, 0x0000ff);
        
            var smallerCircle = this.add.circle(cfg.centruX, cfg.centruY, cfg.razaMica, 0xadd8e6);
            smallerCircle.setStrokeStyle(2, 0x0000ff);
    
            this.fgraphics = this.add.graphics();
    
            this.fgraphics.lineStyle(cfg.razaMare-cfg.razaMica, 0x0000ff, 1);

            cfg.segmente.map(s=>{
                this.fgraphics.beginPath();
    
                this.fgraphics.arc(cfg.centruX, cfg.centruY, cfg.razaMica+(cfg.razaMare-cfg.razaMica)/2, Phaser.Math.DegToRad(s.start), Phaser.Math.DegToRad(s.stop), false);
        
                this.fgraphics.strokePath();

            })
    

            this.lines.push(new Phaser.Geom.Line(cfg.centruX, cfg.centruY, cfg.centruX, cfg.centruY-cfg.razaMica))
            this.points.push( this.lines[idx].getPointA())  
          
            idx++

       })
    }

    create(){
      
       this.text = this.add.text(100, 50, '');


       this.creezCadran();
       this.meter=this.add.image(500,500,"green");
    this.mgraphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }, fillStyle: { color: 0x0000aa } });

    this.stanga = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update(){
         
        this.mgraphics.clear();
        var unghi;
        for (let i = 0; i < this.lines.length; i++)
        {
            Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], this.config[i].viteza);

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