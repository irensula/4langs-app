/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('user_texts', t => {
            t.integer('userID')
                .unsigned()
                .notNullable()
                .references('userID')
                .inTable('users')
                .onDelete('CASCADE');

            t.integer('textID')
                .unsigned()
                .notNullable()
                .references('textID')
                .inTable('texts')
                .onDelete('CASCADE');

            t.primary(['userID', 'textID']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_texts')
};

