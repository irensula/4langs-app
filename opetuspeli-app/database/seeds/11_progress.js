/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('progress').del()
  await knex('progress').insert([
    {userID: 1, exerciseID: 1, score_en: 5, score_fi: 4, score_ua: 6, score_ru: 2, completedAt: "2025-06-29 12:00:00"},
    {userID: 2, exerciseID: 1, score_en: 4, score_fi: 4, score_ua: 6, score_ru: 5, completedAt: "2025-06-29 12:00:00"}
  ]);
};