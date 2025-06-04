/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', t => {
        t.increments('userID').primary()
        t.string('username').notNullable().unique()
        t.string('email').notNullable().unique()
        t.string('phonenumber').notNullable()
        t.string('password').notNullable()
        t.integer('imageID')
            .unsigned()
            .references('imageID')
            .inTable('user_images')
            .onDelete('SET NULL');
        t.timestamps(false, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('users')
};