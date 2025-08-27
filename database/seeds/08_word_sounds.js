/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('word_sounds').del()
  await knex('word_sounds').insert([
    {
      wordID: 1,
      categoryID: 1,
      sound_en: '/sounds/family/family.mp3',
      sound_fi: '/sounds/family/perhe.mp3',
      sound_ua: '/sounds/family/сімья.mp3',
      sound_ru: '/sounds/family/семья.mp3'
      
    },
    {
      wordID: 2,
      categoryID: 1,
      sound_en: '/sounds/family/mother.mp3',
      sound_fi: '/sounds/family/äiti.mp3',
      sound_ua: '/sounds/family/мама_ua.mp3',
      sound_ru: '/sounds/family/мама.mp3'
    },
    {
      wordID: 3,
      categoryID: 1,
      sound_en: '/sounds/family/father.mp3',
      sound_fi: '/sounds/family/isä.mp3',
      sound_ua: '/sounds/family/тато.mp3',
      sound_ru: '/sounds/family/папа.mp3'
    },
    {
      wordID: 4,
      categoryID: 1,
      sound_en: '/sounds/family/son.mp3',
      sound_fi: '/sounds/family/poika.mp3',
      sound_ua: '/sounds/family/син.mp3',
      sound_ru: '/sounds/family/сын.mp3'
    },
    {
      wordID: 5,
      categoryID: 1,
      sound_en: '/sounds/family/daughter.mp3',
      sound_fi: '/sounds/family/tytär.mp3',
      sound_ua: '/sounds/family/донька.mp3',
      sound_ru: '/sounds/family/дочь.mp3'
    },
    {
      wordID: 6,
      categoryID: 1,
      sound_en: '/sounds/family/sister.mp3',
      sound_fi: '/sounds/family/sisko.mp3',
      sound_ua: '/sounds/family/сестра.mp3',
      sound_ru: '/sounds/family/сестра_ru.mp3'
    },
    {
      wordID: 7,
      categoryID: 1,
      sound_en: '/sounds/family/brother.mp3',
      sound_fi: '/sounds/family/veli.mp3',
      sound_ua: '/sounds/family/брат.mp3',
      sound_ru: '/sounds/family/брат_ru.mp3'
    },
    {
      wordID: 8,
      categoryID: 1,
      sound_en: '/sounds/family/grandmother.mp3',
      sound_fi: '/sounds/family/isoäiti.mp3',
      sound_ua: '/sounds/family/бабуся.mp3',
      sound_ru: '/sounds/family/бабушка.mp3'
    },
    {
      wordID: 9,
      categoryID: 1,
      sound_en: '/sounds/family/grandfather.mp3',
      sound_fi: '/sounds/family/isoisä.mp3',
      sound_ua: '/sounds/family/дідусь.mp3',
      sound_ru: '/sounds/family/дедушка.mp3'
    },
    {
      wordID: 10,
      categoryID: 1,
      sound_en: '/sounds/family/aunt.mp3',
      sound_fi: '/sounds/family/täti.mp3',
      sound_ua: '/sounds/family/тітка.mp3',
      sound_ru: '/sounds/family/тётя.mp3'
    },
    {
      wordID: 11,
      categoryID: 1,
      sound_en: '/sounds/family/uncle.mp3',
      sound_fi: '/sounds/family/eno_setä.mp3',
      sound_ua: '/sounds/family/дядько.mp3',
      sound_ru: '/sounds/family/дядя.mp3'
    }  
  ]);
};