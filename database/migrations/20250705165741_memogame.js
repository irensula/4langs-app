/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
        .createTable('memogame', t => {
            t.increments('cardID').primary();
            t.integer('wordID')
                .unsigned()
                .references('wordID')
                .inTable('words')
                .onDelete('CASCADE');
            t.integer('soundID')
                .unsigned()
                .references('soundID')
                .inTable('word_sounds')
                .onDelete('CASCADE');
            t.integer('imageID')
                .unsigned()
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
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema
    .dropTableIfExists('memogame')
};