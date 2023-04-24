import {defineStore} from 'pinia'

export const useUtilizatorStore = defineStore('utilizatorCurentStore',{
    state : () =>({
        nume:'',
        rol:'admin',
        token:''
    })

})
