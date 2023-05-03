<script setup lang="ts">

</script>

<template>
        <q-card class="my-card">
                <q-card-section>
                <q-list bordered>
                    <q-expansion-item
                    
                        group="somegroup"
                        icon="settings"
                        label="RECEPTIE"
                        default-opened
                        header-class="text-primary"
                    >
                        <q-card>
                        <q-card-section>
                            <q-btn to="receptie" class="full-width q-ma-xs" color="indigo"  no-caps>
                                Receptie <br> Candidati
                            </q-btn>
                            <q-btn to="alocareteste" class="full-width q-ma-xs" color="indigo"  no-caps>
                                Alocare<br>Teste
                            </q-btn>
              
                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="edit_calendar" label="CONFIGURARE" header-class="text-teal">
                        <q-card>
                        <q-card-section>

                            <q-btn to="adminpro" class="full-width q-ma-xs" color="teal" no-caps>
                                Utilizatori
                            </q-btn>
                            <q-btn to="rappro" class="full-width q-ma-xs" color="teal" no-caps>
                                Statii<br>lucru
                            </q-btn>
                            <q-btn to="soli456" class="full-width q-ma-xs" color="teal" no-caps>
                                Baterii<br>teste
                            </q-btn>
                            <q-btn to="soli456" class="full-width q-ma-xs" color="teal" no-caps>
                                Nomenclatoare<br>Liste
                            </q-btn>

                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="rule" label="ANALIZA & RAPOARTE" header-class="text-purple">
                        <q-card>
                        <q-card-section>
                            <q-btn to="clin777" class="full-width q-ma-xs" color="purple" no-caps>
                                Candidati in perioada
                            </q-btn>
                            <q-btn  to="u852" class="full-width q-ma-xs" color="purple" no-caps>
                                Evaluare multidimensionala
                            </q-btn>
                            <q-btn  to="sp987" class="full-width q-ma-xs" color="purple" no-caps>
                                Rezultate
                            </q-btn>
                            <q-btn  to="ser369" class="full-width q-ma-xs" color="purple" no-caps>
                                Aviz psihologic
                            </q-btn>
          

                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="settings" label="STUDIO" header-class="text-grey-9">
                        <q-card>
                        <q-card-section>

                            <q-btn  class="full-width q-ma-xs" to="clinici111" color="grey-9" no-caps>
                            Import <br> Imagini & Sunete
                            </q-btn>
                            <q-btn class="full-width q-ma-xs" color="grey-9" no-caps>
                                Conceptie <br> Baterii teste
                            </q-btn>
               

                        </q-card-section>
                        </q-card>
                    </q-expansion-item>
                    </q-list>
                </q-card-section>
                <div class="flex flex-center q-pa-sm">
                    <span class="q-mr-md">v. 1.0.0.</span>
                    <a class="doc-link" href="https://eleventen.ro" target="_blank" rel="noopener">elEvenTen app<span class="q-icon" aria-hidden="true" role="presentation"><svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg></span></a>
                </div>
      
    </q-card>
</template>

<style scoped>
.my-card{
    width: 100%;
    max-width: 250px;
}

</style>