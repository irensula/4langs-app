/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('words').del()
  await knex('words').insert([
    {categoryID: 1, value_ru: "Семья", value_en: 'Family', value_fi: 'Perhe', value_ua: "Сiм'я", part_of_speech: "существительное"},
    {categoryID: 2, value_ru: "Комната", value_en: 'Room', value_fi: 'Huone', value_ua: "Кiмната", part_of_speech: "существительное"},
    {categoryID: 3, value_ru: "Еда", value_en: 'Food', value_fi: 'Ruoka', value_ua: "Їжа", part_of_speech: "существительное"},
    {categoryID: 4, value_ru: "Транспорт", value_en: 'Transport', value_fi: 'Liikenne', value_ua: "Транспорт", part_of_speech: "существительное"},
    {categoryID: 5, value_ru: "Школа", value_en: 'School', value_fi: 'Koulu', value_ua: "Школа", part_of_speech: "существительное"}
  ]);
};