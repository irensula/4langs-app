/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {'exerciseID': 1, title: 'Memogame', description: "Find pairs of images", score_type: 'fixed', maxScore: 5}
  ]);
};