/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('words').del()
  await knex('words').insert([
    {categoryID: 1, value_ru: "Семья", value_en: 'Family', value_fi: 'Perhe', value_ua: "Сiм'я", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Мама", value_en: "Mother", value_fi: "Äiti", value_ua: "Мама", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Папа", value_en: "Father", value_fi: "Isä", value_ua: "Тато", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Сын", value_en: "Son", value_fi: "Poika", value_ua: "Син", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Дочь", value_en: "Daughter", value_fi: "Tytär", value_ua: "Донька", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Сестра", value_en: "Sister", value_fi: "Sisko", value_ua: "Сестра", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Брат", value_en: "Brother", value_fi: "Veli", value_ua: "Брат", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Бабушка", value_en: "Grandmother", value_fi: "Isoäiti", value_ua: "Бабуся", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Дедушка", value_en: "Grandfather", value_fi: "Isoisä", value_ua: "Дідусь", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Тётя", value_en: "Aunt", value_fi: "Täti", value_ua: "Тітка", part_of_speech: "существительное"},
    {categoryID: 1, value_ru: "Дядя", value_en: "Uncle", value_fi: "Setä, eno", value_ua: "Дядько", part_of_speech: "существительное"},
    {categoryID: 2, value_ru: "Комната", value_en: 'Room', value_fi: 'Huone', value_ua: "Кiмната", part_of_speech: "существительное"},
    {categoryID: 3, value_ru: "Еда", value_en: 'Food', value_fi: 'Ruoka', value_ua: "Їжа", part_of_speech: "существительное"},
    {categoryID: 4, value_ru: "Транспорт", value_en: 'Transport', value_fi: 'Liikenne', value_ua: "Транспорт", part_of_speech: "существительное"},
    {categoryID: 5, value_ru: "Школа", value_en: 'School', value_fi: 'Koulu', value_ua: "Школа", part_of_speech: "существительное"},
  ]);
};