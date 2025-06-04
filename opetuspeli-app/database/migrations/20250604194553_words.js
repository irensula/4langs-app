/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('words', t => {
                t.increments('wordID').primary()
                t.integer('categoryID')
                    .unsigned()
                    .references('categoryID')
                    .inTable('categories')
                    .onDelete('SET NULL');
                t.string('value_ru', 255).notNullable()
                t.string('value_en', 255).notNullable()
                t.string('value_fi', 255).notNullable()
                t.string('value_uk', 255).notNullable()
                t.string('part_of_speech', 255).notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('words')
};
