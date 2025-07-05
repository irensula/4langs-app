/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('memogame').del()
  await knex('memogame').insert([
    {wordID: 1, soundID: 1, imageID: 1, maxScore: 5, exerciseID: 1  },
    {wordID: 2, soundID: 2, imageID: 2, maxScore: 5, exerciseID: 1  },
    {wordID: 3, soundID: 3, imageID: 3, maxScore: 5, exerciseID: 1  },
    {wordID: 4, soundID: 4, imageID: 4, maxScore: 5, exerciseID: 1  },
    {wordID: 5, soundID: 5, imageID: 5, maxScore: 5, exerciseID: 1  },
    {wordID: 6, soundID: 6, imageID: 6, maxScore: 5, exerciseID: 1  },
    {wordID: 7, soundID: 7, imageID: 7, maxScore: 5, exerciseID: 1  },
    {wordID: 8, soundID: 8, imageID: 8, maxScore: 5, exerciseID: 1  },
    {wordID: 9, soundID: 9, imageID: 9, maxScore: 5, exerciseID: 1  },
    {wordID: 10, soundID: 10, imageID: 10, maxScore: 5, exerciseID: 1  },
    {wordID: 11, soundID: 11, imageID: 11, maxScore: 5, exerciseID: 1  }
  ]);
};
