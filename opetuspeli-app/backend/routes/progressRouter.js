let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
    
    knex('progress')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error("Error fetching users' progress:", err.message);
            res.status(500).json({ error: "Failed to fetch users' progress" })
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    knex('progress')
        .where({ 'userID': userId})
        .select('*')
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

router.post('/:id', async(req, res) => {
    const userId = req.params.id;
    const progress = req.body;

    if (        
        progress.exerciseID  == null || 
        progress.score_en == null ||
        progress.score_fi == null ||
        progress.score_ua == null ||
        progress.score_ru == null
        ) {
            return res.status(400).json({ error: "Missing required fields. Please check your input." });
        }
    try {
        const existing = await knex('progress')
            .where({ userID: userId, exerciseID: progress.exerciseID })
            .first();
        if (existing) {
            return res.status(409).json({ error: "Progress already exists for this exercise."});
        }

        const newProgress = {
                userID: userId,
                exerciseID: progress.exerciseID,
                score_en: progress.score_en,
                score_fi: progress.score_fi,
                score_ua: progress.score_ua,
                score_ru: progress.score_ru
            }
        
        await knex('progress').insert(newProgress);
        
        res.status(201).json({ message: "Progress created successfully" });
       
    } catch (err) {
        console.error('INSERT INTO progress failed', err.message);
        res.status(500).json({error: 'Something went wrong while creating progress.'});
    }   
})

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { exerciseID, score_en, score_fi, score_ua, score_ru } = req.body;
    console.log("BODY RECEIVED:", req.body);

    if(exerciseID == null  || score_en == null || score_fi == null || score_ua == null || score_ru == null) {
      return res.status(400).json({ error: 'Missing required fields (exerciseID, score_en, score_fi, score_ua, score_ru)' });
    }
  try {

    const updatedProgress = {
      score_en,
      score_fi,
      score_ua,
      score_ru
    };

    const updatedCount = await knex('progress')
      .where({userID: userId, exerciseID})
      .update(updatedProgress)
    
    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Progress record not found for this user and exercise' });
    }

    const updated = await knex('progress')
      .select('*')
      .where({userID: userId, exerciseID})
      .then(rows => {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.status(404).json({ error: "User progress not found" });
            }
        })

    res.json(updated);
  } catch (err) {
        console.error('UPDATE progress failed', err);
        res.status(500).json({ error: 'Database update error' });
  }
});
    
module.exports = router;