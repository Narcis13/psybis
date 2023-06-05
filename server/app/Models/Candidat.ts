import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Candidat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
public nume:string

@column()
public idfunctie:number

@column()
public idcategorie:number

@column()
public coddosar:number

@column()
public sex:string

@column()
public datanasterii:string

@column()
public angajator:string

@column()
public poza:string

@column()
public stare:string

@column()
public studii:string

@column()
public initialatata:string

@column()
public prenume:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}


/*



*/