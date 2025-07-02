/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('word_sounds', t => {
            t.increments('soundID').primary();
            t.integer('wordID')
                .unsigned()
                .references('wordID')
                .inTable('words')
                .onDelete('CASCADE');
            t.string('language', 10).notNullable(); // 'en', 'ru', 'fi', etc.
            t.string('sound_file', 255).notNullable();
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