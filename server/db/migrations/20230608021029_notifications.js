export async function up(knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary()
    //the user_id column is indexed to improve the performance of queries filtering the user_id in notifications.ts
    table.string('user_id').references('users.auth0_id').index() // the user who is receiving the notification
    table.string('friend_id').references('users.auth0_id') // the user who is sending the notification
    table.string('message')
    //the is_read column is indexed to improve the performance of queries filtering the is_read in notifications.ts
    table.boolean('is_read').defaultTo(false).index() // automatically set to false
    table.integer('timestamp') // the time the notification was sent
  })
}

export async function down(knex) {
  return knex.schema.dropTable('notifications')
}
