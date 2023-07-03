<script setup >
import { ref , reactive} from 'vue'
import axios from 'axios'
import {useUtilizatorStore} from '../stores/StoreUtilizator'
const UtilizatorStore = useUtilizatorStore()
const  initialPagination = {

page: 1,
rowsPerPage: 10

}

const host=import.meta.env.VITE_HOST
const state = reactive(
 { 
  testedisponibile:[
          {
            id:1,
            denumire: 'Test RSD',
            selectat:false
          },
          { 
            id:2,
            denumire: 'Chestionar 1',
            selectat:false
          },
          {
            id:3,
            denumire: 'Chestionar 2',
            selectat:false
          }
],
    candidatiprezenti:[],
    alocariteste:[]
}
)

function candidatiPrezenti(){
  state.candidatiprezenti=[]
  axios.get(host+'prezentari/azi').then(
  res=>{
     console.log('prezentarile',res.data.prezentarile[0])
     res.data.prezentarile[0].map(c=>{
      c.selectat=false;
      state.candidatiprezenti.push(c)
     })

  }
).catch(err=>{
  console.log(err)
})
}

candidatiPrezenti();

function alocarileDeAzi(){
  state.alocariteste=[]
  axios.get(host+'testari/azi').then(
  res=>{
     
     res.data.testarile[0].map(t=>{
      
      state.alocariteste.push(t)
     })

  }
).catch(err=>{
  console.log(err)
})
}

alocarileDeAzi();

const columns = [

  { name: 'nume', align: 'left', label: 'Nume prenume', field: 'nume', sortable: true },
  { name: 'test', label: 'Test/Chestionar', field: 'numetest', sortable: true },
  { name: 'nrdosar', label: 'Numar dosar', field: 'nrdosar', sortable: true  },
  { name: 'datatest', label: 'Data test', field: 'datatest' },
  { name: 'identificator', label: 'Identificator ', field: 'identificator' }

]

function genIdentificator(){

  var nt= Math.floor(10000000 + Math.random() * 90000000)
  return nt.toString(36)
}

function alocareteste(){
  var azi = (new Date()).toISOString().split('T')[0]

let alocari=[]
   state.candidatiprezenti.map(c=>{
      if(c.selectat){
        state.testedisponibile.map(t=>{
          if(t.selectat){
            alocari.push({
              idcandidat:c.idcandidat,
              idtest:t.id,
              iduser:UtilizatorStore.id,
              datatest:azi, 
              idprezentare:c.idprezentare,
              numetest:t.denumire, 
              identificator:genIdentificator()
            })
          }
        })
      }

   })

   //console.log('Alocare teste',alocari)
   axios.post(host+'prezentari/alocareteste',alocari).then(
    res=>{
      alocarileDeAzi()
      state.candidatiprezenti.map(c=>{
      c.selectat=false
   })

      state.testedisponibile.map(t=>{
      t.selectat=false
    })
    }
   ).catch(err=>{
    console.log(err)
   })



}

const rows = [

]


</script>
<template>
    <q-page class=" column items-center justify-start q-gutter-sm " >
        <div class=" col-1 text-h6 q-ma-sm ">Alocare teste</div>
            <!-- <div class="flex flex-center q-pa-md" style="width: 1024px"> -->
                <div  style="width: 900px;height:400px">
                      <div class="row justify-center" >

                        <div class=" col-5">

                          <q-scroll-area style="height:380px"> 
                            <q-list  bordered padding >

                              <q-item-label header>Teste disponibile</q-item-label>
                              <q-item v-for="test in state.testedisponibile"  :key="test.id" tag="label" v-ripple>
                                      <q-item-section side top>
                                      <q-checkbox v-model="test.selectat" />
                                      </q-item-section>

                                      <q-item-section>
                                      <q-item-label>{{ test.denumire }}</q-item-label>

                                      </q-item-section>
                                  </q-item>



                              </q-list>
                          </q-scroll-area>
                        </div>


                          <div class="column col-auto justify-center" style="height:300px">
                            <q-btn class="q-mx-sm" color="purple" label="Aloca -->"  @click="alocareteste"/>
                          </div>


                           <div class=" col-5" >
                            <q-scroll-area style="height:380px"> 
                            <q-list class="" bordered padding >

                                  <q-item-label header>Candidati prezenti</q-item-label>
                                  <q-item v-for="candidat in state.candidatiprezenti" tag="label" :key="candidat.idprezentare" v-ripple>
                                          <q-item-section side top>
                                          <q-checkbox v-model="candidat.selectat" />
                                          </q-item-section>

                                          <q-item-section>
                                          <q-item-label>{{candidat.nume}}</q-item-label>
                                          <q-item-label caption>
                                              Dosar: {{ candidat.nrdosar }}
                                          </q-item-label>
                                          </q-item-section>
                                      </q-item>



                                  </q-list>   
                                  </q-scroll-area>
                           </div>

                         
                      </div>
                   
  
                 
                 
                </div>

                <div class=" col-6 q-pa-md" style="width: 900px">
                    <q-table
                        
                        :pagination="initialPagination"
                        :rows="state.alocariteste"
                        :columns="columns"
                        row-key="name"
                    >

                    <template v-slot:top>
                                <div class="q-pa-sm text-h6">Alocari teste</div>
                                
                               
                                <div class="flex" style="min-width:200px;max-height:100px;">
                                    <q-btn   class="q-ma-sm"  round color="red" icon="remove" >
                                        <q-tooltip class="bg-accent">Sterge</q-tooltip>
                                    </q-btn>


                                

                                </div>

                             </template>
                    
                  </q-table>
                </div>

            <!-- </div> -->
    </q-page>
   
</template>

<style>
.contur {
    border-style: solid;
}
</style>