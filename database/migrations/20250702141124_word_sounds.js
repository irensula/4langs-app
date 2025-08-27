/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('word_sounds', (t) => {
        t.increments('soundID').primary();
        t.integer('wordID').unsigned().references('wordID').inTable('words').onDelete('CASCADE');
        t.integer('categoryID').unsigned().references('categoryID').inTable('categories').onDelete('CASCADE');
        t.string('sound_en');
        t.string('sound_fi');
        t.string('sound_ua');
        t.string('sound_ru');
        t.timestamps(true, true);
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('word_sounds')
};