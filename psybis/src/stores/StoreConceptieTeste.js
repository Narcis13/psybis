import {defineStore} from 'pinia'

export const useConceptieTesteStore = defineStore('conceptieTesteStore',{


    state:()=>({
        colectieTeste:[
            {
                id:1,
                denumire:'Test RSD',
                ruta:'rsd'

            },
            {
                id:2,
                denumire:'Test 1',
                ruta:'test1'
            }
        ]
    }),
    actions:{

    }
})