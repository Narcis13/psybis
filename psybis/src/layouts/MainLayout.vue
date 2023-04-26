<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            <q-avatar class="q-mr-md">
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            PSYBIS Management App
          </q-toolbar-title>

          <q-space />
          
          <q-btn push outline rounded color="white" :label="UtilizatorStore.autentificat?'Deconectare':'Autentificare'" >
              <q-popup-proxy>
              <div class="column items-center q-pa-lg">
                <q-input v-show="!UtilizatorStore.autentificat" standout="bg-teal text-white" class="q-mt-md"  v-model="nume" label="Nume" />
                <q-input v-show="!UtilizatorStore.autentificat"  standout="bg-teal text-white" class="q-mt-md" v-model="password" type="password" label="Parola" />
                <q-btn v-show="!UtilizatorStore.autentificat"  v-close-popup class="glossy q-ma-md col" rounded color="primary" icon="local_activity" label="LOGIN" @click="autentificare"/>

                <q-card class="col  q-mt-md" v-if="UtilizatorStore.autentificat">
                
                
                </q-card>
              </div>
              </q-popup-proxy>
           </q-btn>

        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title>
      
            <div>PSYBIS Management App</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
    </q-layout>
  </template>
  
  <script>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useQuasar } from 'quasar'
  import {useUtilizatorStore} from '../stores/StoreUtilizator'
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
      const UtilizatorStore = useUtilizatorStore()
      const $q = useQuasar()
      const nume=ref("")
      const password=ref("")
      console.log(UtilizatorStore.rol,$q)
      const host=import.meta.env.VITE_HOST
      const autentificare = ()=>{
        //console.log(nume.value)
        //UtilizatorStore.autentificare(nume.value,password.value)

        axios.post(host+'login',{nume:nume.value,password:password.value}).then(
                      res => {
                        console.log('Raspuns la autentificare ',res.data)
                        nume.value=''
                        password.value=''
                        if(res.data.loggeduser){
                         $q.notify({
                                  message:'Utilizator autentificat cu succes!',
                                  timeout:2000,
                                  position:'top',
                                  color:'positive'
                                }) 
                                UtilizatorStore.autentificare(res.data.loggeduser,res.data.token)
                  
                        }
                        else
                        {
                          $q.notify({
                                  message:'Autentificare nereusita!',
                                  timeout:3000,
                                  position:'top',
                                  color:'negative'
                                }) 
                        }

                      }
              ).catch(err=>{
                nume.value=''
                password.value=''
                    $q.notify({
                              color: 'negative',
                              timeout:1500,
                              position:'top',
                              icon: 'delete',
                              message: `User sau parola incorecte...`
                            })
              console.log('Eroare autentificare',err);
              });
      }

      return {
        leftDrawerOpen,
        nume,
        password,
        autentificare,
        UtilizatorStore,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>