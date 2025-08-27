/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('words').del()
  await knex('words').insert([
    {categoryID: 1, value_en: 'Family', value_fi: 'Perhe', value_ua: "Сiм'я", value_ru: "Семья", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Mother", value_fi: "Äiti", value_ua: "Мама", value_ru: "Мама", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Father", value_fi: "Isä", value_ua: "Тато", value_ru: "Папа", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Son", value_fi: "Poika", value_ua: "Син", value_ru: "Сын", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Daughter", value_fi: "Tytär", value_ua: "Донька", value_ru: "Дочь", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Sister", value_fi: "Sisko", value_ua: "Сестра", value_ru: "Сестра", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Brother", value_fi: "Veli", value_ua: "Брат", value_ru: "Брат", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Grandmother", value_fi: "Isoäiti", value_ua: "Бабуся", value_ru: "Бабушка", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Grandfather", value_fi: "Isoisä", value_ua: "Дідусь", value_ru: "Дедушка", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Aunt", value_fi: "Täti", value_ua: "Тітка", value_ru: "Тётя", part_of_speech: "существительное"},
    {categoryID: 1, value_en: "Uncle", value_fi: "Setä, eno", value_ua: "Дядько", value_ru: "Дядя", part_of_speech: "существительное"},
    {categoryID: 2, value_en: 'Room', value_fi: 'Huone', value_ua: "Кiмната", value_ru: "Комната", part_of_speech: "существительное"},
    {categoryID: 3, value_en: 'Food', value_fi: 'Ruoka', value_ua: "Їжа", value_ru: "Еда", part_of_speech: "существительное"},
    {categoryID: 4, value_en: 'Transport', value_fi: 'Liikenne', value_ua: "Транспорт", value_ru: "Транспорт", part_of_speech: "существительное"},
    {categoryID: 5, value_en: 'School', value_fi: 'Koulu', value_ua: "Школа", value_ru: "Школа", part_of_speech: "существительное"},
  ]);
};