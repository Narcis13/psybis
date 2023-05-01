import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'testitems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.integer('idTest').unsigned().references('id').inTable('tests').onDelete('CASCADE')
      table.string('tip',32)
      table.integer ('durata')
      table.boolean ('necesitaconfirmare')
      table.string ('actiuneinainte',32)
      table.string('actiuneintimpul',32)
      table.string  ('actiunedupa',32)
      table.string ('parametrii')
      table.string ('optiuni')
      table.string ('stare',12).defaultTo('activ')
      table.string ('titlu')
      table.string ('descriere')
      table.string ('instructiuni')
      table.string ('reguliscor')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
