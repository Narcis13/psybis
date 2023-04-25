import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import user from 'App/Models/User';

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
    
            const utilizator = await user.create(utilizator_validat);
        
            return utilizator;
          } catch (error) {
            response.send({errors:error.messages})
          }
    
    
    
    
       }

}
