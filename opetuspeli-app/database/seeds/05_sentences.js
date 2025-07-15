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
      sentence_ru: "Мою {{answer}} зовут Джейн."
    },
    // Папа
    {
      wordID: 3,
      sentence_en: "This is my {{answer}} name is John.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on John.",
      sentence_ua: "Це мій {{answer}}. Його звати Джон.",
      sentence_ru: "Моего {{answer}} зовут Джон."
    },
    // Сын
    {
      wordID: 4,
      sentence_en: "This is my {{answer}}. His name is Mikael.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Mikael.",
      sentence_ua: "Це мій {{answer}}. Його звуть Мікаель.",
      sentence_ru: "У моих родителей есть {{answer}}."
    },
    // Дочь
    {
      wordID: 5,
      sentence_en: "This is my {{answer}}. Her name is Penny.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Penny.",
      sentence_ua: "Це моя {{answer}}.",
      sentence_ru: "И у них есть два {{answer}}."
    },
    // Сестра
    {
      wordID: 6,
      sentence_en: "This is my {{answer}}. Her name is Johanna.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Johanna.",
      sentence_ua: "У мене є молодша {{answer}}, її звати Йоганна.",
      sentence_ru: "У меня есть младшая {{answer}}, её зовут Йоханна."
    },
    {
      wordID: 7,
      sentence_en: "This is my {{answer}}. His name is Jack.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Jack.",
      sentence_ua: "І в мене є старший {{answer}}, його звати Джек.",
      sentence_ru: "И у меня есть старший {{answer}}, его зовут Джек."
    },
    {
      wordID: 8,
      sentence_en: "This is my {{answer}}. Her name is Lily.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Lily.",
      sentence_ua: "Мою {{answer}} звати Лілі.",
      sentence_ru: "Мою {{answer}} зовут Лили."
    },
    {
      wordID: 9,
      sentence_en: "This is my {{answer}}. His name is Leonard.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Leonard.",
      sentence_ua: "Мого {{answer}} звати Леонард.",
      sentence_ru: "Моего {{answer}} зовут Леонард."
    },
    {
      wordID: 10,
      sentence_en: "This is my {{answer}}. Her name is Emily.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Emily.",
      sentence_ua: "У мого батька є сестра, вона моя {{answer}}. Її звати Емілі.",
      sentence_ru: "У моего отца есть сестра, она моя {{answer}}. Её зовут Эмили."
    },
    {
      wordID: 11,
      sentence_en: "My mother has a brother. He is my {{answer}}. His name is Bill.",
      sentence_fi: "Tämä on minun {{answer}}. Hänen nimi on Bill.",
      sentence_ua: "У моєї мами є брат. Він мій {{answer}}. Його звати Білл.",
      sentence_ru: "У моей матери есть брат. Он мой {{answer}}. Его зовут Билл."
    }
  ]);
};