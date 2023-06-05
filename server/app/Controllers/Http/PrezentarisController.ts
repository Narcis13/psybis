import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import Database from '@ioc:Adonis/Lucid/Database';

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

    public async alocareteste({request}:HttpContextContract){

       
       
        await Database.table('testares').multiInsert(request.body())
       
    }
}
