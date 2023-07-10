import {defineStore} from 'pinia'

export const useMonitorizareStatiiStore = defineStore('monitorizareStatiiStore',{


    state:()=>({
        active:[]
    }),
    actions:{
       statieDevineActiva(payload){
        
          this.active.push({statie:payload})
         // console.log('introcu statii active',payload,this.active)
       },
       statieDevineInactiva(ids){
         console.log('inactivare statie',ids)
        this.active=this.active.filter(statie=>statie.statie.statie!=ids)
       }
    }
})