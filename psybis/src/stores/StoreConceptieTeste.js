import {defineStore} from 'pinia'

export const useConceptieTesteStore = defineStore('conceptieTesteStore',{


    state:()=>({
        colectieTeste:['Test ABCD', 'Test 1', 'Test 2', 'Test 3']
    }),
    actions:{

    }
})