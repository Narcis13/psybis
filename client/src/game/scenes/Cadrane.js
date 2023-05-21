import { Scene } from 'phaser'
import CountdownController from '@/game/scenes/helpers/CountdownController'
import meter_light from '@/game/assets/meter_light.png'
import butonstart from '@/game/assets/butonstart.png'
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
    status;
    countdown;
    constructor(){
        super({ key: 'cadrane' })
        console.log('Scena cadrane')
        this.lines=[]
        this.points=[]
        this.status={
            stadiu:'REPRIZA I',
            ruleaza:false
        }
    }

    init(config){
        console.log('Init Cadrane',config)
        this.config=config;
    }

    preload(){

        this.load.image("meter",meter_light);
        this.load.image('buton_start',butonstart)
    }

    creezCadran(){
        var idx=0;
       this.config.cadrane.map(cfg=>{
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
      
        const btn= this.add.image(800,1000,'buton_start')
   
        btn.setInteractive()
        


       this.text = this.add.text(100, 50, '');

       this.creezCadran();

       var fundal_meter=this.add.rectangle(this.config.bara.x,this.config.bara.y,50*this.config.bara.scalare,50,0x0000ff)
       fundal_meter.setOrigin(0.0,0.5)
       var meter=this.add.image(this.config.bara.x,this.config.bara.y,"meter");
       meter.setOrigin(0.0,0.5)
       meter.scaleX=0

       var that=this
       function startScaling() {
        // Create the scaling tween
        var scaleTween = this.tweens.add({
            targets: meter,
            scaleX: that.config.bara.scalare,
            duration: that.config.bara.durata, // 3 seconds
            ease: 'Linear',
            onComplete: function () {
                // After scaling, reset the scale and start the next scaling tween after a delay
                meter.scaleX=0.0;

               if (that.status.ruleaza) that.time.delayedCall(that.config.bara.pauza, startScaling, [], that);
            },
            onCompleteScope: that
        });
        }
        this.countdown = new CountdownController(this, this.text)
        btn.on('pointerdown',()=>{
            this.status.ruleaza=true 
            this.countdown.start(this.handleCountdownFinished.bind(this),this.config.durataRepriza)
            this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
            
            btn.setVisible(false)
        })
    
		
		

    this.mgraphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }, fillStyle: { color: 0x0000aa } });

    this.stanga = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.input.keyboard.on('keydown', event =>
            {
                if(event.repeat) return;
                console.dir(event);

            });

    }

    handleCountdownFinished(){
        console.log('GATA')
        this.status.ruleaza=false;
    }

    update(){

            this.mgraphics.clear();
            var unghi;
            for (let i = 0; i < this.lines.length; i++)
            {
                if (this.status.ruleaza)  Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], this.config.cadrane[i].viteza);

                this.mgraphics.strokeLineShape(this.lines[i]);
                var angle = Phaser.Geom.Line.Angle(this.lines[i]);
            
                if(angle<0) 
                    unghi=360+Phaser.Math.RadToDeg(angle)
                else
                    unghi=Phaser.Math.RadToDeg(angle)
       
            
            }


        if (Phaser.Input.Keyboard.JustDown(this.stanga)){
             console.log('STANGA')
           /* if((unghi>=20&&unghi<=70)||(unghi>=180&&unghi<=270)){
                this.text.setText('CORECT')
            }
            else {
                this.text.setText('INCORECT')
            }*/
        }
        this.countdown.update()
    }
} 