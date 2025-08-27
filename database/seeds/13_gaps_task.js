/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('gaps_task').del()
  await knex('gaps_task').insert([
    {
      exerciseID: 3,
      sentenceID: 1,
      answer_en: 'family',
      answer_fi: 'perhe',
      answer_ua: 'сім’я',
      answer_ru: 'семья',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 2,
      answer_en: 'mother',
      answer_fi: 'äiti',
      answer_ua: 'мамa',
      answer_ru: 'мамa',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 3,
      answer_en: 'father',
      answer_fi: 'isä',
      answer_ua: 'тато',
      answer_ru: 'отец',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 4,
      answer_en: 'son',
      answer_fi: 'poika',
      answer_ua: 'син',
      answer_ru: 'сын',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 5,
      answer_en: 'daughter',
      answer_fi: 'tytär',
      answer_ua: 'донька',
      answer_ru: 'дочь',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 6,
      answer_en: 'sister',
      answer_fi: 'sisko',
      answer_ua: 'сестра',
      answer_ru: 'сестра',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 7,
      answer_en: 'brother',
      answer_fi: 'veli',
      answer_ua: 'брат',
      answer_ru: 'брат',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 8,
      answer_en: 'grandmother',
      answer_fi: 'isoäiti',
      answer_ua: 'бабуся',
      answer_ru: 'бабушка',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 9,
      answer_en: 'grandfather',
      answer_fi: 'isoisä',
      answer_ua: 'дідусь',
      answer_ru: 'дедушка',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 10,
      answer_en: 'aunt',
      answer_fi: 'täti',
      answer_ua: 'тітка',
      answer_ru: 'тётя',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 11,
      answer_en: 'uncle',
      answer_fi: 'setä',
      answer_ua: 'дядько',
      answer_ru: 'дядя',
      maxScore: 1,
    },
  ]);
};