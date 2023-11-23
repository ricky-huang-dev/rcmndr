/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('reasons').del()
  await knex('reasons').insert([
    { reason: 'Sexual-Harrasment' },
    { reason: 'Harrasment' },
    { reason: 'Violence' },
    { reason: 'Discrimination' },
    { reason: 'Racism' },
  ])
}
