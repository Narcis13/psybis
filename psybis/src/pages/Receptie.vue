<script setup lang="ts">
import {ref,reactive,computed} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import CautareCandidati from '@/components/CautareCandidati.vue'

let tab= ref('nou')
const $q = useQuasar()
let datanastere = ref('1975/01/01')
let optiunistudii=['Studii medii','Studii universitare','Studii postuniversitare']
let optiunisex=['Masculin','Feminin']
let sex=ref('Masculin')
let studii = ref('Studii universitare')
let nume = ref('')
let initiala = ref('')
let prenume = ref('')
let angajator = ref('')
let numardosar=ref('')
let categorie=ref(null)
let categorii:any[]=[]
let functie=ref(null)
let functii:any[]=[]

const state=reactive({
  categorii:[],
  functii:[],
  candidati:[],
  tipuri_examen:[]
})
const host=import.meta.env.VITE_HOST





let tip_examen=ref(null)
axios.get(host+'candidati/toatecategoriile').then(
  res=>{
    // console.log('toate categoriile',res.data)
     res.data.map((c:any)=>{
      state.categorii.push({
        label:c.denumire,
        value:c.id
      })
      categorie.value=state.categorii[0]
     })
  }
).catch(err=>{
  console.log(err)
})

const tipExamenSelectat = computed(()=>{
  return tip_examen.value!==null
})

axios.get(host+'candidati/toatefunctiile').then(
  res=>{
   //  console.log('toate categoriile',res.data)
     res.data.map((f:any)=>{
      state.functii.push({
        label:f.denumire,
        value:f.id
      })
      functie.value=state.functii[0]
     })
  }
).catch(err=>{
  console.log(err)
})


axios.get(host+'prezentari/tipuriexamene').then(
  res=>{
    //console.log('toate tipurile de examene',res.data)
    state.tipuri_examen=[]
    res.data.tipuriExamene.map(t=>{
       state.tipuri_examen.push({
        value:t.id,
        label:t.denumire
       })
    })
  }
).catch(err=>{
  console.log(err)
})


function ultimiiCandidati(){
  state.candidati=[]
  axios.get(host+'candidati/ultimii').then(
  res=>{
     //console.log('ultimii candidati',res.data.ultimii[0])
     res.data.ultimii[0].map(c=>{
      state.candidati.push(c)
     })

  }
).catch(err=>{
  console.log(err)
})
}

ultimiiCandidati()

function adaugaCandidat(cuPrezentare=false){
  const candidat={
    nume:nume.value,
    prenume:prenume.value,
    initialatata:initiala.value,
    datanasterii:datanastere.value,
    sex:sex.value,
    studii:studii.value,
    idfunctie:functie.value.value,
    idcategorie:categorie.value.value,
    angajator:angajator.value,
    coddosar:numardosar.value.length>3?numardosar.value:false,
    cuPrezentare:tip_examen.value!==null,
    id_tipexaminare:tip_examen.value!==null?tip_examen.value.value:0
  }
  console.log(candidat)
  axios.post(host+'candidati/candidatnou',candidat).then(
    res=>{
      if(res.data.candidat){
                         $q.notify({
                                  message:'Candidat adaugat cu succes!',
                                  timeout:2000,
                                  position:'top',
                                  color:'positive'
                                }) 
                              
                            reset();
                            ultimiiCandidati();
                        }
                        else
                        {
                          $q.notify({
                                  message:'Ceva nu a functionat!',
                                  timeout:3000,
                                  position:'top',
                                  color:'negative'
                                }) 
                        }
    }
  ).catch(err=>{
    console.log(err)
  })

}
function adaugaTipExamenNou(val,done){
   
   axios.post(host+'candidati/tipexamennou',{denumire:val}).then(
    res=>{
      console.log(res.data.tip[0])   
      done({value:res.data.tip[0],label:val}, 'add')
      //tip_examen.value.value=res.data.tip[0]
      
    }
  ).catch(err=>{
    console.log(err)
  })
  
}

function reset(){
  nume.value = ''
 initiala.value = ''
 prenume.value = ''
 angajator.value = ''
 numardosar.value=''
 sex.value='Masculin'
 studii.value = 'Studii universitare'
 datanastere.value='1975/01/01'
 categorie.value=state.categorii.length>0?state.categorii[0]:null
 tip_examen.value=null
 functie.value=state.functii.length>0?state.functii[0]:null
 }
 const  initialPagination = {

        page: 1,
        rowsPerPage: 10

      }
