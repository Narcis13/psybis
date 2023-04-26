import {defineStore} from 'pinia'

export const useUtilizatorStore = defineStore('utilizatorCurentStore',{
    state : () =>({
        nume:'',
        rol:'admin',
        token:''
    }),
    actions:{
        autentificare(nume,password){
            console.log('Tentativa de autentificare(store pinia)',nume,password)
        }
    }

})
