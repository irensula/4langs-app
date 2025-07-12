var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

// router.get('/', (req, res, next) => {
//     knex('categories')
//         .select('*')
//         .then((rows) => {
//             res.json(rows);
//         })
//         .catch((err) => {
//             console.error('Error fetching categories:', err.message);
//             res.status(500).json({ error: 'Failed to fetch categories' })
//     })
// })

router.get('/', async (req, res, next) => {
    const userId = res.locals.auth.userId; // get user id
    
    try {
        // get all categories and order them
        const categories = await knex('categories').orderBy('categoryID', 'asc');
        // make an emoty array for the result categories
        const result = [];
        // looping through categories
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            // get exercises for every category
            const exercises = await knex('exercises')
                .where({ categoryID: category.categoryID })
                .select('exerciseID');

            let isUnlocked = false;
            // first category is unlocked
            if (i === 0) {
                isUnlocked = true;
            } else {
                // check the previous category
                const previousCategory = categories[i - 1];
                // get exercises where there is some progress
                const prevExerciseIDs = await knex('progress')
                    .join('exercises', 'exercises.exerciseID', 'progress.exerciseID')
                    .where({ categoryID: previousCategory.categoryID })
                    .pluck('exercises.exerciseID');
                // count how many exercises user completed
                const completed = await knex('progress')
                    .whereIn('exerciseID', prevExerciseIDs)
                    .andWhere({ userID: userId })
                    .countDistinct('exerciseID as completedCount');
                const completedCount = parseInt(completed[0].completedCount, 10);
                // check if the categary has to be unlocked
                isUnlocked = prevExerciseIDs.length > 0 && completedCount === prevExerciseIDs.length;
            }
            // add locked to the category array
            result.push({
                ...category,
                locked: !isUnlocked
            });
        }
        // send json
        res.json(result);

    } catch (err) {
        console.error('Error fetching categories with progress:', err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }   
});

router.get('/:id/words', (req, res, next) => {
    const categoryID = parseInt(req.params.id, 10); // 10 is radix

    if(isNaN(categoryID)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }

    knex('words')
        .where('words.categoryID', categoryID)
        .leftJoin('word_images', 'words.wordID', 'word_images.wordID')
        .leftJoin('word_sounds', 'words.wordID', 'word_sounds.wordID')
        .select('words.wordID',
                'words.categoryID',
                'words.value_en',
                'words.value_fi',
                'words.value_ru',
                'words.value_ua',
                'word_images.word_url',
                'word_sounds.sound_ru',
                'word_sounds.sound_fi',
                'word_sounds.sound_en',
                'word_sounds.sound_ua'    
                )
        .then((rows) => {
            res.json(rows)
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch categories words' })
        });
});

router.get('/:id/texts', (req, res, next) => {
    const categoryID = parseInt(req.params.id, 10); // 10 is radix

    if(isNaN(categoryID)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }

    knex('texts')
        .where('texts.categoryID', categoryID)
        .select('*')
        .then((rows) => {
            res.json(rows)
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch categories words' })
        });
});

router.get('/:id/memogame', (req, res, next) => {
    const categoryID = parseInt(req.params.id, 10); // 10 is radix

    if(isNaN(categoryID)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }
    knex('memogame')
        .join('words', 'words.wordID', 'memogame.wordID')
        .join('word_sounds', 'word_sounds.soundID', 'memogame.soundID' )
        .join('word_images', 'word_images.imageID', 'memogame.imageID')
        .where('words.categoryID', categoryID)
        .select('memogame.*',
                'words.value_en',
                'words.value_fi',
                'words.value_ru',
                'words.value_ua',
                'words.categoryID',
                'word_images.word_url',
                'word_sounds.sound_ru',
                'word_sounds.sound_fi',
                'word_sounds.sound_en',
                'word_sounds.sound_ua')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching texts:', err.message);
            res.status(500).json({ error: 'Failed to fetch texts' })
    })
})

router.get('/:id/connect_task', (req, res, next) => {
    const categoryID = parseInt(req.params.id, 10);
    console.log('Category', categoryID);

    if (isNaN(categoryID)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }
    knex('connect_task')
        .join('words', 'words.wordID', 'connect_task.wordID')
        .join('word_images', 'word_images.imageID', 'connect_task.imageID')
        .where('words.categoryID', categoryID)
        .select('connect_task.*',
            'words.value_ru',
            'words.value_fi',
            'words.value_en',
            'words.value_ua',
            'word_images.word_url'
        )
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch connect task' })
        })
})

module.exports = router;