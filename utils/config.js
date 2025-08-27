const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
console.log('Loading env file:', envFile);
dotenv.config({ path: envFile });

console.log('NODE_ENV:', process.env.NODE_ENV);

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const DATABASE_OPTIONS = {
  client: process.env.DB_CLIENT,
  connection: process.env.DATABASE_URL ? process.env.DATABASE_URL : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
};

const knex = require('knex')(DATABASE_OPTIONS);

module.exports = {
  DATABASE_OPTIONS,
  PORT,
  SECRET,
  knex,
};
