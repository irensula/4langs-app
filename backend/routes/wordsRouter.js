let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', (req, res, next) => {
    knex('words')
        .leftJoin('word_images', 'words.wordID', 'word_images.wordID')
        .leftJoin('word_sounds', 'words.wordID', 'word_sounds.wordID')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching words:', err.message);
            res.status(500).json({ error: 'Failed to fetch words' })
    })
})

module.exports = router;