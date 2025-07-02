/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_images').del()
  await knex('word_images').insert([
    {imageID: 1, wordID: 6, categoryID: 1, word_url: '/images/family/mother.png'},
    {imageID: 2, wordID: 7, categoryID: 1, word_url: '/images/family/father.png'},
    {imageID: 3, wordID: 8, categoryID: 2, word_url: '/images/family/sister.png'},
    {imageID: 4, wordID: 9, categoryID: 2, word_url: '/images/family/brother.png'},
    {imageID: 5, wordID: 10, categoryID: 2, word_url: '/images/family/grandmother.png'},
    {imageID: 6, wordID: 11, categoryID: 2, word_url: '/images/family/grandfather.png'},
    {imageID: 7, wordID: 12, categoryID: 2, word_url: '/images/family/aunt.png'},
    {imageID: 8, wordID: 13, categoryID: 2, word_url: '/images/family/uncle.png'}
  ]);
};