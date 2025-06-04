/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('word_images', t => {
                t.increments('imageID').primary()
                t.integer('wordID')
                    .unsigned()
                    .references('wordID')
                    .inTable('words')
                    .onDelete('SET NULL');
                t.integer('categoryID')
                    .unsigned()
                    .references('categoryID')
                    .inTable('categories')
                    .onDelete('SET NULL');
                t.string('word_url', 255).notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('word_images')
};