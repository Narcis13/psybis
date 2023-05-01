import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'testsubitems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

       table.integer('idItem').unsigned().references('id').inTable('testitems').onDelete('CASCADE')
       table.string('text')
       table.string('parametrii')
       table.string('stare',12).defaultTo('activ')
       table.string('identificator')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
