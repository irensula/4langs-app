/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_word_images').del()
  await knex('user_word_images').insert([
    {userID: 1, imageID: 1},
    {userID: 1, imageID: 2},
    {userID: 2, imageID: 3}
  ]);
};
