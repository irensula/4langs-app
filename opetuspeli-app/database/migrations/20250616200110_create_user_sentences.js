/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('user_sentences', t => {
            t.integer('userID')
                .unsigned()
                .notNullable()
                .references('userID')
                .inTable('users')
                .onDelete('CASCADE');

            t.integer('sentenceID')
                .unsigned()
                .notNullable()
                .references('sentenceID')
                .inTable('sentences')
                .onDelete('CASCADE');

            t.primary(['userID', 'sentenceID']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_sentences')
};
