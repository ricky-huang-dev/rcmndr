export async function up(knex) {
  await knex.schema.createTable('songs', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('title').notNullable()
    table.string('artist').notNullable()
    table.string('genre')
    table.string('link')
    table.string('comments') // change this to description in future versions - this references the user's opinion of the song
    table.boolean('is_banned').defaultTo(false)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('songs')
}
