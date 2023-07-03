<script setup >
import {ref,reactive,computed} from 'vue'

const props = defineProps({
    titlu:String
})

const state = reactive(
  {
    utilizatori : []  ,
    userselectat:{}
  }
  )

let idcurent=ref(0)
        let tab=ref('lista')
        let nume_user=ref('')
        let numeintreg=ref('')
        let medium=ref(false)
        let rol=ref('operator')
        let email=ref('')
        let parola_user=ref('')
        let confirmare_parola=ref('')

//computed zone
let actiune = computed(()=>{
            return tab.value=='editare'? 'Actualizare' : tab.value=='lista'? '':'Adaugare' 
        })        

function salveaza(){


}   

const onLeft = ()=>{}
const onRight = ()=>{}

</script>

<template>
            <div  class="q-mt-sm flex flex-center column">
                <q-banner v-show="tab=='lista'" inline-actions rounded class="bg-orange text-white">
                    {{ titlu }} platforma PSYBIS 
                    <template v-slot:action>
                        <q-btn  @click="tab='adaugare'" flat label="Adauga" />
                    </template>
                </q-banner>
                <q-card class="q-mt-sm">
                    <q-card-section v-show="tab!=='lista'">
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{actiune}}</div>
                            <div class="text-subtitle2">utilizator</div>
                        </div>

                        <div class="col-auto">
                            <q-btn round  icon="cancel" @click="tab='lista'" />
                        </div>
                        </div>
                    </q-card-section>

                    <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="lista">
                        <div v-if="state.utilizatori.length==0" class="text-h6 text-indigo-7">Niciun utilizator ...</div>
                            <q-slide-item v-for="user in state.utilizatori" :key="user.id" @left="onLeft(user.id)" @right="onRight(user.id)" left-color="purple" right-color="red">
                                <template v-slot:left>
                                <div class="row items-center">
                                    <q-icon left name="create" /> Actualizeaza
                                </div>
                                </template>
                                <template v-slot:right>
                                <div class="row items-center">
                                   Sterge <q-icon right name="delete_forever" />
                                </div>
                                </template>

                                <q-item>
                                      <q-item-section>
                                            <q-item-label>{{user.numeintreg}} ({{user.rol}})</q-item-label>
                                            <q-item-label overline>{{user.nume_user}}</q-item-label>
                                      </q-item-section>  
                                      <q-item-section top side>
                                        <div class="text-grey-8 q-gutter-xs">

                                            <q-btn size="16px" flat dense round icon="lock_reset" @click="medium=true;idcurent=user.id">
                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                      <strong>Reseteaza parola</strong> 
         
                                                 </q-tooltip>
                                            </q-btn>
                                        </div>
                                     </q-item-section>   
                                </q-item>
                            </q-slide-item>
                    </q-tab-panel>

                    <q-tab-panel name="editare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']" lazy-rules label="Nume utilizator *" dense/>
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']"  lazy-rules label="Nume complet *" dense/>
                            <q-input v-model="rol" readonly label="Rol *" dense/>
                            <q-input v-model="email" label="Adresa e-mail" dense autocomplete="new-password"/>
                           
                            <div class="q-mt-sm flex flex-center"><q-btn outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="adaugare">
                        <div class="q-gutter-md" style="max-width: 480px">
                            <q-input autofocus v-model="nume_user" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']" lazy-rules label="Nume utilizator *" dense/>
                            <q-input v-model="numeintreg" :rules="[val => !!val || 'Cimp obligatoriu (min 5 caractere)',val => val.length > 4 || 'Minimum 5 caractere!']"  lazy-rules label="Nume complet *" dense/>
                            <q-input v-model="rol" readonly label="Rol *" dense/>
                            <q-input v-model="email" label="Adresa e-mail" dense/>
                            <q-input type="password" no-error-icon v-model="parola_user" hint="Min. 8 caractere " bottom-slots error-message="Folositi litere mari,mici,cifre si semne!"  label="Parola *" autocomplete="new-password" dense/>
                            <q-input type="password" no-error-icon v-model="confirmare_parola" bottom-slots error-message="Parola trebuie sa fie aceeasi!"  label="Confirmare parola *" autocomplete="new-password" dense/>
                            <div class="q-mt-sm flex flex-center"><q-btn  outline rounded color="primary" label="Salveaza" @click="salveaza" /></div>
                        </div>
                    </q-tab-panel>
                    </q-tab-panels>
                </q-card>
        </div>
</template>