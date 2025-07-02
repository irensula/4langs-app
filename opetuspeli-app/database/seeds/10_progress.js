/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('progress').del()
  await knex('progress').insert([
    {userID: 1, exerciseTable: "exercise_cards", exerciseID: 1, pointsEarned: 1, maxPoints: 1, completedAt: "2025-06-29 12:00:00"},
    {userID: 1, exerciseTable: "exercise_cards", exerciseID: 2, pointsEarned: 1, maxPoints: 1, completedAt: "2025-06-29 12:00:00"},
    {userID: 1, exerciseTable: "exercise_cards", exerciseID: 3, pointsEarned: 0, maxPoints: 1, completedAt: "2025-06-29 12:00:00"},
    {userID: 1, exerciseTable: "exercise_cards", exerciseID: 4, pointsEarned: 1, maxPoints: 1, completedAt: "2025-06-29 12:00:00"},
  ]);
};