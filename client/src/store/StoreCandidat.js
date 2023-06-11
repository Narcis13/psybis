import {defineStore} from 'pinia'

export const useCandidatStore = defineStore('candidatStore',{
    state:()=>({
       numecandidat:'',
       numetest:'',
       testInceput:false,
       poateFiResetat:false,
       eResetat:false,
       evenimenteTest:[]
    }),
    actions:{
        initiereTest(data){
            this.numecandidat=data.numecandidat
            this.numetest=data.numetest
            this.testInceput=true
            this.evenimenteTest=[]
        },
        finalizareTest(data){
            console.log('STORE CANDIDAT FINALIZARE TEST',data)
            this.evenimenteTest=data;
            this.testInceput=false
            this.numecandidat=''
            this.numetest=''
            
        },
        resetareTest(){
            this.poateFiResetat=false
            if(!this.eResetat) this.eResetat=true
        }
    }
})