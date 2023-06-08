<script setup lang="ts">
import {onUpdated,computed,ref,reactive} from 'vue'
import WidgetRezultate from './WidgetRezultate.vue';
const props=defineProps(['title','evenimente'])
const suntEvenimente = computed(()=>{
    return props.evenimente.lista&&props.evenimente.lista.length>0
})

let state = reactive({
   rezultate:{
    durataStartTest:0
   } 
})
let states={
    grafic_cadran_sus:{
                     options:{
                            chart: {
                                    id: 'grafic_cadran_sus'
                                 },
                                xaxis: {
                                    categories: []
                                }
                         },
                         series:[{
                                 name: 'timp_reactie_cadran_sus',
                                 data: []
                           }]
                     }
}

onUpdated(()=>{
    
    let reactii_cadran_sus=0
    let reactii_inutile_cadran_sus=0
    let timp_reactie_cadran_sus=0
    let timpi_reactie_cadran_sus=[]
    let indecsi_reactie_cadran_sus=[]

    if(props.evenimente.lista){
        props.evenimente.lista.map(e=>{
            if(e.reactie=='corect'&&e.element=='cadran_sus') {
                reactii_cadran_sus+=1
                timp_reactie_cadran_sus+=(e.momentReactie-e.startStimul)
                timpi_reactie_cadran_sus.push(Math.floor(e.momentReactie-e.startStimul))
                indecsi_reactie_cadran_sus.push(timpi_reactie_cadran_sus.length)

            }

            if(e.reactie=='inutil'&&e.element=='cadran_sus') reactii_inutile_cadran_sus+=1
        })
        state.rezultate.durataStartTest=Math.floor((props.evenimente.startReprizaI-props.evenimente.startAntrenament)/1000)
        state.rezultate.reactii_cadran_sus=reactii_cadran_sus
        state.rezultate.exactitate_reactii_cadran_sus = (reactii_cadran_sus/(props.evenimente.totalStimuliReprizaI[0]+props.evenimente.totalStimuliReprizaII[0])*100).toFixed(2)
        state.rezultate.reactii_inutile_cadran_sus = reactii_inutile_cadran_sus
        state.rezultate.timp_mediu_reactie_cadran_sus = Math.floor(timp_reactie_cadran_sus/reactii_cadran_sus)

        states.grafic_cadran_sus.options.xaxis.categories=indecsi_reactie_cadran_sus;
        states.grafic_cadran_sus.series[0].data=timpi_reactie_cadran_sus;
    }
    console.log('updated',state.rezultate)
})

</script>

<template>
    <h5 v-show="!suntEvenimente">{{ title }} </h5>
    <div class="column" v-show="suntEvenimente">
        <!-- <div >
            {{ state.rezultate.durataStartTest }} s.

         </div> -->
    <!-- <div>
        Reactii cadran sus: {{ state.rezultate.reactii_cadran_sus }}
    </div>
    <div>
        Exactitate reactii cadran sus: {{ state.rezultate.exactitate_reactii_cadran_sus }} %
    </div>
    <div>
        Reactii inutile cadran sus: {{ state.rezultate.reactii_inutile_cadran_sus }} 
    </div>
    <div>
       Timp mediu reactie cadran sus: {{ state.rezultate.timp_mediu_reactie_cadran_sus }} ms. 
    </div> -->
    <!-- <div>
        <apexchart width="400" type="line" :options="states.grafic_cadran_sus.options" :series="states.grafic_cadran_sus.series"></apexchart>
    </div> -->
   <widget-rezultate element="cadran_sus" :rezultate="state.rezultate" :dategrafic="states" :evenimente="props.evenimente"></widget-rezultate>
    </div>

</template>
