export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    // //the auth0_id column is indexed to improve the performance of queries filtering the auth0_id in users.ts
    table.string('auth0_id').primary().index()
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
