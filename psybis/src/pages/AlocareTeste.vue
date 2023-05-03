<script setup lang="ts">
import { ref } from 'vue'

let check1=ref(false)
let check2=ref(false)
let check3=ref(false)


</script>
<template>
    <div class="flex flex-center column" >
        <div class="text-h6 q-ma-md">Alocare teste</div>
            <div class="flex flex-center q-pa-md" style="width: 90%">
                <div class="row q-gutter-xl" >
                    <q-list class="col-3" bordered padding>

                        <q-item-label header>Teste disponibile</q-item-label>
                        <q-item tag="label" v-ripple>
                                <q-item-section side top>
                                <q-checkbox v-model="check1" />
                                </q-item-section>

                                <q-item-section>
                                <q-item-label>Notifications</q-item-label>
                                <q-item-label caption>
                                    Notify me about updates to apps or games that I downloaded
                                </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item tag="label" v-ripple>
                                <q-item-section side top>
                                <q-checkbox v-model="check2" />
                                </q-item-section>

                                <q-item-section>
                                <q-item-label>Sound</q-item-label>
                                <q-item-label caption>
                                    Auto-update apps at anytime. Data charges may apply
                                </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item tag="label" v-ripple>
                                <q-item-section side top>
                                <q-checkbox v-model="check3" />
                                </q-item-section>

                                <q-item-section>
                                <q-item-label>Auto-add widgets</q-item-label>
                                <q-item-label caption>
                                    Automatically add home screen widgets
                                </q-item-label>
                                </q-item-section>
                            </q-item>
                        
                    </q-list>

                    <q-btn color="purple" label="Aloca -->" />

                    <q-list class="col-3" bordered padding>

                            <q-item-label header>Candidati prezenti</q-item-label>
                            <q-item tag="label" v-ripple>
                                    <q-item-section side top>
                                    <q-checkbox v-model="check1" />
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Notifications</q-item-label>
                                    <q-item-label caption>
                                        Notify me about updates to apps or games that I downloaded
                                    </q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item tag="label" v-ripple>
                                    <q-item-section side top>
                                    <q-checkbox v-model="check2" />
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Sound</q-item-label>
                                    <q-item-label caption>
                                        Auto-update apps at anytime. Data charges may apply
                                    </q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item tag="label" v-ripple>
                                    <q-item-section side top>
                                    <q-checkbox v-model="check3" />
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Auto-add widgets</q-item-label>
                                    <q-item-label caption>
                                        Automatically add home screen widgets
                                    </q-item-label>
                                    </q-item-section>
                                </q-item>

                    </q-list>    
                </div>
            </div>
    </div>
   
</template>