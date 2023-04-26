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
          
          <q-btn push outline rounded color="white" label="Autentificare" >
              <q-popup-proxy>
              <div class="column items-center q-pa-lg">
                <q-input standout class="q-mt-md"  v-model="nume" label="Nume" />
                <q-input standout class="q-mt-md" v-model="password" type="password" label="Parola" />
                <q-btn v-close-popup class="glossy q-ma-md col" rounded color="primary" icon="local_activity" label="LOGIN" @click="autentificare"/>
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
  import {useUtilizatorStore} from '../stores/StoreUtilizator'
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
      const UtilizatorStore = useUtilizatorStore()
    
      const nume=ref("")
      const password=ref("")
      console.log(UtilizatorStore.rol)

      const autentificare = ()=>{
        console.log(nume.value)
        UtilizatorStore.autentificare(nume.value,password.value)
      }

      return {
        leftDrawerOpen,
        nume,
        password,
        autentificare,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>