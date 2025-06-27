let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', (req, res, next) => {
    if (!res.locals.auth || !res.locals.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user_id = res.locals.auth.userId;
    knex('users')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ error: 'Failed to fetch users' })
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    knex('users')
        .leftJoin('user_images', 'users.imageID', 'user_images.imageID' )
        .select(
            'users.*',
            'user_images.url as url'
        )
        .where({ userID: userId})
        .first()
        .then(user => {
            if(user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "user not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching user: ', err.message);
            res.status(500).json({ error: 'Failed to fetch user by ID' });
        });
})
module.exports = router;