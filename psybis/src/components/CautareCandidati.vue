<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'

const host=import.meta.env.VITE_HOST
/*     cautare candidati      */
let stringOptions = [
 
]
const model = ref(null)
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
                                                mask:val.charAt(0) >= '0' && val.charAt(0) <= '9'?''+c.nrdosar:c.nume
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
   // console.log('set model',val)
        model.value = val
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

                    <q-card class="my-card">
                        <q-card-section class="bg-purple text-white">
                            <div class="text-h6">Our Changing Planet</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </q-card-section>

                        <q-card-actions align="around">
                            <q-btn flat>Action 1</q-btn>
                            <q-btn flat>Action 2</q-btn>
                        </q-card-actions>
                        </q-card>
                </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>