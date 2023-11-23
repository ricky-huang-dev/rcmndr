export async function up(knex) {
  await knex.schema.createTable('reports', (table) => {
    table.increments('id').primary()
    table.timestamp('created_on')
    table.string('reported_by').references('users.auth0_id')
    table.integer('reason_id').references('reasons.id')
    table.boolean('is_processed').defaultTo(false)
    table.integer('song_id').references('songs.id')
    table.integer('moderator_id').references('users.auth0_id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('reports')
}
