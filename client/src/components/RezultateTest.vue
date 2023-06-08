<script setup lang="ts">
import {onUpdated,computed,ref,reactive} from 'vue'
import WidgetRezultate from './WidgetRezultate.vue';
const props=defineProps(['title','evenimente'])
const suntEvenimente = computed(()=>{
    return props.evenimente.lista&&props.evenimente.lista.length>0
})


onUpdated(()=>{
    
    
})

</script>

<template>
    <h5 v-show="!suntEvenimente">{{ title }} </h5>
    <div class="column" v-show="suntEvenimente">
        <!-- <div >
            {{ state.rezultate.durataStartTest }} s.

         </div> -->

   <widget-rezultate element="cadran_sus"  :evenimente="props.evenimente" />
   <widget-rezultate element="cadran_stanga"  :evenimente="props.evenimente" />
   <widget-rezultate element="cadran_dreapta"  :evenimente="props.evenimente" />
   <widget-rezultate element="bara"  :evenimente="props.evenimente" />
    </div>

</template>
