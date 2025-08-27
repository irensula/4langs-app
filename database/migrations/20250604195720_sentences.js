/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('sentences', t => {
                t.increments('sentenceID').primary()
                t.integer('wordID')
                    .unsigned()
                    .references('wordID')
                    .inTable('words')
                    .onDelete('SET NULL');
                t.text('sentence_en').notNullable()
                t.text('sentence_fi').notNullable()
                t.text('sentence_ua').notNullable()
                t.text('sentence_ru').notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('sentences')
};
