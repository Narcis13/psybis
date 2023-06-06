<script setup lang="ts">
import {onUpdated,computed,ref,reactive} from 'vue'
const props=defineProps(['title','evenimente'])
const suntEvenimente = computed(()=>{
    return props.evenimente.lista&&props.evenimente.lista.length>0
})

let state = reactive ({
   rezultate:{
    durataStartTest:0
   } 
}) 

onUpdated(()=>{
    
    let reactii_cadran_sus=0
    let reactii_inutile_cadran_sus=0
    let timp_reactie_cadran_sus=0
    let timpi_reactie_cadran_sus=[]
    if(props.evenimente.lista){
        props.evenimente.lista.map(e=>{
            if(e.reactie=='corect'&&e.element=='cadran_sus') {
                reactii_cadran_sus+=1
                timp_reactie_cadran_sus+=(e.momentReactie-e.startStimul)
                timpi_reactie_cadran_sus.push(Math.floor(e.momentReactie-e.startStimul))
            }

            if(e.reactie=='inutil'&&e.element=='cadran_sus') reactii_inutile_cadran_sus+=1
        })
        state.rezultate.durataStartTest=Math.floor((props.evenimente.startReprizaI-props.evenimente.startAntrenament)/1000)
        state.rezultate.reactii_cadran_sus=reactii_cadran_sus
        state.rezultate.exactitate_reactii_cadran_sus = (reactii_cadran_sus/(props.evenimente.totalStimuliReprizaI[0]+props.evenimente.totalStimuliReprizaII[0])*100).toFixed(2)
        state.rezultate.reactii_inutile_cadran_sus = reactii_inutile_cadran_sus
        state.rezultate.timp_mediu_reactie_cadran_sus = Math.floor(timp_reactie_cadran_sus/reactii_cadran_sus)
    }
    console.log('updated',timpi_reactie_cadran_sus)
})

</script>

<template>
    <h5 v-if="!suntEvenimente">{{ title }} </h5>
    <div class="column" v-if="suntEvenimente">
        <div >
        {{ state.rezultate.durataStartTest }} s.

    </div>
    <div>
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
    </div>
    </div>

</template>
