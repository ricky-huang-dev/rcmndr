export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('email').primary()
    table.string('nickname').notNullable().unique()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.boolean('public')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
