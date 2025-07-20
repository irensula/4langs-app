/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('categories').del()
  await knex('categories').insert([
    {name: 'Family'},
    {name: 'School'},
    {name: 'Food'},
    {name: 'Transport'},
    {name: 'Room'},
  ]);
};