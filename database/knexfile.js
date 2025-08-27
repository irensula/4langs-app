// Update with your config settings
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../backend', process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development')
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
       client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: { tableName: 'knex_migrations' }
  },
  
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: { tableName: 'knex_migrations' }
  },

};
