import {defineStore} from 'pinia'
import axios from 'axios'
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
            const host=import.meta.env.VITE_HOST
           // console.log('STORE CANDIDAT FINALIZARE TEST',data,host)
            this.evenimenteTest=data;
            this.testInceput=false
            this.numecandidat=''
            this.numetest=''

            axios.post(host+'testari/finalizare/'+this.idStatie,{}).then(
                res=>{
      
                }
              ).catch(err=>{
                console.log(err)
              })
              
            // aici vin cu un req /finalizaretest/:ids ca sa propag evenimentul finalizare test...
        },
        resetareTest(){
            this.poateFiResetat=false
            if(!this.eResetat) this.eResetat=true
        }
    }
})