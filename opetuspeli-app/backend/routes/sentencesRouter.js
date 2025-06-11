var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex('sentences')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching sentences:', err.message);
            res.status(500).json({ error: 'Failed to fetch sentences' })
    })
})

router.get('/:id', (req, res) => {
    const sentenceId = req.params.id;
    knex('sentences')
        .where({ id: sentenceId})
        .first()
        .then(sentence => {
            if(sentence) {
                res.json(sentence);
            } else {
                res.status(404).json({ error: "sentence not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching sentence: ', err.message);
            res.status(500).json({ error: 'Failed to fetch sentence by ID' });
        });
})
module.exports = router;