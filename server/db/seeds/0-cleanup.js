export async function seed(knex) {
  await knex('reports').del()
  await knex('notifications').del()
  await knex('songs').del()
  await knex('following_list').del()
  await knex('users').del()
  await knex('reasons').del()
}
