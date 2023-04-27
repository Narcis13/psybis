<script setup lang="ts">

</script>

<template>
        <q-card class="my-card">
                <q-card-section>
                <q-list bordered>
                    <q-expansion-item
                    
                        group="somegroup"
                        icon="settings"
                        label="CONFIGURARE"
                        default-opened
                        header-class="text-primary"
                    >
                        <q-card>
                        <q-card-section>
                            <q-btn to="orarcab777" class="full-width q-ma-xs" color="indigo"  no-caps>
                                Orar <br> Cabinete
                            </q-btn>
                            <q-btn to="indi13" class="full-width q-ma-xs" color="indigo"  no-caps>
                                Indisponibilitati<br>Medici
                            </q-btn>
                            <q-btn to="libere638" class="full-width q-ma-xs" color="indigo"  no-caps>
                                Zile libere<br>Sarbatori legale
                            </q-btn>
                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="edit_calendar" label="PROGRAMARI" header-class="text-teal">
                        <q-card>
                        <q-card-section>

                            <q-btn to="adminpro" class="full-width q-ma-xs" color="teal" no-caps>
                                Administrare<br>Programari
                            </q-btn>
                            <q-btn to="rappro" class="full-width q-ma-xs" color="teal" no-caps>
                                Raport<br>Programari
                            </q-btn>
                            <q-btn to="soli456" class="full-width q-ma-xs" color="teal" no-caps>
                                Solicitari<br>Programare
                            </q-btn>

                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="rule" label="ADMINISTRARE" header-class="text-purple">
                        <q-card>
                        <q-card-section>
                            <q-btn to="clin777" class="full-width q-ma-xs" color="purple" no-caps>
                                Clinica
                            </q-btn>
                            <q-btn  to="u852" class="full-width q-ma-xs" color="purple" no-caps>
                                Utilizatori
                            </q-btn>
                            <q-btn  to="sp987" class="full-width q-ma-xs" color="purple" no-caps>
                                Specialitati
                            </q-btn>
                            <q-btn  to="ser369" class="full-width q-ma-xs" color="purple" no-caps>
                                Servicii
                            </q-btn>
                            <q-btn  to="med1313" class="full-width q-ma-xs" color="purple" no-caps>
                                Medici
                            </q-btn>
                            <q-btn  to="cab999" class="full-width q-ma-xs" color="purple" no-caps>
                                Cabinete
                            </q-btn>

                        </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator />

                    <q-expansion-item  group="somegroup" icon="settings" label="SUPERADMIN" header-class="text-grey-9">
                        <q-card>
                        <q-card-section>

                            <q-btn  class="full-width q-ma-xs" to="clinici111" color="grey-9" no-caps>
                            Clinici
                            </q-btn>
                            <q-btn class="full-width q-ma-xs" color="grey-9" no-caps>
                                Clienti
                            </q-btn>
                            <q-btn  class="full-width q-ma-xs" color="grey-9" no-caps>
                                Statistici
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