import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController {


    public async register({request,response}:HttpContextContract){

        const validare_user = schema.create(
            {
                nume:schema.string({trim:true}),
              //  numeunic:schema.string({trim:true},[rules.unique({table:'users',column:'numeunic'})]),
                rol:schema.string({trim:true}),
                numeintreg:schema.string({trim:true}),
                password:schema.string({trim:true}),
                email:schema.string.optional({trim:true},[rules.email()]),
             //   idclinica:schema.number(),
               // createdby:schema.number(),
            }
        )
    
        try {
            const utilizator_validat = await request.validate({schema:validare_user});
    
            const utilizator = await User.create(utilizator_validat);
        
            return utilizator;
          } catch (error) {
              response.send({errors:error.messages})
          }
    
    
    
    
       }

       public async login({auth,request}:HttpContextContract){
        const {nume,password} = request.all()
     
   
           // await auth.attempt(nume,password)
           
       
    
          // console.log(numeunic,password,slug,idclinica)
           try {
             const token = await auth.use('api').attempt(nume, password,{
               expiresIn: '960 mins'
             })
             
             const loggeduser = await User.findBy('nume',nume)// aici trebuie sa ma intreb de stare ......
             if(loggeduser&&loggeduser.stare=="activ")
             return {loggeduser,token}
             else
               return 'Utilizatorul nu a putut fi autentificat!'
           }
           catch (error) {
               return error;
           }
 
            //return token
 
         
       
    }
 
    public async logout({ auth }:HttpContextContract){
    
         await auth.use('api').logout()
         return "Logged out!"
    }

}
