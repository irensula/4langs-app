/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
        .createTable('exercise_cards', t => {
            t.increments('exerciseID').primary()
            t.integer('categoryID')
                .unsigned()
                .references('categoryID')
                .inTable('categories')
                .onDelete('SET NULL');
            t.integer('wordID')
                .unsigned()
                .references('wordID')
                .inTable('words')
                .onDelete('SET NULL');
            t.integer('imageID')
                .unsigned()
                .references('imageID')
                .inTable('word_images')
                .onDelete('SET NULL');
            t.text('description');
            t.integer('maxStars').notNullable().defaultTo(1);
            t.boolean('isReversible').defaultTo(false);
            t.enum('cardType', ['imageToWord', 'wordToImage', 'both']).notNullable();
            t.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('exercise_cards')
};
