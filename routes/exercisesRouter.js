let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', (req, res, next) => {
    knex('exercises')
        .sum({ totalMaxScore: 'maxScore' })
        .then((rows) => {
            res.json({ totalMaxScore: rows[0].totalMaxScore || 0 });
        })
        .catch(err => {
            console.error('Error fetching total max score:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

router.get('/:categoryID', (req, res, next) => {
    const categoryID = req.params.categoryID;

    knex('exercises')
        .sum({ categoryMaxScore: 'maxScore' })
        .where('categoryID', categoryID)
        .then((rows) => {
            const sum = rows[0].categoryMaxScore || 0;
            const totalMaxScore = sum * 4;
            res.json({ totalMaxScore });
        })
        .catch(err => {
            console.error('Error fetching total max score:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

module.exports = router;