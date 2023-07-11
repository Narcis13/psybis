<script setup lang="ts">
import {ref} from 'vue'
import { onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import io from 'socket.io-client'
import type { Game } from 'phaser'
import RezultateTest from './RezultateTest.vue'
import {useCandidatStore} from '@/store/StoreCandidat'
import eventsCenter from '../game/scenes/EventsCenter.js'

const queryString = window.location.search;

let idStatie=0
if(queryString){
  const urlParams = new URLSearchParams(queryString);
  idStatie = urlParams.get('sid')
}
//console.log(idStatie)
let gameInstance: Game | null = null
const containerId = 'game-container'
const game = await import('@/game/game')
const host=import.meta.env.VITE_HOST

const candidat= useCandidatStore()
let testinceput = ref(false)
let idinvalid = ref(false)

const socket = io(host)

socket.on('start', (data) => {
  console.log('Mesaj primit',data)
})



function resetTest(){
  candidat.poateFiResetat=!candidat.poateFiResetat
  candidat.resetareTest()
  eventsCenter.emit('reset',{}) 
}

function cautaIdentificator(){

  axios.get(host+'testari/'+identificator.value+'/'+idStatie).then(
  res=>{
    
     if (res.data.testare[0].length>0){
      candidat.initiereTest({numecandidat:res.data.testare[0][0].nume,numetest:res.data.testare[0][0].numetest,idStatie})
      testinceput.value=true;
      identificator.value='';
      socket.emit('message',{mesaj:'TEST INITIAT',candidat:res.data.testare[0][0].nume})      
     }
     else {
       console.log('identificator invalid')
       idinvalid.value=true
     }


  }
).catch(err=>{
  console.log(err)
})
  
}

function help(){
  axios.post(host+'testari/help/'+idStatie,{}).then(
                res=>{
      
                }
              ).catch(err=>{
                console.log(err)
              })
}

 let identificator=ref('')
onMounted(() => {
  gameInstance = game.launch(containerId)
})

onUnmounted(() => {
  gameInstance?.destroy(false)
})
</script>

<template>
  <div>
  <div class="">
    <q-banner inline-actions class="bg-primary text-white q-pa-sm">
    <div class="row items-center ">
      <div class="text-h6 q-mr-sm">Laborator Psihologie Statie de lucru {{ candidat.numecandidat }} {{ candidat.numetest }}</div>
      <q-input v-show="!candidat.testInceput" hide-bottom-space v-model="identificator" color="white" label-color="white" standout label="Identificator">
        <template v-slot:append>
          <q-btn round color="black" icon="my_location" @click="cautaIdentificator"/>
        </template>
      </q-input>
    </div>
  
      <template v-slot:action>
        <q-btn v-show="candidat.poateFiResetat" flat color="white" label="Reset" @click="resetTest"/>
        <q-btn flat color="white" label="Solicita ajutor!" @click="help"/>
      </template>
    </q-banner>
    <div v-show="!candidat.testInceput" class="flex flex-center" style="height:90vh;width:900px">
       <rezultate-test title="Laborator PSYBIS" :evenimente="candidat.evenimenteTest"></rezultate-test>
  </div>
  <div v-show="candidat.testInceput" :id="containerId" />

  </div>
  <q-dialog v-model="idinvalid" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="network_wifi" />


          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Inchide</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alerta</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         Acest identificator este invalid! Va rugam sa incercati din nou!
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>
