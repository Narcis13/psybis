import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Alocare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idcandidat:number

  @column()
  public idtest:number

  @column()
  public iduser:number

  @column()
  public idprezentare:number

  @column()
  public datatest:string

  @column()
  public observatii:string

  @column()
  public identificator:string

  @column()
  public stare:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
