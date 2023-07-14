 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

 import Drive from '@ioc:Adonis/Core/Drive'
export default class ConceptiesController {

    public async incarcaParametriiTest({params}:HttpContextContract){
 
          const contents = await Drive.get('./rsd.json')
    // console.log('incarc parametrii test ',params.r,contents.toString('utf8'))
      return {continut:contents.toString('utf8')}
    }
}
