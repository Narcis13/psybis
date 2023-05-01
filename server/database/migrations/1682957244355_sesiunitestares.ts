import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sesiunitestares'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.integer('idTestare').unsigned().references('id').inTable('testares').onDelete('CASCADE')
       table.date('datastart').notNullable()
      table.time ('orastart').notNullable()
       table.integer('idStatieLucru').unsigned().references('id').inTable('statielucruses').onDelete('CASCADE')
       table.string('observatii')
       table.string('stare',12).defaultTo('activ')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
