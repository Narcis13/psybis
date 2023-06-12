<script setup lang="ts">
import {ref,reactive,onUpdated} from 'vue'
const props=defineProps(['element','evenimente'])

let element=props.element
let idx=0
let eComplet=ref(element=='complet')
if(element=='cadran_stanga') idx=1;
if(element=='cadran_dreapta') idx=2;
if(element=='bara') idx=3;
let state = reactive({
   rezultate:{
    durataStartTest:0
   } 
})
let states={
    grafic_cadran_sus:{
                     options:{
                            chart: {
                                    id: 'grafic cadran_sus'
                                 },
                                 annotations:{
                                    xaxis: [{
                                            x: 2,
                                            x2: 3,
                                            fillColor: '#B3F7CA',
                                            opacity: 0.4,
                                            strokeDashArray: 0,
                                            borderColor: '#775DD0',
                                            label: {
                                                    borderColor: '#775DD0',
                                                    style: {
                                                        color: '#fff',
                                                        background: '#775DD0',
                                                    },
                                            text: 'PAUZA',
                                            }
                                    }]
                                 },
                                xaxis: {
                                    categories: []
                                }
                         },
                         series:[{
                                 name: 'timp_reactie cadran_sus',
                                 data: []
                           }]
                     }
}
onUpdated(()=>{


    let reactii=0
    let reactiiRI=0
    let reactiiRII=0
    let reactii_inutile=0
    let reactii_inutileRI=0
    let reactii_inutileRII=0
    let timp_reactie=0
    let timp_reactieRI=0
    let timp_reactieRII=0
    let timpi_reactie=[]
    let indecsi_reactie=[]
    let totalStimuliReprizaI=0
    let totalStimuliReprizaII=0
    let filtru=false

    if(props.evenimente.lista){

        totalStimuliReprizaI=props.evenimente.totalStimuliReprizaI[0]+props.evenimente.totalStimuliReprizaI[1]+props.evenimente.totalStimuliReprizaI[2]+props.evenimente.totalStimuliReprizaI[3]
        totalStimuliReprizaII=props.evenimente.totalStimuliReprizaII[0]+props.evenimente.totalStimuliReprizaII[1]+props.evenimente.totalStimuliReprizaII[2]+props.evenimente.totalStimuliReprizaII[3]
        props.evenimente.lista.map(e=>{
            if(element=='complet'){
                 filtru=true;
             }
             else {
                filtru=e.element==element
             }
            if(e.reactie=='corect'&&filtru/*e.element==element*/) {
                reactii+=1
                timp_reactie+=(e.momentReactie-e.startStimul)
                timpi_reactie.push(Math.floor(e.momentReactie-e.startStimul))
                indecsi_reactie.push(timpi_reactie.length)
                if(e.stadiu=='REPRIZA I'){
                   reactiiRI+=1
                   timp_reactieRI+=(e.momentReactie-e.startStimul)
                }
                else{
                    reactiiRII+=1
                    timp_reactieRII+=(e.momentReactie-e.startStimul)
                }

            }

            if(e.reactie=='inutil'&&filtru/*e.element==element*/) {
                    reactii_inutile+=1
                    if(e.stadiu=='REPRIZA I'){
                        reactii_inutileRI+=1
                        }
                        else{
                            reactii_inutileRII+=1
                        }
            }

        })
        state.rezultate.durataStartTest=Math.floor((props.evenimente.startReprizaI-props.evenimente.stopAntrenament)/1000)
        state.rezultate.durataStartRII=Math.floor((props.evenimente.startReprizaII-props.evenimente.stopReprizaI)/1000)

        state.rezultate.reactii=reactii
        state.rezultate.reactii_reprize = '('+reactiiRI+':'+reactiiRII+')'
        state.rezultate.reactii_inutile_reprize = '('+reactii_inutileRI+':'+reactii_inutileRII+')'
        state.rezultate.exactitate_reactii = element=='complet'?(reactii/(totalStimuliReprizaI+totalStimuliReprizaII)*100).toFixed(2):(reactii/(props.evenimente.totalStimuliReprizaI[idx]+props.evenimente.totalStimuliReprizaII[idx])*100).toFixed(2)

        let exactitate_reactiiRI = element=='complet'?(reactiiRI/(totalStimuliReprizaI)*100).toFixed(2):(reactiiRI/(props.evenimente.totalStimuliReprizaI[idx])*100).toFixed(2)
        let exactitate_reactiiRII = element=='complet'?(reactiiRII/(totalStimuliReprizaII)*100).toFixed(2):(reactiiRII/(props.evenimente.totalStimuliReprizaII[idx])*100).toFixed(2)
        state.rezultate.exactitate_reactii_reprize='('+exactitate_reactiiRI+':'+exactitate_reactiiRII+')'
        
        state.rezultate.reactii_inutile = reactii_inutile
        state.rezultate.timp_mediu_reactie = Math.floor(timp_reactie/reactii)
        state.rezultate.timp_mediu_reactie_reprize='('+Math.floor(timp_reactieRI/reactiiRI)+':'+Math.floor(timp_reactieRII/reactiiRII)+')'
        state.rezultate.denumire_element = element.split('_').join(' ').toUpperCase()
        states.grafic_cadran_sus.options.chart.id='grafic_'+element;
        states.grafic_cadran_sus.options.annotations.xaxis[0].x=reactiiRI
        states.grafic_cadran_sus.options.annotations.xaxis[0].x2=reactiiRI+1
        states.grafic_cadran_sus.options.xaxis.categories=indecsi_reactie;
        states.grafic_cadran_sus.series[0].data=timpi_reactie;
        states.grafic_cadran_sus.series[0].name='timp_reactie_'+element;
    }
})

</script>
<template>
        <div :class="{ row: !eComplet }" style="max-width:800px">
            <div v-show="eComplet" class="q-ml-md text-subtitle1">
                 Repriza I a inceput dupa {{ state.rezultate.durataStartTest }} s.
            </div>
            <div v-show="eComplet" class="q-ml-md text-subtitle1">
                 Repriza II a inceput dupa {{ state.rezultate.durataStartRII }} s.
            </div>

            <div class="col-6 q-mt-sm ">
                <div class="q-ml-md text-indigo-9 text-h6 text-weight-bold">
                 {{ state.rezultate.denumire_element }}
                </div>
                <div class="q-ml-md text-subtitle1">
                  Reactii : <span class="text-indigo-9 text-h6 text-weight-bold">{{state.rezultate.reactii }}</span> {{ state.rezultate.reactii_reprize }}
                </div>
                <div class="q-ml-md text-subtitle1">
                    Exactitate reactii : <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.exactitate_reactii }} %</span> {{ state.rezultate.exactitate_reactii_reprize }}
                </div>
                <div class="q-ml-md text-subtitle1">
                    Reactii inutile : <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.reactii_inutile }} </span> {{ state.rezultate.reactii_inutile_reprize }}
                </div>
                <div class="q-ml-md text-subtitle1">
                     Timp mediu reactie : <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.timp_mediu_reactie }} ms. </span> {{ state.rezultate.timp_mediu_reactie_reprize }}
                </div>
            </div>

            <div class="col-6">
                <apexchart width="400" type="line" :options="states.grafic_cadran_sus.options" :series="states.grafic_cadran_sus.series"></apexchart>
            </div>
        </div>
</template>