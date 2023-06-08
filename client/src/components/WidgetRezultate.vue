<script setup lang="ts">
import {reactive,onUpdated} from 'vue'
const props=defineProps(['element','evenimente'])

let element=props.element
let idx=0
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
    let reactii_inutile=0
    let timp_reactie=0
    let timpi_reactie=[]
    let indecsi_reactie=[]

    if(props.evenimente.lista){
        props.evenimente.lista.map(e=>{
            if(e.reactie=='corect'&&e.element==element) {
                reactii+=1
                timp_reactie+=(e.momentReactie-e.startStimul)
                timpi_reactie.push(Math.floor(e.momentReactie-e.startStimul))
                indecsi_reactie.push(timpi_reactie.length)

            }

            if(e.reactie=='inutil'&&e.element==element) reactii_inutile+=1
        })
        state.rezultate.durataStartTest=Math.floor((props.evenimente.startReprizaI-props.evenimente.startAntrenament)/1000)
        state.rezultate.reactii=reactii
        state.rezultate.exactitate_reactii = (reactii/(props.evenimente.totalStimuliReprizaI[idx]+props.evenimente.totalStimuliReprizaII[idx])*100).toFixed(2)
        state.rezultate.reactii_inutile = reactii_inutile
        state.rezultate.timp_mediu_reactie = Math.floor(timp_reactie/reactii)
        state.rezultate.denumire_element = element.split('_').join(' ')
        states.grafic_cadran_sus.options.chart.id='grafic_'+element;
        states.grafic_cadran_sus.options.xaxis.categories=indecsi_reactie;
        states.grafic_cadran_sus.series[0].data=timpi_reactie;
        states.grafic_cadran_sus.series[0].name='timp_reactie_'+element;
    }
})
//let exactitate_reactii=(props.rezultate['exactitate_reactii_'+element])
//let optiunigrafic=props.dategrafic['grafic_'+element].options
//let seriegrafic=props.dategrafic['grafic_'+element].series
</script>
<template>
        <div class="row" style="width:800px">
            <div class="col-6 q-mt-sm ">
                <div class="text-subtitle1">
                  Reactii {{ state.rezultate.denumire_element }}: <span class="text-indigo-9 text-h6 text-weight-bold">{{state.rezultate.reactii }}</span>
                </div>
                <div class="text-subtitle1">
                    Exactitate reactii {{ state.rezultate.denumire_element }}: <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.exactitate_reactii }} %</span>
                </div>
                <div class="text-subtitle1">
                    Reactii inutile {{ state.rezultate.denumire_element }}: <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.reactii_inutile }} </span>
                </div>
                <div class="text-subtitle1">
                     Timp mediu reactie {{ state.rezultate.denumire_element }}: <span class="text-indigo-9 text-h6 text-weight-bold">{{ state.rezultate.timp_mediu_reactie }} ms. </span>
                </div>
            </div>

            <div class="col-6">
                <apexchart width="400" type="line" :options="states.grafic_cadran_sus.options" :series="states.grafic_cadran_sus.series"></apexchart>
            </div>
        </div>
</template>