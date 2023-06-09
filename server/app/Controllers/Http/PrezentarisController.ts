import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import Database from '@ioc:Adonis/Lucid/Database';
import Prezentare from 'App/Models/Prezentare';

export default class PrezentarisController {

    public async prezentarileZilei(){
       const azi=DateTime.now().toSQLDate()
       const sql= `
        SELECT p.id as idprezentare,c.id as idcandidat,concat(nume,' ',initialatata,' ',prenume) as nume, c.coddosar as nrdosar, p.stare as stareprezentare FROM prezentares p
        inner join candidats c on p.id_candidat=c.id
        where p.dataprezentare='${azi}'
        order by nume;
        `

        const prezentarile=await Database
        .rawQuery(sql)
        
        return {prezentarile}
    }

    public async prezentareNoua({request}:HttpContextContract){
       const data=request.body()
        
        
                const p = {
            idCandidat:data.idcandidat,
            id_tipexaminare:data.idtipexamen,
            dataprezentare:DateTime.now().toSQLDate()
        }
      const prezentare=  await Prezentare.create(p)
        
      return {prezentare}

    }

    public async toateTipurileDeExamene(){

        const tipuriExamene = await Database.from('tipuri_examinari').select('*')

        return {tipuriExamene}
    }

    public async alocareteste({request}:HttpContextContract){

       
       
        await Database.table('testares').multiInsert(request.body())
       
    }
}
