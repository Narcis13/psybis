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

          <q-spacer />
          
          <q-btn push color="primary" label="Handles click">
              <q-popup-proxy>
                <q-banner>
                  <template v-slot:avatar>
                    <q-icon name="signal_wifi_off" color="primary" />
                  </template>
                  You have lost connection to the internet. This app is offline.
                </q-banner>
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
      console.log(UtilizatorStore.rol)

      
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>