/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
        .createTable('connect_task', t => {
            t.increments('pairID').primary();
            t.integer('wordID')
                .unsigned()
                .notNullable()
                .references('wordID')
                .inTable('words')
                .onDelete('CASCADE');
            t.integer('imageID')
                .unsigned()
                .notNullable()
                .references('imageID')
                .inTable('word_images')
                .onDelete('CASCADE');
            t.integer('maxScore').notNullable().defaultTo(1);
            t.integer('exerciseID')
                .unsigned()
                .notNullable()
                .references('exerciseID')
                .inTable('exercises')
                .onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('connect_task')
};