/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sentences').del()
  await knex('sentences').insert([
    {wordID: 1, categoryID: 1, sentence_ru: "Семья предложение", sentence_en: 'Family sentence', sentence_fi: 'Perhe lause', sentence_ua: "Сiм'я речення"},
    {wordID: 2, categoryID: 2, sentence_ru: "Комната предложение", sentence_en: 'Room sentence', sentence_fi: 'Huone lause', sentence_ua: "Кiмната речення"},
    {wordID: 3, categoryID: 3, sentence_ru: "Еда предложение", sentence_en: 'Food sentence', sentence_fi: 'Ruoka lause', sentence_ua: "Їжа речення"},
    {wordID: 4, categoryID: 4, sentence_ru: "Транспорт предложение", sentence_en: 'Transport sentence', sentence_fi: 'Liikenne lause', sentence_ua: "Транспорт речення"},
    {wordID: 5, categoryID: 5, sentence_ru: "Школа предложение", sentence_en: 'School sentence', sentence_fi: 'Koulu lause', sentence_ua: "Школа речення"}
  ]);
};