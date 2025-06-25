let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', (req, res, next) => {
    if (!res.locals.auth || !res.locals.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user_id = res.locals.auth.userId;
    knex('words')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching words:', err.message);
            res.status(500).json({ error: 'Failed to fetch words' })
    })
})

router.get('/:id', (req, res) => {
    const wordId = req.params.id;
    knex('words')
        .where({ id: wordId})
        .first()
        .then(word => {
            if(word) {
                res.json(word);
            } else {
                res.status(404).json({ error: "word not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching word: ', err.message);
            res.status(500).json({ error: 'Failed to fetch word by ID' });
        });
})
module.exports = router;