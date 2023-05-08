<script setup lang="ts">
import {ref} from 'vue'

const splitterModel=ref(20)
const tabantet = ref('mails')
</script>

<template>
                  <div>
                           <q-splitter
                                        v-model="splitterModel"
                                        style="height: 250px"
                                        >

                                        <template v-slot:before>
                                            <q-tabs
                                            v-model="tabantet"
                                            vertical
                                            class="text-teal"
                                            >
                                            <q-tab name="mails" icon="mail" label="Antet" />
                                            <q-tab name="alarms" icon="alarm" label="Instructiuni" />
                                            <q-tab name="movies" icon="movie" label="Optiuni" />
                                            </q-tabs>
                                        </template>

                                        <template v-slot:after>
                                            <q-tab-panels
                                            v-model="tabantet"
                                            animated
                                            swipeable
                                            vertical
                                            transition-prev="jump-up"
                                            transition-next="jump-up"
                                            >
                                            <q-tab-panel name="mails">
                                                <div class="text-h4 q-mb-md">Mails</div>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            </q-tab-panel>

                                            <q-tab-panel name="alarms">
                                                <div class="text-h4 q-mb-md">Alarms</div>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            </q-tab-panel>

                                            <q-tab-panel name="movies">
                                                <div class="text-h4 q-mb-md">Movies</div>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                            </q-tab-panel>
                                            </q-tab-panels>
                                        </template>

                                        </q-splitter>
                                    </div>
</template>