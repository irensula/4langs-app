/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sentences').del()
  await knex('sentences').insert([
    // Семья
     {
      wordID: 1,
      sentence_en: "This is my {{answer}}.",
      sentence_fi: "Tämä on minun {{answer}}.",
      sentence_ua: "Це моя {{answer}}.",
      sentence_ru: "Это моя {{answer}}."
    },
    // Мама
    {
      wordID: 2,
      sentence_en: "This is my {{answer}}. Her name is Jane.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Jane.",
      sentence_ua: "Це моя {{answer}}. Її звуть Джейн.",
      sentence_ru: "Это моя {{answer}}. Ее зовут Джейн."
    },
    // Папа
    {
      wordID: 3,
      sentence_en: "This is my {{answer}} name is John.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on John.",
      sentence_ua: "Це мій {{answer}}. Його звати Джон.",
      sentence_ru: "Это мой {{answer}}. Его зовут Джон."
    },
    // Сын
    {
      wordID: 4,
      sentence_en: "This is my {{answer}}. His name is Mikael.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Mikael.",
      sentence_ua: "Це мій {{answer}}. Його звуть Мікаель.",
      sentence_ru: "Это мой {{answer}}. Его зовут Микаэль."
    },
    // Дочь
    {
      wordID: 5,
      sentence_en: "This is my {{answer}}. Her name is Penny.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Penny.",
      sentence_ua: "Це моя {{answer}}. Її звути Пенні.",
      sentence_ru: "Это моя {{answer}}. Ее зовут Пенни."
    },
    // Сестра
    {
      wordID: 6,
      sentence_en: "This is my {{answer}}. Her name is Johanna.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Johanna.",
      sentence_ua: "Це моя {{answer}}. Її звати Йоганна.",
      sentence_ru: "Это моя {{answer}}. её зовут Йоханна."
    },
    {
      wordID: 7,
      sentence_en: "This is my {{answer}}. His name is Jack.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Jack.",
      sentence_ua: "Це мій {{answer}}. Його звати Джек.",
      sentence_ru: "Это мой {{answer}}. Его зовут Джек."
    },
    {
      wordID: 8,
      sentence_en: "This is my {{answer}}. Her name is Lily.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Lily.",
      sentence_ua: "Це моя {{answer}}. Її звати Лілі.",
      sentence_ru: "Это моя {{answer}}. Ее зовут Лили."
    },
    {
      wordID: 9,
      sentence_en: "This is my {{answer}}. His name is Leonard.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Leonard.",
      sentence_ua: "Це мій {{answer}}. Його звати Леонард.",
      sentence_ru: "Это мой {{answer}}. Его зовут Леонард."
    },
    {
      wordID: 10,
      sentence_en: "This is my {{answer}}. Her name is Emily.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Emily.",
      sentence_ua: "Це моя {{answer}}. Її звати Емілі.",
      sentence_ru: "Это моя {{answer}}. Её зовут Эмили."
    },
    {
      wordID: 11,
      sentence_en: "My mother has a brother. He is my {{answer}}. His name is Bill.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Bill.",
      sentence_ua: "Це мій {{answer}}. Його звати Білл.",
      sentence_ru: "Это мой {{answer}}. Его зовут Билл."
    }
  ]);
};