/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('texts', t => {
                t.increments('textID').primary()
                t.integer('categoryID')
                    .unsigned()
                    .references('categoryID')
                    .inTable('categories')
                    .onDelete('SET NULL');
                t.text('text_ru').notNullable()
                t.text('text_en').notNullable()
                t.text('text_fi').notNullable()
                t.text('text_ua').notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('texts')
};