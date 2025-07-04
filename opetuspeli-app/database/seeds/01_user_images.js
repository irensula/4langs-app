/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user_images').del()
  await knex('user_images').insert([
    {url: '/images/avatars/dog.png', label: 'Dog'},
    {url: '/images/avatars/cat.png', label: 'Cat'},
    {url: '/images/avatars/robot.png', label: 'Robot'},
    {url: '/images/avatars/alien.png', label: 'Alien'},
    {url: '/images/avatars/bear.png', label: 'Bear'},
    {url: '/images/avatars/fox.png', label: 'Fox'},
    {url: '/images/avatars/panda.png', label: 'Panda'},
    {url: '/images/avatars/frog.png', label: 'Frog'},
    {url: '/images/avatars/dinosaur.png', label: 'Dinosaur'},
    {url: '/images/avatars/tiger.png', label: 'Tiger'},
  ]);
};