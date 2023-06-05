import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Candidat from 'App/Models/Candidat';
import Prezentare from 'App/Models/Prezentare';
import { DateTime } from 'luxon';

export default class CandidatsController {
    public async toatecategoriile(){
        const categorii = await Database
                .from('categorii')
                .select('*')
         return categorii;       
    }

    public async toatefunctiile(){
        const functii = await Database
                .from('functii')
                .select('*')
         return functii;       
    }

    public async candidatnou({request}:HttpContextContract){
        //console.log(request.body())
     const date_candidat=request.body()
     const prezentare=date_candidat.cuPrezentare
     delete date_candidat.cuPrezentare;
     if(!date_candidat.coddosar){
        date_candidat.coddosar=Math.floor(100000 + Math.random() * 900000)
     }
     const candidat = await Candidat.create(date_candidat)
     
     if(prezentare){
        const p = {
            idCandidat:candidat.id,
            dataprezentare:DateTime.now().toSQLDate()
        }
        await Prezentare.create(p)
     }
     return {candidat};
    }

    public async ultimiiCandidati(){
      let sql=  `       
            SELECT c.id,concat(nume,' ',initialatata,' ',prenume) as nume, coddosar as nrdosar, datanasterii as datanastere, f.denumire as functie ,c.stare 
            FROM candidats c
            inner join functii f on c.idfunctie=f.id
            order by c.id DESC
            limit 100;
            `
        const ultimii=await Database
        .rawQuery(sql)
        
        return {ultimii}
    }
}
