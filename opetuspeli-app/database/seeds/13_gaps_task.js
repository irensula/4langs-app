/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('gaps_task').del()
  await knex('gaps_task').insert([
    {sentenceID: 1, maxScore: 1, exerciseID: 3 },
    {sentenceID: 2, maxScore: 1, exerciseID: 3 },
    {sentenceID: 3, maxScore: 1, exerciseID: 3 },
    {sentenceID: 4, maxScore: 1, exerciseID: 3 },
    {sentenceID: 5, maxScore: 1, exerciseID: 3 },
    {sentenceID: 6, maxScore: 1, exerciseID: 3 },
    {sentenceID: 7, maxScore: 1, exerciseID: 3 },
    {sentenceID: 8, maxScore: 1, exerciseID: 3 },
    {sentenceID: 9, maxScore: 1, exerciseID: 3 },
    {sentenceID: 10, maxScore: 1, exerciseID: 3 },
    {sentenceID: 11, maxScore: 1, exerciseID: 3 }
  ]);
};