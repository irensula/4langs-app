/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_words').del()
  await knex('user_words').insert([
    {userID: 1, wordID: 1},
    {userID: 2, wordID: 3},
    {userID: 2, wordID: 4}
  ]);
};
