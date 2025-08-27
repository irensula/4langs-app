/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('users').del()
  const password = '12345678';
  const hashedPassword = await bcrypt.hash(password, 10);

  const images = await knex('user_images').select('imageID', 'label');

  const findByLabel = (label) => images.find(img => img.label === label)?.imageID;

  await knex('users').insert([
    {username: 'Daniel', email: 'daniel@gmail.com', phonenumber: '0502223366', password: hashedPassword, imageID: findByLabel('Dinosaur')},
    {username: 'Elli', email: 'elli@gmail.com', phonenumber: '0502223377', password: hashedPassword, imageID: findByLabel('Panda')},
    {username: 'Nostro', email: 'nostro@gmail.com', phonenumber: '0502223355', password: hashedPassword, imageID: findByLabel('Dog')},
  ]);
};
