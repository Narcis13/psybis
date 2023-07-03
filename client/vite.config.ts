import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // se pune asta aici daca vrei sa adage la asseturi o cale deg dist--> base:'/dist/',
  plugins: [vue({
    template: { transformAssetUrls }
  }),
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  })
],
base:'client/dist/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // phaser doesn't accept inlined assets
    assetsInlineLimit: 0
  }
})

//import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ]
})*/