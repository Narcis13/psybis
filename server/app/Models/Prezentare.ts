import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Prezentare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idCandidat:number

  @column()
  public id_tipexaminare:number

  @column()
  public dataprezentare:string

  @column()
  public stare:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
