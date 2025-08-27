/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {title: 'Memogame', description: "Find pairs of images", score_type: 'fixed', maxScore: 5, categoryID: 1},
    {title: 'Connect', description: "Connect word with image", score_type: 'fixed', maxScore: 5, categoryID: 1},
    {title: 'Gaps', description: "Fill the gaps in sentences", score_type: 'multi', maxScore: 11, categoryID: 1}
  ]);
};