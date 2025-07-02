/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_sentences').del()
  await knex('user_sentences').insert([
    {userID: 1, sentenceID: 1},
    {userID: 2, sentenceID: 3},
    {userID: 2, sentenceID: 4}
  ]);
};