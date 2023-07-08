import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import Database from '@ioc:Adonis/Lucid/Database';
import Ws from 'App/Services/Ws'

export default class AlocarisController {

    public async testarilezilei(){
        const azi=DateTime.now().toSQLDate()
        let sql= `
            SELECT t.id id,concat(c.nume,' ',c.initialatata,' ',c.prenume) nume, t.identificator identificator, t.numetest numetest, c.coddosar nrdosar, t.datatest datatest FROM testares t
            inner join candidats c on t.idcandidat=c.id
            where t.datatest='${azi}'
            order by nume;
            `
            const testarile=await Database
            .rawQuery(sql)
            
            return {testarile}
    }

    public async unidentificator({params}:HttpContextContract){
        const azi=DateTime.now().toSQLDate()
        let sql= `
            SELECT t.id id,concat(c.nume,' ',c.initialatata,' ',c.prenume) nume, t.identificator identificator, t.numetest numetest, c.coddosar nrdosar, t.datatest datatest, t.idprezentare idprezentare FROM testares t
            inner join candidats c on t.idcandidat=c.id
            where t.datatest='${azi}' and t.identificator='${params.id}' ;
           
            `
            const testare=await Database
            .rawQuery(sql)
            //console.log(testare)
            Ws.io.emit('message', { eveniment:'START TEST',candidat: testare[0][0] , statie:params.ids})
            return {testare}
    }
}
