/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercise_cards').del()
  await knex('exercise_cards').insert([
    {categoryID: 1, wordID: 1, imageID: 1, description: "Tap the card to see the right word", maxPoints: 1, isReversible: true, cardType: 'both' }, 
    {categoryID: 1, wordID: 2, imageID: 2, description: "Tap the card to see the right word", maxPoints: 1, isReversible: true, cardType: 'both' },
    {categoryID: 2, wordID: 3, imageID: 3, description: "Tap the card to see the right word", maxPoints: 1, isReversible: true, cardType: 'both' },
    {categoryID: 2, wordID: 4, imageID: 4, description: "Tap the card to see the right word", maxPoints: 1, isReversible: true, cardType: 'both' }
  ]);
};
