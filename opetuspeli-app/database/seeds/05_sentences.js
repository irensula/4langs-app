/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sentences').del()
  await knex('sentences').insert([
     {
      wordID: 1,
      sentence_en: "I have a big {{answer}}.",
      sentence_fi: "Minulla on iso {{answer}}.",
      sentence_ua: "У мене велика {{answer}}.",
      sentence_ru: "У меня большая {{answer}}."
    },
    {
      wordID: 2,
      sentence_en: "My {{answer}} name is Jane.",
      sentence_fi: "Minun {{answer}} nimi on Jane.",
      sentence_ua: "Мою {{answer}} звуть Джейн.",
      sentence_ru: "Мою {{answer}} зовут Джейн."
    },
    {
      wordID: 3,
      sentence_en: "My {{answer}} name is John.",
      sentence_fi: "Minun {{answer}} nimi on John.",
      sentence_ua: "Мого {{answer}} звати Джон.",
      sentence_ru: "Моего {{answer}} зовут Джон."
    },
    {
      wordID: 4,
      sentence_en: "My parents have a {{answer}}.",
      sentence_fi: "Vanhemmillani on {{answer}}.",
      sentence_ua: "У моїх батьків є {{answer}}.",
      sentence_ru: "У моих родителей есть {{answer}}."
    },
    {
      wordID: 5,
      sentence_en: "And they have two {{answer}}.",
      sentence_fi: "Ja heillä on kaksi {{answer}}.",
      sentence_ua: "І в них є два {{answer}}.",
      sentence_ru: "И у них есть два {{answer}}."
    },
    {
      wordID: 6,
      sentence_en: "So, I have a younger {{answer}}, her name is Johanna.",
      sentence_fi: "Minulla on nuorempi {{answer}}, hänen nimensä on Johanna.",
      sentence_ua: "У мене є молодша {{answer}}, її звати Йоганна.",
      sentence_ru: "У меня есть младшая {{answer}}, её зовут Йоханна."
    },
    {
      wordID: 7,
      sentence_en: "And I have an elder {{answer}}, his name is Jack.",
      sentence_fi: "Minulla on vanhempi {{answer}}, hänen nimensä on Jack.",
      sentence_ua: "І в мене є старший {{answer}}, його звати Джек.",
      sentence_ru: "И у меня есть старший {{answer}}, его зовут Джек."
    },
    {
      wordID: 8,
      sentence_en: "My {{answer}} name is Lily.",
      sentence_fi: "Minun {{answer}} nimi on Lily.",
      sentence_ua: "Мою {{answer}} звати Лілі.",
      sentence_ru: "Мою {{answer}} зовут Лили."
    },
    {
      wordID: 9,
      sentence_en: "My {{answer}} name is Leonard.",
      sentence_fi: "Minun {{answer}} nimi on Leonard.",
      sentence_ua: "Мого {{answer}} звати Леонард.",
      sentence_ru: "Моего {{answer}} зовут Леонард."
    },
    {
      wordID: 10,
      sentence_en: "My father has a sister, she is my {{answer}}. Her name is Emily.",
      sentence_fi: "Isälläni on sisko, hän on minun {{answer}}. Hänen nimensä on Emily.",
      sentence_ua: "У мого батька є сестра, вона моя {{answer}}. Її звати Емілі.",
      sentence_ru: "У моего отца есть сестра, она моя {{answer}}. Её зовут Эмили."
    },
    {
      wordID: 11,
      sentence_en: "My mother has a brother. He is my {{answer}}. His name is Bill.",
      sentence_fi: "Äidilläni on veli. Hän on minun {{answer}}. Hänen nimensä on Bill.",
      sentence_ua: "У моєї мами є брат. Він мій {{answer}}. Його звати Білл.",
      sentence_ru: "У моей матери есть брат. Он мой {{answer}}. Его зовут Билл."
    }
  ]);
};