const columns = [

  { name: 'nume', align: 'left', label: 'Nume prenume', field: 'nume', sortable: true },
  { name: 'nrdosar', align: 'center', label: 'Numar dosar', field: 'nrdosar', sortable: true },
  { name: 'datanastere', align: 'center', label: 'Data nasterii', field: 'datanastere', sortable: true },
  { name: 'functie', align: 'left', label: 'Functie', field: 'functie', sortable: true },
  { name: 'stare', align: 'left', label: 'Status', field: 'stare', sortable: true }

  
]



</script>
<template>
<div class="flex flex-center column" >
      <div class="text-h6 q-ma-md">Receptie candidati</div>
      <div class="row bg-blue-grey-1" style="min-height: 100vh; width: 90%; padding: 24px;">
        <div id="parent" class="q-pa-md fit column justify-center items-center q-gutter-md" >
          
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            >
              <q-tab name="nou" label="Candidat nou" />
              <q-tab name="cauta" label="Cauta candidat" />
          
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="nou">
                <q-card class="q-ma-md q-pa-md no-border-radius" >
                      <div class="row q-gutter-md q-pa-md" >
                        <q-input v-model="nume" class="col " label="Nume candidat" style="width:200px;"/>
                        <q-input v-model="initiala" class="col " label="I.T." style="max-width:30px;"/>
                        <q-input v-model="prenume" class="col " label="Prenume candidat" style="width:200px;"/>
                        <q-input label="Data nastere" v-model="datanastere" mask="date" :rules="['date']" style="width:200px;">
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="datanastere">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Inchide" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                        
                        <q-select v-model="studii" :options="optiunistudii" label="Nivel studii" style="width:200px;"/>
                      </div>
                      </q-card>
                    
                      <q-card class="q-ma-md q-pa-md no-border-radius" >
                        <div class="row q-gutter-md q-pa-md" >
                        <q-input v-model="numardosar" class="col " label="Numar dosar" style="width:200px;"/>
                        <q-select v-model="sex" :options="optiunisex" class="col " label="SEX" style="max-width:100px;"/>
                        <q-select  v-model="categorie" :options="state.categorii" class="col " label="Categorie" style="width:200px;"/>
                        <q-select v-model="functie" :options="state.functii" class="col " label="Functie" style="width:400px;"/>
                        <!-- <q-input v-model="angajator" class="col " label="Angajator" style="width:200px;"/> -->
                      </div>
                      </q-card>
                    
                      <q-card class="q-ma-md q-pa-xs border-radius ">
                        <q-card-section>
                            <div class="flex flex-center q-pa-xs" >
                                <!-- <q-btn class="q-mr-xl" color="primary" icon="mail" label="ADAUGA CANDIDAT!" @click="adaugaCandidat"/> -->
                                <div class="q-pa-md">
                                  <q-select
                                    label="Tip examen"
                                    filled
                                    v-model="tip_examen"
                                    use-input
                                    use-chips
                                   
                                    :options="state.tipuri_examen"
                                    input-debounce="0"
                                    @new-value="adaugaTipExamenNou"
                                    style="width: 250px"
                                  ></q-select>
                                </div>
                                <q-btn class="q-mr-xl" color="primary" icon="mail" :label="tipExamenSelectat?'Adauga candidat + prezentare':'Adauga candidat'" @click="adaugaCandidat()"/>
                                <q-btn color="primary" icon="mail" label="Reset" @click="reset"/>
                            </div>
                        </q-card-section>
                      </q-card>
                  
                      <q-card class=" q-mt-xl no-border-radius">
                        <div class="q-pa-md">
                                <q-table
                                dense
                                title="Candidati"
                                :rows="state.candidati" 
                                :columns="columns"
                                :pagination="initialPagination"
                                row-key="id"
                                />
                        </div>
                      </q-card>
              </q-tab-panel>

              <q-tab-panel name="cauta">
                <cautare-candidati></cautare-candidati>
               
              </q-tab-panel>

              
            </q-tab-panels>

     
  
        </div>
      </div>
    </div>
   
</template>