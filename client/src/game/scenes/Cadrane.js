import { Scene } from 'phaser'
import eventsCenter from './EventsCenter'
import {useCandidatStore} from '@/store/StoreCandidat'
import CountdownController from '@/game/scenes/helpers/CountdownController'
import meter_light from '@/game/assets/meter_light.png'
import butonmaideparte from '@/game/assets/maideparte.png'
import sageti from '@/game/assets/sageti.png'
import bomb from '@/game/assets/stea.png'
import BootScene from './BootScene'
export default class Cadrane extends Scene {
    config;
    text;
    btn;
    mesaj;
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
       // console.log('Scena cadrane constructor')
       this.candidat=useCandidatStore()
       
        this.scaleaza=null
        this.moment=0
        this.index_instructaj=0;
        this.mesajetaste=[null,null,null]
        this.bara=null;
        this.lines=[]
        this.points=[]
        this.stadii=['INSTRUCTAJ','ANTRENAMENT','REPRIZA I','REPRIZA II']
        this.status={
            indexstadiu:0,
            stadiu:'INSTRUCTAJ',
            ruleaza:false
        }
        this.stimuli=[null,null,null,null]
        this.totalstimuli={cadran_sus:0,cadran_stanga:0,cadran_dreapta:0,bara:0}
        this.evenimente={
            startInstructaj:null,
            startAntrenament:null,
            startReprizaI:null,
            startReprizaII:null,
            stopTest:null,
            totalStimuliReprizaI:[],
            totalStimuliReprizaII:[],
            totalApasariIncorecte:0, 
            lista:[]
        }
    }

    init(config){
      //  console.log('Init Cadrane',config)
        this.config=config;
    }

    preload(){

        this.load.image("meter",meter_light);
        this.load.image('buton_maideparte',butonmaideparte)
        this.load.image('bomb', bomb)
        this.load.image('sageti', sageti)
    }

    creezInstructaj(eUltima){
        if(this.status.stadiu=='INSTRUCTAJ'){
            if(eUltima){
                this.mesajetaste[0].setVisible(false)
                this.mesajetaste[1].setVisible(false)
                this.mesajetaste[2].setVisible(false)
                this.candidat.poateFiResetat=true
                this.mesaj.setX(100)
               this.mesaj.setWordWrapWidth(1400)
              // this.time.removeAllEvents();
              var ts=this.tweens.getTweens()
              //console.log('ts',ts)
              if(ts.length>0) {
                this.tweens.reset(ts[0])
                this.tweens.remove(ts[0])
              }
               this.status.ruleaza=false;
            }
            this.mesaj.setText(this.config.instructiuni[this.index_instructaj].text);
            if(this.config.instructiuni[this.index_instructaj].subtextstanga){
               // console.log('SUBTEXT STANGA')
                this.mesajetaste[0] = this.add.text(50, 950, this.config.instructiuni[this.index_instructaj].subtextstanga, { font: "32px Arial", color: '#add8e6', align: "left" ,wordWrap:{width:500}});
                this.mesajetaste[1] = this.add.text(550, 950, this.config.instructiuni[this.index_instructaj].subtextdreapta, { font: "32px Arial", color: '#add8e6', align: "left" ,wordWrap:{width:450}});
                this.mesajetaste[2] = this.add.image(1050, 1000, 'sageti')
            }
        }
        else {
            this.mesaj.setText(this.status.stadiu)
            this.mesaj.setY(950)
            this.mesaj.setX(this.config.bara.x)
            this.mesaj.setAlign('center')
        }

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
    
    resetTest(){
        console.log('reset test!')
        this.countdown.stop()
        this.time.removeAllEvents()
        this.status.stadiu='INSTRUCTAJ'
        this.mesaj.setX(50)
        this.mesaj.setWordWrapWidth(1000)
        this.mesaj.setY(900)
        
        this.mesaj.setAlign('left')
        this.index_instructaj=0
        this.status.ruleaza=true
        if (this.status.ruleaza) this.time.delayedCall(this.config.bara.pauza, this.scaleaza, [], this);
        this.btn.setVisible(true)
        let ultima = this.index_instructaj==this.config.instructiuni.length-1 ? true:false
        if(this.index_instructaj==this.config.instructiuni.length-2) this.status.ruleaza=false
        if (ultima) this.btn.setVisible(false)
        this.creezInstructaj(ultima)
    }

    create(){
        this.input.setDefaultCursor('url(cursors/blue.cur), pointer');
      this.btn= this.add.image(1300,950,'buton_maideparte')
        this.btn.on('pointerover', function (event)
        {

            this.setTint(0xff0000);

        });

        this.btn.on('pointerout', function (event)
        {

            this.clearTint();

        });
        this.btn.setInteractive()
        

        this.mesaj = this.add.text(50, 900, this.config.instructiuni[this.index_instructaj].text, { font: "40px Arial", color: '#add8e6', align: "left" ,wordWrap:{width:1000}});
        this.evenimente.startInstructaj=Date.now();
       this.text = this.add.text(100, 50, '');

       this.creezCadran();

       var fundal_meter=this.add.rectangle(this.config.bara.x,this.config.bara.y,50*this.config.bara.scalare,50,0x0000ff)
       fundal_meter.setOrigin(0.0,0.5)
       this.status.ruleaza=true;

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
        if (this.status.ruleaza) this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
        this.scaleaza=startScaling;
        this.countdown = new CountdownController(this, this.text)
        
        this.btn.on('pointerdown',()=>{
           // asta e valabil dupa instructaj 
          /*  this.status.ruleaza=true 
            this.countdown.start(this.handleCountdownFinished.bind(this),this.config.durataRepriza)
            this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
            
            btn.setVisible(false)*/
            this.index_instructaj+=1
            let ultima = this.index_instructaj==this.config.instructiuni.length-1 ? true:false
            if(this.index_instructaj==this.config.instructiuni.length-2) this.status.ruleaza=false
            if (ultima) this.btn.setVisible(false)
            this.creezInstructaj(ultima)
            
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

                if(this.status.stadiu=='REPRIZA I'||this.status.stadiu=='REPRIZA II'&&this.status.ruleaza){
                    if(event.keyCode!==32&&event.keyCode!==37&&event.keyCode!==38&&event.keyCode!==39){
                        this.evenimente.totalApasariIncorecte+=1
                    }
                    

                }

                if(this.index_instructaj==this.config.instructiuni.length-1&&event.keyCode==66){
                 //   console.log('Sa inceapa antrenamentul')
                    this.evenimente.startAntrenament=Date.now()
                    this.index_instructaj=0;
                    this.resetCadrane()
                    this.status.ruleaza=true;
                    this.status.stadiu='ANTRENAMENT'
                    this.countdown.start(this.handleCountdownFinished.bind(this),this.config.durataAntrenament)
                    this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
                    this.creezInstructaj(false)
                }

                if(this.status.stadiu=='ANTRENAMENT'&&event.keyCode==67&&!this.status.ruleaza){
                    //console.log(this.stimuli)
                    this.candidat.poateFiResetat=false
                    this.evenimente.startReprizaI=Date.now()
                    this.evenimente.lista=[]
                    this.resetCadrane()
                    this.status.ruleaza=true;
                    this.status.stadiu='REPRIZA I'
                    this.countdown.start(this.handleCountdownFinished.bind(this),this.config.durataRepriza)
                    this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
                    this.creezInstructaj(false)
                }

                if(this.status.stadiu=='REPRIZA I'&&event.keyCode==67&&!this.status.ruleaza){
                    this.evenimente.startReprizaII=Date.now()
                    this.resetCadrane()
                    this.status.ruleaza=true;
                    this.status.stadiu='REPRIZA II'
                    this.countdown.start(this.handleCountdownFinished.bind(this),this.config.durataRepriza)
                    this.time.delayedCall(this.config.bara.pauza, startScaling, [], this);
                    this.creezInstructaj(false)
                }



            });
            eventsCenter.on('reset',this.resetTest,this)
    }

    handleCountdownFinished(){
      //  console.log('GATA',this.totalstimuli.cadran_sus,this.totalstimuli.cadran_stanga,this.totalstimuli.cadran_dreapta,this.totalstimuli.bara,this.evenimente)
        this.status.ruleaza=false;
        if(this.status.stadiu=='ANTRENAMENT'){
            this.mesaj.setX(200)
            this.totalstimuli.cadran_sus=0
            this.totalstimuli.cadran_stanga=0
            this.totalstimuli.cadran_dreapta=0
            this.totalstimuli.bara=0
            this.evenimente.stopAntrenament=Date.now()
            this.mesaj.setText('Pentru a incepe prima repriza a testului apasati tasta C')
        }
        if(this.status.stadiu=='REPRIZA I'){
            this.mesaj.setX(200)
            this.mesaj.setText('Pentru a incepe a doua repriza a testului apasati tasta C')
            this.evenimente.totalStimuliReprizaI=[this.totalstimuli.cadran_sus,this.totalstimuli.cadran_stanga,this.totalstimuli.cadran_dreapta,this.totalstimuli.bara]
            this.totalstimuli.cadran_sus=0
            this.totalstimuli.cadran_stanga=0
            this.totalstimuli.cadran_dreapta=0
            this.evenimente.stopReprizaI=Date.now()
            this.totalstimuli.bara=0
        }
        if(this.status.stadiu=='REPRIZA II'){
            this.mesaj.setX(this.config.bara.x)
            this.evenimente.totalStimuliReprizaII=[this.totalstimuli.cadran_sus,this.totalstimuli.cadran_stanga,this.totalstimuli.cadran_dreapta,this.totalstimuli.bara]
            this.mesaj.setText('FINAL! VA MULTUMIM!')
            this.evenimente.stopTest=Date.now()
            this.evenimente.totalApasariIncorecte=this.evenimente.totalApasariIncorecte-2
            setTimeout(() => {
                this.candidat.finalizareTest(this.evenimente)
                this.scene.switch(BootScene)
                this.scene.remove()
              }, 4000);
           
        }
    }

    resetCadrane(){
        this.stimuli=[null,null,null,null]
        for (let i = 0; i < this.lines.length; i++)
        { 
            var angle = Phaser.Geom.Line.Angle(this.lines[i]);
           // var targetAngle = Math.atan2(this.points[i].y - 0, this.points[i].x - 0) - Math.PI / 4;
            Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], -angle + (7 * Phaser.Math.PI2)/8)
        }
           
          
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
                               if(i==1){
                             //   console.log('start stanga')
                                this.totalstimuli.cadran_stanga+=1;
                               } 
                               if(i==2) this.totalstimuli.cadran_dreapta+=1;
                           }
                           if(Math.round(unghi)==s.start && this.stimuli[i]!==null){
                           // console.log('stop stanga')
                            this.stimuli[i]=null;
                           }
                        })
                    }
                    else {
                        this.config.cadrane[i].segmente.map(s=>{
                            if(Math.round(unghi)==s.start && this.stimuli[i]===null){
                              //  if(s.start==330) console.log('start sus')
                                this.stimuli[i]={startStimul:time,murdar:false}
                                if(i==0) this.totalstimuli.cadran_sus+=1;
                                
                            }
                            if(Math.round(unghi)==s.stop && this.stimuli[i]!==null){
                              // if(s.stop==12)  console.log('stop sus')
                             this.stimuli[i]=null;
                            }
                         })
                    }
                }    
            
            }


        if (this.status.stadiu!=='INSTRUCTAJ'&&Phaser.Input.Keyboard.JustDown(this.stanga)){
   
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

        if (this.status.stadiu!=='INSTRUCTAJ'&&Phaser.Input.Keyboard.JustDown(this.dreapta)){
   
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

        if (this.status.stadiu!=='INSTRUCTAJ'&&Phaser.Input.Keyboard.JustDown(this.sus)){
           // console.log('sus',this.stimuli[0],unghiuri[0])
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

        if (this.status.stadiu!=='INSTRUCTAJ'&&Phaser.Input.Keyboard.JustDown(this.spatiu)){
          //  console.log(this.stimuli[3])
            this.evenimente.lista.push({
                stadiu:this.status.stadiu,
                startStimul:this.stimuli[3]!==null?this.stimuli[3].startStimul:0,
                reactie:this.stimuli[3]!==null&&!this.stimuli[3].murdar?'corect':'inutil',
                momentReactie:time,
                element:'bara'
            })
            
            if(this.stimuli[3]!==null&&!this.stimuli[3].murdar){
              //  console.log(this.bara.scaleX)
                this.afisezSteluta(this.config.bara.x+this.bara.scaleX*50,this.config.bara.y-100,90)
                this.stimuli[3].murdar=true;
            }
        }

        this.countdown.update()
    }
} 