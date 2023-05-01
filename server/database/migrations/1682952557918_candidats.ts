import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'candidats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('nume',64).notNullable()
      table.string ('cnp',13)
      table.string ('categoria',36)
      table.string ('sex',1)
      table.integer ('virsta')
      table.string ('angajator',82)
      table.string ('poza',96)
      table.string ('stare',12).defaultTo('activ')
      table.string ('studii',32)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
