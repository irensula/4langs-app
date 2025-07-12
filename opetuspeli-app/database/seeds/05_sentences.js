/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sentences').del()
  await knex('sentences').insert([
     {
      wordID: 1,
      categoryID: 1,
      sentence_ru: "У меня небольшая семья.",
      sentence_en: "I have a small family.",
      sentence_fi: "Minulla on pieni perhe.",
      sentence_ua: "У мене невелика сім'я."
    },
    {
      wordID: 2,
      categoryID: 1,
      sentence_ru: "Мою маму зовут Джейн.",
      sentence_en: "My mother's name is Jane.",
      sentence_fi: "Äitini nimi on Jane.",
      sentence_ua: "Мою маму звуть Джейн."
    },
    {
      wordID: 3,
      categoryID: 1,
      sentence_ru: "Моего отца зовут Джон.",
      sentence_en: "My father's name is John.",
      sentence_fi: "Isäni nimi on John.",
      sentence_ua: "Мого батька звати Джон."
    },
    {
      wordID: 4,
      categoryID: 1,
      sentence_ru: "У моих родителей есть дочь.",
      sentence_en: "My parents have a daughter.",
      sentence_fi: "Vanhemmillani on tytär.",
      sentence_ua: "У моїх батьків є донька."
    },
    {
      wordID: 5,
      categoryID: 1,
      sentence_ru: "И у них есть два сына.",
      sentence_en: "And they have two sons.",
      sentence_fi: "Ja heillä on kaksi poikaa.",
      sentence_ua: "І в них є два сини."
    },
    {
      wordID: 6,
      categoryID: 1,
      sentence_ru: "У меня есть младшая сестра, её зовут Йоханна.",
      sentence_en: "So, I have a younger sister, her name is Johanna.",
      sentence_fi: "Minulla on nuorempi sisko, hänen nimensä on Johanna.",
      sentence_ua: "У мене є молодша сестра, її звати Йоганна."
    },
    {
      wordID: 7,
      categoryID: 1,
      sentence_ru: "И у меня есть старший брат, его зовут Джек.",
      sentence_en: "And I have an elder brother, his name is Jack.",
      sentence_fi: "Minulla on vanhempi veli, hänen nimensä on Jack.",
      sentence_ua: "І в мене є старший брат, його звати Джек."
    },
    {
      wordID: 8,
      categoryID: 1,
      sentence_ru: "Мою бабушку зовут Лили.",
      sentence_en: "My grandmother's name is Lily.",
      sentence_fi: "Isoäitini nimi on Lily.",
      sentence_ua: "Мою бабусю звати Лілі."
    },
    {
      wordID: 9,
      categoryID: 1,
      sentence_ru: "Моего дедушку зовут Леонард.",
      sentence_en: "My grandfather's name is Leonard.",
      sentence_fi: "Isoisäni nimi on Leonard.",
      sentence_ua: "Мого дідуся звати Леонард."
    },
    {
      wordID: 10,
      categoryID: 1,
      sentence_ru: "У моего отца есть сестра, она моя тетя. Её зовут Эмили.",
      sentence_en: "My father has a sister, she is my aunt. Her name is Emily.",
      sentence_fi: "Isälläni on sisko, hän on minun tätini. Hänen nimensä on Emily.",
      sentence_ua: "У мого батька є сестра, вона моя тітка. Її звати Емілі."
    },
    {
      wordID: 11,
      categoryID: 1,
      sentence_ru: "У моей матери есть брат. Он мой дядя. Его зовут Билл.",
      sentence_en: "My mother has a brother. He is my uncle. His name is Bill.",
      sentence_fi: "Äidilläni on veli. Hän on minun setäni. Hänen nimensä on Bill.",
      sentence_ua: "У моєї мами є брат. Він мій дядько. Його звати Білл."
    }
  ]);
};