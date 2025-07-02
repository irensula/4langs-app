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
        .where('categoryID', categoryID)
        .select('*')
        .then((rows) => {
            res.jsonp(rows)
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch categories words' })
        });
});

module.exports = router;