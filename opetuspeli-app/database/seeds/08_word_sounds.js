/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_sounds').del()
  await knex('word_sounds').insert([
    {wordID: 6, language: 'en', sound_file: '/sounds/mother.mp3'},
    {wordID: 7, language: 'en', sound_file: '/sounds/father.mp3'},
    {wordID: 8, language: 'en', sound_file: '/sounds/sister.mp3'},
    {wordID: 9, language: 'en', sound_file: '/sounds/brother.mp3'},
    {wordID: 10, language: 'en', sound_file: '/sounds/grandmother.mp3'},
    {wordID: 11, language: 'en', sound_file: '/sounds/grandfather.mp3'},
    {wordID: 12, language: 'en', sound_file: '/sounds/aunt.mp3'},
    {wordID: 13, language: 'en', sound_file: '/sounds/uncle.mp3'}
  ]);
};