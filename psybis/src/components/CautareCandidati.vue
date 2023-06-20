<script setup lang="ts">
import {ref,computed,reactive} from 'vue'
import axios from 'axios'

const host=import.meta.env.VITE_HOST
/*     cautare candidati      */
let stringOptions = [
 
]
const model = ref(null)
let prompt=ref(false)
const state=reactive({

  tipuri_examen:[]
})
let tip_examen=ref(null)
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

let candidatselectat = computed(()=>{
  return model.value?model.value:{label:'Candidat',nrdosar:'',datanastere:''}
})
const options = ref(stringOptions)

function filterFn (val, update, abort) {

        update(() => {
            if(val.length===3){
                let url=''
                const c = val.charAt(0)
                if (c >= '0' && c <= '9') {
                    // it is a number
                  url=host+'candidati/caut/dosar/'+val
                } else {
                    // it isn't
                    url=host+'candidati/caut/nume/'+val
                }

               axios.get(url).then(
                                res=>{
                                     console.log('candidati..',res.data.candidati[0])
                                     stringOptions=[]
                                     res.data.candidati[0].map(c=>{
                                         stringOptions.push(
                                            {
                                                label:c.nume,
                                                value:c.id,
                                                mask:val.charAt(0) >= '0' && val.charAt(0) <= '9'?''+c.nrdosar:c.nume,
                                                nrdosar:c.nrdosar,
                                                datanastere:c.datanastere
                                            }
                                            )
                                   })
                                }
                                ).catch(err=>{
                                console.log(err)
                                })
            }
         
          const needle = val.toLocaleLowerCase()
          options.value = stringOptions.filter(v => v.mask.toLocaleLowerCase().indexOf(needle) > -1)
        })
      }
function     setModel (val) {
    console.log('set model',val,model.value)
    options.value.map(o=>{
      if(o.label==val) {
          model.value={
            value:o.value,
            label:o.label,
            nrdosar:o.nrdosar,
            datanastere:o.datanastere
          }
      }
    })
       // model.value = val
      }

/*                     */

</script>

<template>
                <div class="">
                  <div class="q-gutter-md row">
                      <q-select
                        outstanding
                        
                        :model-value="model"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        @input-value="setModel"
                        label="Nr. dosar / Nume candidat"
                        hint="Tastati primele caractere nr dosar sau nume.."
                        style="width: 250px; padding-bottom: 32px"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Niciun rezultat
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>

                    <q-card class="q-mt-xl my-card">
                        <q-card-section class="bg-purple text-white">
                            <div class="text-h6">{{ candidatselectat.label }}</div>
                            <div class="text-subtitle2">Nr. dosar: {{ candidatselectat.nrdosar }}</div>
                            <div class="text-subtitle2">Data nastere: {{ candidatselectat.datanastere }}</div>
                        </q-card-section>

                        <q-card-actions align="around">
                            <q-btn flat @click="prompt=!prompt">Prezentare noua</q-btn>
                            <q-btn flat>Istoric</q-btn>
                        </q-card-actions>
                        </q-card>

                        <q-dialog v-model="prompt" persistent>
                              <q-card style="min-width: 350px">


                                <q-card-section class="q-pt-none">
                                  <div class="q-pa-md">
                                      <q-select
                                        label="Tip examen"
                                        filled
                                        v-model="tip_examen"

                                      
                                        :options="state.tipuri_examen"
                                        input-debounce="0"
                                      
                                        style="width: 250px"
                                      ></q-select>
                                </div>
                                </q-card-section>

                                <q-card-actions align="right" class="text-primary">
                                  <q-btn flat label="Abandon" v-close-popup />
                                  <q-btn flat label="Adauga" v-close-popup />
                                </q-card-actions>
                              </q-card>
                            </q-dialog>       
                </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>