export async function seed(knex) {
  await knex('reasons').insert([
    { reason: 'Sexual-Harrasment' },
    { reason: 'Harrasment' },
    { reason: 'Violence' },
    { reason: 'Discrimination' },
    { reason: 'Racism' },
  ])
}
