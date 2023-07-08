<script setup>
  import {useMonitorizareStatiiStore} from '../stores/StoreMonitorizareStatii'

  const Monitorizare = useMonitorizareStatiiStore()
  console.log(Monitorizare.active)

  function arata(){
    console.log(Monitorizare.active[0])
  }
</script>

<template>
   <div class="q-pa-md row items-start q-gutter-md">

    <q-card v-for="statie in Monitorizare.active" :key="statie.statie.statie" flat bordered class="my-card bg-grey-9" >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-white">Statia: {{ statie.statie.statie }}</div>
            <div class="text-subtitle2 text-white">{{ statie.statie.candidat.nume }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
          
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-white">
           <p>Dosar nr.: {{ statie.statie.candidat.nrdosar }}</p>
           <p>Test: {{ statie.statie.candidat.numetest }}</p>
           <p>Status: Pregatire...</p>
        </div>
      
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn class="text-white" flat @click="arata">OK</q-btn>
        <q-btn class="text-white" flat>STOP</q-btn>
      </q-card-actions>
    </q-card>
   </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>