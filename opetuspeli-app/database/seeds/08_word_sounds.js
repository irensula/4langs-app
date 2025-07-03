/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_sounds').del()
  await knex('word_sounds').insert([
    {wordID: 6, language: 'en', sound_file: '/sounds/family/mother.mp3'},
    {wordID: 7, language: 'en', sound_file: '/sounds/family/father.mp3'},
    {wordID: 8, language: 'en', sound_file: '/sounds/family/sister.mp3'},
    {wordID: 9, language: 'en', sound_file: '/sounds/family/brother.mp3'},
    {wordID: 10, language: 'en', sound_file: '/sounds/family/grandmother.mp3'},
    {wordID: 11, language: 'en', sound_file: '/sounds/family/grandfather.mp3'},
    {wordID: 12, language: 'en', sound_file: '/sounds/family/aunt.mp3'},
    {wordID: 13, language: 'en', sound_file: '/sounds/family/uncle.mp3'}
  ]);
};