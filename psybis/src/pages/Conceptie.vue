<script setup >
import {ref} from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
import {useConceptieTesteStore} from '../stores/StoreConceptieTeste'
import AntetTest from '@/components/AntetTest.vue'
import Game from '@/components/Game.vue'

const conceptieStore = useConceptieTesteStore()
console.log('Store conceptie teste', conceptieStore.colectieTeste)
const host=import.meta.env.VITE_HOST
let tab=ref('design')
let editor=ref('')
const $q = useQuasar()
//let tabantet=ref('mails')
let splitterModel=ref(30)
let selected= ref('Food')
let arboretest = [
        {
          label: 'Test 1',
          children: [
            {
              label: 'Food',
              icon: 'restaurant_menu'
            },
            {
              label: 'Room service',
              icon: 'room_service',
              children:[
                {      
                         label: 'Sub Item 1',
                        icon: 'room_service'
                    },
                {
                    label: 'Sub Item 2',
                        icon: 'room_service'
                },
                {
                    label: 'Sub Item 3',
                        icon: 'room_service'
                }
              ]
            },
            {
              label: 'Room view',
              icon: 'photo'
            }
          ]
        }
      ]

for(var i=0;i<27;i++){
    arboretest[0].children.push({label:'Item '+i,icon:'photo'
})
}

const thumbStyle= {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }

const barStyle= {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }

function saveWork(){
   console.log('salvez',editor.value)

   axios.post(host+'conceptie/salveztest',{continut:editor.value}).then(
    res=>{
        $q.notify({
          message: res.data.mesaj,
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
    }
  ).catch(err=>{
    console.log(err)
  })

}

function editeazaTest(ruta){
   console.log('editez test',ruta)
   axios.get(host+'conceptie/incarctest/'+ruta).then(
        res=>{
             console.log('continut',JSON.parse(res.data.continut))
           editor.value=res.data.continut
        }
            ).catch(err=>{
            console.log(err)
            })
}
</script>

<template>
      <div class="flex flex-center column " >
        <div class="q-mt-md text-h6">Studio conceptie baterii de teste</div>
        <div class="row shadow-2 justify-around no-wrap" style="width:80vw;">  

                <div class="col-auto align-center">
                    <div class="flex flex-column column q-pa-md" style="width:1540px;">

                        <q-card style="height:80vh;" class="justify-center">
                            <q-tabs
                            v-model="tab"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align="justify"
                            narrow-indicator
                            >
                            <q-tab name="design" label="Design" />
                            <q-tab name="preview" label="Preview" />
                           
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="design">
                                <div>
                                    <q-splitter
                                    v-model="splitterModel"
                                    
                                    >

                                    <template v-slot:before>
                                        <div class="q-pa-md">
                                            <q-scroll-area
                                                :thumb-style="thumbStyle"
                                                :bar-style="barStyle"
                                                style="height:70vh;"
                                                >
                                        <!-- <q-tree
                                            :nodes="arboretest"
                                            node-key="label"
                                            selected-color="primary"
                                            v-model:selected="selected"
                                            default-expand-all
                                        ></q-tree> -->

                                        <div class="q-ma-sm q-pa-sm">
                    
                                                 <div class="">
                                                            <q-toolbar class="bg-primary glossy text-white">


                                                            <q-toolbar-title>Baterii teste</q-toolbar-title>

                                                            <q-btn flat round dense icon="add" />
                                                            </q-toolbar>
                                                        </div>

                                                    <q-scroll-area
                                                    :thumb-style="thumbStyle"
                                                    :bar-style="barStyle"
                                                    style="height:80vh;"
                                                    >
                                            

                                                        <q-list bordered class="q-pa-md rounded-borders" >
                                    

                                                            <q-item v-for="test in conceptieStore.colectieTeste" :key="test.id" class="q-pa-xs">
                                                                <q-item-section avatar top>
                                                                <q-icon name="account_tree" color="black" size="34px" />
                                                                </q-item-section>

                                                                <q-item-section top class="col-6 gt-sm">
                                                                <q-item-label class="q-mt-sm"> {{ test.denumire }}</q-item-label>
                                                                </q-item-section>

                                                        

                                                                <q-item-section top side>
                                                                <div class="text-grey-8 q-gutter-xs">
                                                                    <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                                                                    <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="editeazaTest(test.ruta)"/>
                                                                    
                                                                </div>
                                                                </q-item-section>
                                                            </q-item>

                                    
                                                        </q-list> 
                                                      </q-scroll-area>
                                              </div>

                                            </q-scroll-area>
                                        </div>
                                    </template>

                                    <template v-slot:after>
                                        <div class="q-ma-sm q-pa-md">
                                            <q-toolbar class="bg-primary glossy text-white" style="max-width: 1120px">


                                                    <q-toolbar-title>Parametrii test</q-toolbar-title>

                                                        <q-btn flat round dense icon="save" @click="saveWork"/>
                                            </q-toolbar>
                                            <div class="q-pa-md" style="max-width: 1120px">
                                                        <q-input
                                                        v-model="editor"
                                                       
                                                        autogrow
                                                        />
                                                    </div>


                                            <!-- <q-editor 
                                                v-model="editor" 
                                                min-height="15rem"
                                                  :definitions="{
                                                    save: {
                                                    tip: 'Salveaza modificarile',
                                                    icon: 'save',
                                                    label: 'Salveaza',
                                                    handler: saveWork
                                                    }
                                                }"
                                                :toolbar="[
                                                
                                                    ['save']
                                                ]"
                                             /> -->

                                        </div>
                                    </template>
                                    </q-splitter>
                                </div>
                            </q-tab-panel>

                            <q-tab-panel name="preview">
                                <div class="flex flex-center">
                                    <Game />
                                </div>
                              
                            </q-tab-panel>

                            </q-tab-panels>
                        </q-card>
                    </div>
                </div>
                </div>
  
      </div>
    
</template>
