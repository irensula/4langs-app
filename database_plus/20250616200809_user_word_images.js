/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('user_word_images', t => {
            t.integer('userID')
                .unsigned()
                .notNullable()
                .references('userID')
                .inTable('users')
                .onDelete('CASCADE');

            t.integer('imageID')
                .unsigned()
                .notNullable()
                .references('imageID')
                .inTable('word_images')
                .onDelete('CASCADE');

            t.primary(['userID', 'imageID']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_word_images')
};