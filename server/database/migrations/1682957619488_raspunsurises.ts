import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'raspunsurises'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.integer('idSesiuneTestare').unsigned().references('id').inTable('sesiunitestares').onDelete('CASCADE')
      table.integer('idItem').unsigned().references('id').inTable('testitems').onDelete('CASCADE')
      table.integer ('scor')
      table.string ('raspuns')
      table.integer ('durata')
      table.string ('meta')
      table.string ('stare',12).defaultTo('activ')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
