/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
        .createTable('progress', t => {
            t.increments('progressID').primary()
            t.integer('userID')
                .unsigned()
                .references('userID')
                .inTable('users')
                .onDelete('SET NULL');
            t.integer('exerciseID')
                .unsigned()
                .notNullable()
                .references('exerciseID')
                .inTable('exercises')
                .onDelete('CASCADE');
            t.integer('score');
            t.timestamp('completedAt').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('progress')
};