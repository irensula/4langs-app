/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
        .createTable('progress', t => {
            t.increments('progressID').primary()
            t.integer('userID')
                .unsigned()
                .references('userID')
                .inTable('users')
                .onDelete('SET NULL');
                // Polymorphic relationship
            t.string('exerciseTable').notNullable(); // e.g., 'exercise_cards', 'sentence_exercises'
            t.integer('exerciseID').notNullable();
            t.integer('pointsEarned');
            t.integer('maxPoints');
            t.timestamp('completedAt').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('progress')
};

