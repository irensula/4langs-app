/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_images').del()
  await knex('word_images').insert([
    {wordID: 1, categoryID: 1, word_url: '/images/family/family.png'},
    {wordID: 2, categoryID: 1, word_url: '/images/family/mother.png'},
    {wordID: 3, categoryID: 1, word_url: '/images/family/father.png'},
    {wordID: 4, categoryID: 1, word_url: '/images/family/son.png'},
    {wordID: 5, categoryID: 1, word_url: '/images/family/daughter.png'},
    {wordID: 6, categoryID: 2, word_url: '/images/family/sister.png'},
    {wordID: 7, categoryID: 2, word_url: '/images/family/brother.png'},
    {wordID: 8, categoryID: 2, word_url: '/images/family/grandmother.png'},
    {wordID: 9, categoryID: 2, word_url: '/images/family/grandfather.png'},
    {wordID: 10, categoryID: 2, word_url: '/images/family/aunt.png'},
    {wordID: 11, categoryID: 2, word_url: '/images/family/uncle.png'}
  ]);
};