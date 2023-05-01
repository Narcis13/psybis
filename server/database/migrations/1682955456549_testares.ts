import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'testares'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.integer('idCandidat').unsigned().references('id').inTable('candidats').onDelete('CASCADE')
       table.integer('idTest').unsigned().references('id').inTable('tests').onDelete('CASCADE')
       table.integer('idUser').unsigned().references('id').inTable('users').onDelete('CASCADE')
       table.date('datatest').notNullable()
       table.string('observatii')
       table.string('stare',12).defaultTo('activ')
       table.string('identificator',32)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
