/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user_images').del()
  await knex('user_images').insert([
    {url: '/images/dog.png', label: 'Dog'},
    {url: '/images/cat.png', label: 'Cat'},
    {url: '/images/robot.png', label: 'Robot'},
    {url: '/images/alien.png', label: 'Alien'},
    {url: '/images/bear.png', label: 'Bear'},
    {url: '/images/fox.png', label: 'Fox'},
    {url: '/images/panda.png', label: 'Panda'},
    {url: '/images/bird.png', label: 'Bird'},
    {url: '/images/dinosaur.png', label: 'Dinosaur'},
    {url: '/images/tiger.png', label: 'Tiger'},
  ]);
};