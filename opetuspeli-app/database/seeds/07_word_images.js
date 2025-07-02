/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_images').del()
  await knex('word_images').insert([
    {imageID: 1, wordID: 1, categoryID: 1, word_url: '/images/image1.png'},
    {imageID: 2, wordID: 2, categoryID: 1, word_url: '/images/image2.png'},
    {imageID: 3, wordID: 3, categoryID: 2, word_url: '/images/image3.png'},
    {imageID: 4, wordID: 4, categoryID: 2, word_url: '/images/image4.png'}
  ]);
};