/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_texts').del()
  await knex('user_texts').insert([
    {userID: 1, textID: 2},
    {userID: 1, textID: 3},
    {userID: 2, textID: 4}
  ]);
};
