import { Scene } from 'phaser'
import CountdownController from '@/game/scenes/helpers/CountdownController'
import meter_light from '@/game/assets/meter_light.png'
import butonstart from '@/game/assets/butonstart.png'
import bomb from '@/game/assets/stea.png'

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
        this.moment=0
        this.bara=null;
        this.lines=[]
        this.points=[]
        this.status={
            stadiu:'REPRIZA I',
            ruleaza:false
        }
        this.stimuli=[null,null,null,null]
        this.totalstimuli={cadran_sus:0,cadran_stanga:0,cadran_dreapta:0,bara:0}
        this.evenimente={lista:[]}
    }

    init(config){
        console.log('Init Cadrane',config)
        this.config=config;
    }

    preload(){

        this.load.image("meter",meter_light);
        this.load.image('buton_start',butonstart)
        this.load.image('bomb', bomb)
    }

    afisezSteluta(x,y,u){
        var star = this.add.image(0, 0, 'bomb');
         // star.setScale(2)
        // Set the position on the imaginary circle
        var centerX = x;
        var centerY = y;
        var radius = 50;
        var angle = Phaser.Math.DegToRad(u);
        var posX = centerX + radius * Math.cos(angle);
        var posY = centerY + radius * Math.sin(angle);
        star.setPosition(posX, posY);
    
        // Display the star for a second
        var duration = 1000; // 1 second
        this.time.delayedCall(duration, function() {
            star.setVisible(false);
        }, [], this);
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
       this.bara=meter;
       var that=this
       function startScaling() {
       if(that.stimuli[3]===null) {
        that.stimuli[3]={startStimul:that.moment,murdar:false}
        that.totalstimuli.bara+=1;
       }
        // Create the scaling tween
        var scaleTween = this.tweens.add({
            targets: meter,
            scaleX: that.config.bara.scalare,
            duration: that.config.bara.durata, // 3 seconds
            ease: 'Linear',
            onComplete: function () {
                // After scaling, reset the scale and start the next scaling tween after a delay
                meter.scaleX=0.0;
                that.stimuli[3]=null;
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
    this.dreapta = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.sus = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.spatiu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.keyboard.on('keydown', event =>
            {
                if(event.repeat) return;
                console.dir(event);

            });

    }

    handleCountdownFinished(){
        console.log('GATA',this.totalstimuli.cadran_stanga,this.totalstimuli.cadran_dreapta,this.totalstimuli.cadran_sus,this.totalstimuli.bara,this.evenimente)
        this.status.ruleaza=false;
    }

    update(time){
          //  console.log(time)
            this.mgraphics.clear();
            var unghi,unghiuri=[0,0,0]//unghi0,unghi1,unghi2;
            this.moment=time
            for (let i = 0; i < this.lines.length; i++)
            {
                if (this.status.ruleaza)  Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], this.config.cadrane[i].viteza);

                this.mgraphics.strokeLineShape(this.lines[i]);
                var angle = Phaser.Geom.Line.Angle(this.lines[i]);
            
                if(angle<0) 
                    unghi=360+Phaser.Math.RadToDeg(angle)
                else
                    unghi=Phaser.Math.RadToDeg(angle)
                
                if(/*i==1 && */this.status.ruleaza) {
                    unghiuri[i]=unghi;
                   // console.log('Unghi cadran stanga',Math.round(unghi))
                    if(this.config.cadrane[i].viteza<0){
                        this.config.cadrane[i].segmente.map(s=>{
                           if(Math.round(unghi)==s.stop && this.stimuli[i]===null){
                               this.stimuli[i]={startStimul:time,murdar:false}
                               if(i==1) this.totalstimuli.cadran_stanga+=1;
                               if(i==2) this.totalstimuli.cadran_dreapta+=1;
                           }
                           if(Math.round(unghi)==s.start && this.stimuli[i]!==null){
                            this.stimuli[i]=null;
                           }
                        })
                    }
                    else {
                        this.config.cadrane[i].segmente.map(s=>{
                            if(Math.round(unghi)==s.start && this.stimuli[i]===null){
                                this.stimuli[i]={startStimul:time,murdar:false}
                                if(i==0) this.totalstimuli.cadran_sus+=1;
                                
                            }
                            if(Math.round(unghi)==s.stop && this.stimuli[i]!==null){
                             this.stimuli[i]=null;
                            }
                         })
                    }
                }    
            
            }


        if (Phaser.Input.Keyboard.JustDown(this.stanga)){
   
            this.evenimente.lista.push({
                stadiu:this.status.stadiu,
                startStimul:this.stimuli[1]!==null?this.stimuli[1].startStimul:0,
                reactie:this.stimuli[1]!==null&&!this.stimuli[1].murdar?'corect':'inutil',
                momentReactie:time,
                element:'cadran_stanga'
            })
            
            if(this.stimuli[1]!==null&&!this.stimuli[1].murdar){
              //  console.log(this.lines[1],this.points[1])
                this.afisezSteluta(this.lines[1].x2,this.lines[1].y2,unghiuri[1])
                this.stimuli[1].murdar=true;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.dreapta)){
   
            this.evenimente.lista.push({
                stadiu:this.status.stadiu,
                startStimul:this.stimuli[2]!==null?this.stimuli[2].startStimul:0,
                reactie:this.stimuli[2]!==null&&!this.stimuli[2].murdar?'corect':'inutil',
                momentReactie:time,
                element:'cadran_dreapta'
            })
            
            if(this.stimuli[2]!==null&&!this.stimuli[2].murdar){
              //  console.log(this.lines[1],this.points[1])
                this.afisezSteluta(this.lines[2].x2,this.lines[2].y2,unghiuri[2])
                this.stimuli[2].murdar=true;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.sus)){
   
            this.evenimente.lista.push({
                stadiu:this.status.stadiu,
                startStimul:this.stimuli[0]!==null?this.stimuli[0].startStimul:0,
                reactie:this.stimuli[0]!==null&&!this.stimuli[0].murdar?'corect':'inutil',
                momentReactie:time,
                element:'cadran_sus'
            })
            
            if(this.stimuli[0]!==null&&!this.stimuli[0].murdar){
              //  console.log(this.lines[1],this.points[1])
                this.afisezSteluta(this.lines[0].x2,this.lines[0].y2,unghiuri[0])
                this.stimuli[0].murdar=true;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.spatiu)){
          //  console.log(this.stimuli[3])
            this.evenimente.lista.push({
                stadiu:this.status.stadiu,
                startStimul:this.stimuli[3]!==null?this.stimuli[3].startStimul:0,
                reactie:this.stimuli[3]!==null&&!this.stimuli[3].murdar?'corect':'inutil',
                momentReactie:time,
                element:'bara'
            })
            
            if(this.stimuli[3]!==null&&!this.stimuli[3].murdar){
                console.log(this.bara.scaleX)
                this.afisezSteluta(this.config.bara.x+this.bara.scaleX*50,this.config.bara.y-100,90)
                this.stimuli[3].murdar=true;
            }
        }

        this.countdown.update()
    }
} 