 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConceptiesController {

    public async incarcaParametriiTest({params}:HttpContextContract){
        console.log('incarc parametrii test ',params.r)
    }
}
