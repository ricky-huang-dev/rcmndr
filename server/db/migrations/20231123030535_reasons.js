export async function up(knex) {
  await knex.schema.createTable('reasons', (table) => {
    table.increments('id').primary()
    table.string('reason')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('reasons')
}
