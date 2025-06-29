/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('user_words', t => {
            t.integer('userID')
                .unsigned()
                .notNullable()
                .references('userID')
                .inTable('users')
                .onDelete('CASCADE');

            t.integer('wordID')
                .unsigned()
                .notNullable()
                .references('wordID')
                .inTable('words')
                .onDelete('CASCADE');

            t.primary(['userID', 'wordID']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_words')
};
