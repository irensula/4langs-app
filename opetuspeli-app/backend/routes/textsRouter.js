var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex('texts')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching texts:', err.message);
            res.status(500).json({ error: 'Failed to fetch texts' })
    })
})

router.get('/:id', (req, res) => {
    const textId = req.params.id;
    knex('texts')
        .where({ id: textId})
        .first()
        .then(text => {
            if(text) {
                res.json(text);
            } else {
                res.status(404).json({ error: "text not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching text: ', err.message);
            res.status(500).json({ error: 'Failed to fetch text by ID' });
        });
})
module.exports = router;