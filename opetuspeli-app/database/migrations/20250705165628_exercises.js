/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('exercises', t => {
            t.increments('exerciseID').primary()
            t.string('title').notNullable();
            t.text('description');
            t.enum('score_type', ['multi', 'fixed']).notNullable();
            t.integer('maxScore');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('exercises')
};
