<script setup lang="ts">
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
        <div class="row shadow-2" style="width:80vw;">  
                <div class="col-3 q-ma-sm q-pa-sm">
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

                        <q-list bordered class="rounded-borders" >
      

                            <q-item v-for="n in 100" :key="n" class="q-pa-xs">
                                <q-item-section avatar top>
                                <q-icon name="account_tree" color="black" size="34px" />
                                </q-item-section>

                                <q-item-section top class="col-6 gt-sm">
                                <q-item-label class="q-mt-sm">Test {{ n }}</q-item-label>
                                </q-item-section>

                         

                                <q-item-section top side>
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                                    <q-btn size="12px" flat dense round icon="more_vert" />
                                </div>
                                </q-item-section>
                            </q-item>

      
                        </q-list>
                    </q-scroll-area>
                </div>
                <div class="col-auto">Dreapta</div>
                </div>
  
      </div>
    
</template>
