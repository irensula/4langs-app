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
      answer_ru: 'семья',
      answer_en: 'family',
      answer_fi: 'perhe',
      answer_ua: 'сім’я',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 2,
      answer_ru: 'маму',
      answer_en: 'mother’s',
      answer_fi: 'äitini',
      answer_ua: 'маму',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 3,
      answer_ru: 'отца',
      answer_en: 'father’s',
      answer_fi: 'isäni',
      answer_ua: 'батька',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 4,
      answer_ru: 'дочь',
      answer_en: 'daughter',
      answer_fi: 'tytär',
      answer_ua: 'донька',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 5,
      answer_ru: 'сына',
      answer_en: 'sons',
      answer_fi: 'poikaa',
      answer_ua: 'сини',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 6,
      answer_ru: 'сестра',
      answer_en: 'sister',
      answer_fi: 'sisko',
      answer_ua: 'сестра',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 7,
      answer_ru: 'брат',
      answer_en: 'brother',
      answer_fi: 'veli',
      answer_ua: 'брат',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 8,
      answer_ru: 'бабушку',
      answer_en: 'grandmother’s',
      answer_fi: 'isoäitini',
      answer_ua: 'бабусю',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 9,
      answer_ru: 'дедушку',
      answer_en: 'grandfather’s',
      answer_fi: 'isoisäni',
      answer_ua: 'дідуся',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 10,
      answer_ru: 'тётя',
      answer_en: 'aunt',
      answer_fi: 'tätini',
      answer_ua: 'тітка',
      maxScore: 1,
    },
    {
      exerciseID: 3,
      sentenceID: 11,
      answer_ru: 'дядя',
      answer_en: 'uncle',
      answer_fi: 'setäni',
      answer_ua: 'дядько',
      maxScore: 1,
    },
  ]);
};