<script setup lang="ts">
import {ref,onUpdated} from 'vue'
const props=defineProps(['element','rezultate','dategrafic','evenimente'])

let element=props.element
let rezultate=props.rezultate
console.log('Widget...')
let state = {
               
   }
onUpdated(()=>{
    console.log('widget updated',props.evenimente,props.rezultate)
    state= {
                exactitate_reactii:(props.rezultate['exactitate_reactii_'+element]),
            reactii:(props.rezultate['reactii_'+element]),
            reactii_inutile:(props.rezultate['reactii_inutile_'+element]),
             timp_mediu_reactie:(props.rezultate['timp_mediu_reactie_'+element])
       }

})

let optiunigrafic=props.dategrafic['grafic_'+element].options
let seriegrafic=props.dategrafic['grafic_'+element].series
</script>
<template>
        <div>

            <div>
                 Reactii cadran sus: {{state.reactii }}
             </div>
            <div>
                Exactitate reactii cadran sus: {{ state.exactitate_reactii }} %
            </div>
            <div>
                Reactii inutile cadran sus: {{ state.reactii_inutile }} 
            </div>
            <div>
            Timp mediu reactie cadran sus: {{ state.timp_mediu_reactie }} ms. 
            </div>
            <div>
                <apexchart width="400" type="line" :options="optiunigrafic" :series="seriegrafic"></apexchart>
            </div>
        </div>
</template>