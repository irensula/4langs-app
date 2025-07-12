/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('gaps_task', t => {
        t.increments('gapID').primary();
        t.integer('sentenceID')
          .unsigned()
          .references('sentenceID')
          .inTable('sentences')
          .onDelete('CASCADE');
        t.integer('exerciseID')
          .unsigned()
          .notNullable()
          .references('exerciseID')
          .inTable('exercises')
          .onDelete('CASCADE');
        t.integer('maxScore').notNullable().defaultTo(1);
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists('gaps_task')
};