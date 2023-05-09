<script setup lang="ts">
import {ref} from 'vue'
import {useConceptieTesteStore} from '../stores/StoreConceptieTeste'
import AntetTest from '@/components/AntetTest.vue'
import Game from '@/components/Game.vue'

const conceptieStore = useConceptieTesteStore()
console.log('Store conceptie teste', conceptieStore.colectieTeste)

let tab=ref('design')
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

</script>

<template>
      <div class="flex flex-center column " >
        <div class="q-mt-md text-h6">Studio conceptie baterii de teste</div>
        <div class="row shadow-2 justify-around no-wrap" style="width:80vw;">  
                <div class="col-3 q-ma-sm q-pa-sm">
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
                        <!-- <div v-for="n in 100" :key="n" class="q-pa-xs">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </div> -->

                        <q-list bordered class="q-pa-md rounded-borders" >
      

                            <q-item v-for="test in conceptieStore.colectieTeste" :key="test" class="q-pa-xs">
                                <q-item-section avatar top>
                                <q-icon name="account_tree" color="black" size="34px" />
                                </q-item-section>

                                <q-item-section top class="col-6 gt-sm">
                                <q-item-label class="q-mt-sm"> {{ test }}</q-item-label>
                                </q-item-section>

                         

                                <q-item-section top side>
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
                                    <q-btn size="12px" flat dense round icon="more_vert" />
                                </div>
                                </q-item-section>
                            </q-item>

      
                        </q-list>
                    </q-scroll-area>
                </div>
                <div class="col-auto align-center">
                    <div class="flex flex-column column q-pa-md" style="width:960px;">

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
                                        <q-tree
                                            :nodes="arboretest"
                                            node-key="label"
                                            selected-color="primary"
                                            v-model:selected="selected"
                                            default-expand-all
                                        ></q-tree>
                                            </q-scroll-area>
                                        </div>
                                    </template>

                                    <template v-slot:after>
                                        <q-tab-panels
                                        v-model="selected"
                                        animated
                                        transition-prev="jump-up"
                                        transition-next="jump-up"
                                        >
                                        <q-tab-panel name="Test 1">
                                            <antet-test />
                                        </q-tab-panel>

                                        <q-tab-panel name="Food">
                                            <div class="text-h4 q-mb-md">Food</div>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                        </q-tab-panel>

                                        <q-tab-panel name="Room service">
                                            <div class="text-h4 q-mb-md">Room service</div>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                        </q-tab-panel>

                                        <q-tab-panel name="Room view">
                                            <div class="text-h4 q-mb-md">Room view</div>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                        </q-tab-panel>
                                        </q-tab-panels>
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
