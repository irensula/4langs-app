var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex('categories')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching categories:', err.message);
            res.status(500).json({ error: 'Failed to fetch categories' })
    })
})

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
                knex.raw('JSON_OBJECTAGG(word_sounds.language, word_sounds.sound_file) AS sounds')
            )
        .groupBy(
            'words.wordID',
            'words.categoryID',
            'words.value_en',
            'words.value_fi',
            'words.value_ru',
            'words.value_ua',
            'word_images.word_url'
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

module.exports = router;