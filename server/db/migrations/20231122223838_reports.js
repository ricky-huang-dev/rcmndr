export async function up(knex) {
  await knex.schema.createTable('reports', (table) => {
    table.increments('id').primary()
    table.timestamp('created_on')
    table.string('reported_by')
    table.integer('reason_id')
    table.boolean('is_processed')
    table.integer('song_id')
    table.integer('moderator_id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('reports')
}
