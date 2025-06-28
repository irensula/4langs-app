let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);
const bcrypt = require('bcryptjs');

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

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, phonenumber, password } = req.body;

    if (!res.locals.auth || !res.locals.auth.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (userId !== res.locals.auth.userId.toString()) {
        return res.status(403).json({ error: 'Forbidden: You cannot update another user' });
    }

    if(!username || !email || !phonenumber || !password) {
      return res.status(400).json({ error: 'Missing required fields (username, email, phonenumber, password)' });
    }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      username,
      email,
      phonenumber,
      password: hashedPassword
    };
  
    const updated = await knex('users')
      .where('userID', '=', userId)
      .update(updatedUser)
      .returning('*')

      if (updated.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
        res.json(updated[0]);
  } catch (err) {
        console.error('UPDATE users failed', err);
        res.status(500).json({ error: 'Database update error' });
  }
});
    
module.exports = router;