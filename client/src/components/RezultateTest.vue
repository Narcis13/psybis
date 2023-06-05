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
    console.log('updated')
    let reactii_cadran_sus=0
    if(props.evenimente.lista){
        props.evenimente.lista.map(e=>{
            if(e.reactie=='corect'&&e.element=='cadran_sus') reactii_cadran_sus+=1
        })
        state.rezultate.durataStartTest=Math.floor((props.evenimente.startReprizaI-props.evenimente.startAntrenament)/1000)
        state.rezultate.reactii_cadran_sus=reactii_cadran_sus
    }
   
})

</script>

<template>
    <h5 v-if="!suntEvenimente">{{ title }} </h5>
    <div class="column" v-if="suntEvenimente">
        <h5 >
        {{ state.rezultate.durataStartTest }} s.

    </h5>
    <div>
        Reactii cadran sus: {{ state.rezultate.reactii_cadran_sus }}
    </div>
    </div>

</template>
