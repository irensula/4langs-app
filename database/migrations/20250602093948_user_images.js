/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('user_images', t => {
        t.increments('imageID').primary()
        t.string('url').notNullable()
        t.string('label').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('user_images')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */