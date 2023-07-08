import {defineStore} from 'pinia'

export const useCandidatStore = defineStore('candidatStore',{
    state:()=>({
       numecandidat:'',
       numetest:'',
       idStatie:0,
       testInceput:false,
       poateFiResetat:false,
       eResetat:false,
       evenimenteTest:[]
    }),
    actions:{
        initiereTest(data){
            this.numecandidat=data.numecandidat
            this.numetest=data.numetest
            this.idStatie=data.idStatie
            this.testInceput=true
            this.evenimenteTest=[]
        },
        finalizareTest(data){
            console.log('STORE CANDIDAT FINALIZARE TEST',data)
            this.evenimenteTest=data;
            this.testInceput=false
            this.numecandidat=''
            this.numetest=''
            // aici vin cu un req /finalizaretest/:ids ca sa propag evenimentul finalizare test...
        },
        resetareTest(){
            this.poateFiResetat=false
            if(!this.eResetat) this.eResetat=true
        }
    }
})