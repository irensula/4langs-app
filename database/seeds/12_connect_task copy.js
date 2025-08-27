/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('connect_task').del()
  await knex('connect_task').insert([
    {wordID: 1, imageID: 1, maxScore: 5, exerciseID: 2  },
    {wordID: 2, imageID: 2, maxScore: 5, exerciseID: 2  },
    {wordID: 3, imageID: 3, maxScore: 5, exerciseID: 2  },
    {wordID: 4, imageID: 4, maxScore: 5, exerciseID: 2  },
    {wordID: 5, imageID: 5, maxScore: 5, exerciseID: 2  },
    {wordID: 6, imageID: 6, maxScore: 5, exerciseID: 2  },
    {wordID: 7, imageID: 7, maxScore: 5, exerciseID: 2  },
    {wordID: 8, imageID: 8, maxScore: 5, exerciseID: 2  },
    {wordID: 9, imageID: 9, maxScore: 5, exerciseID: 2  },
    {wordID: 10, imageID: 10, maxScore: 5, exerciseID: 2  },
    {wordID: 11, imageID: 11, maxScore: 5, exerciseID: 2  }
  ]);
};