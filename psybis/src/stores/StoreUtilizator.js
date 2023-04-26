import {defineStore} from 'pinia'

export const useUtilizatorStore = defineStore('utilizatorCurentStore',{
    state : () =>({
        nume:'',
        rol:'admin',
        token:'',
        id:0,
        numeintreg:'',
        email:'',
        stare:'',
        autentificat:false
    }),
    actions:{
        autentificare(user,token){
         //   console.log('Tentativa de autentificare(store pinia)',nume,password)
         this.autentificat=true;
         this.rol=user.rol
         this.numeintreg=user.numeintreg
         this.stare=user.stare
         this.email=user.email
         this.id=user.id
         this.nume=user.nume
         this.token=token.token

        },
        deconectare(){
            this.autentificat=false;
            this.rol=''
            this.numeintreg=''
            this.stare=''
            this.email=''
            this.id=0
            this.nume=''
            this.token=''
        }
    }

})
