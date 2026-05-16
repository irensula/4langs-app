let express = require('express');
let router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', (req, res, next) => {
    knex('progress')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error("Error fetching progress:", err.message);
            res.status(500).json({ error: "Failed to fetch progress" })
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    knex('progress')
        .join('exercises', 'exercises.exerciseID', 'progress.exerciseID')
        .where({ 'userID': userId})
        .select('progress.*',
            'exercises.maxScore as maxScore'
        )
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

router.get('/:id/:categoryID', async (req, res, next) => {
    const userId = req.params.id;
    const categoryID = req.params.categoryID;
    
    try {
        const progress = await knex('progress')
            .join('exercises', 'progress.exerciseID', 'exercises.exerciseID')
            .where({ userID: userId, categoryID })
            .sum({ 
                    totalMaxScore: 'maxScore', 
                    totalScoreEn: 'score_en',
                    totalScoreFi: 'score_fi',
                    totalScoreUa: 'score_ua',
                    totalScoreRu: 'score_ru'
                })
            .first();

        const totalMaxScore = Number(progress.totalMaxScore) || 0;
        
        if (totalMaxScore === 0) {
            return res.json({
                totalMaxScore: 0,
                totalProgress: 0,
                progressPercent: 0,
                unlockNext: false
            });
        }
        
        const totalProgress =
            (Number(progress.totalScoreEn) || 0) +
            (Number(progress.totalScoreFi) || 0) +
            (Number(progress.totalScoreUa) || 0) +
            (Number(progress.totalScoreRu) || 0);

            const totalMaxAll = totalMaxScore * 4;

            const progressPercent = totalMaxAll
                ? Math.round((totalProgress / totalMaxAll) * 100)
                : 0;

            // const unlockNext = totalMaxAll > 0 && totalProgress >= totalMaxAll * 0.8;

            const percent = totalMaxAll > 0 
                ? totalProgress / totalMaxAll 
                : 0;
            const unlockNext = percent >= 0.8;

            res.json({
                totalMaxScore,
                totalProgress,
                progressPercent,
                unlockNext
            });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch progress in current category" })
            }
        })

router.post('/:id', async (req, res) => {
  const userId = req.params.id;
  const { exerciseID, selectedLanguage, maxScore, categoryID } = req.body;

  const columnMap = {
    en: 'score_en',
    fi: 'score_fi',
    ua: 'score_ua',
    ru: 'score_ru',
  };

  const column = columnMap[selectedLanguage];

  if (!column) return res.status(400).json({ error: "Invalid language" });

  try {
    const existing = await knex('progress')
      .where({ userID: userId, exerciseID })
      .first();

    if (existing) {
    await knex('progress')
        .where({ userID: userId, exerciseID })
        .update({
            [column]: knex.raw(`GREATEST(COALESCE(??,0), ?)`, [column, maxScore]),
        });
    } else {
      await knex('progress').insert({
        userID: userId,
        exerciseID,
        score_en: selectedLanguage === "en" ? maxScore : 0,
        score_fi: selectedLanguage === "fi" ? maxScore : 0,
        score_ua: selectedLanguage === "ua" ? maxScore : 0,
        score_ru: selectedLanguage === "ru" ? maxScore : 0,
      });
    }

    const progress = await knex('progress')
        .join('exercises', 'progress.exerciseID', 'exercises.exerciseID')
        .where('progress.userID', userId)
        .where('exercises.categoryID', categoryID)
        .groupBy('progress.userID')
        .sum({
            totalMaxScore: 'exercises.maxScore',
            totalScoreEn: knex.raw('COALESCE(progress.score_en,0)'),
            totalScoreFi: knex.raw('COALESCE(progress.score_fi,0)'),
            totalScoreUa: knex.raw('COALESCE(progress.score_ua,0)'),
            totalScoreRu: knex.raw('COALESCE(progress.score_ru,0)')
        })
        .first();
        
      const totalMaxScore = Number(progress.totalMaxScore) || 0;

    const totalProgress =
      (Number(progress.totalScoreEn) || 0) +
      (Number(progress.totalScoreFi) || 0) +
      (Number(progress.totalScoreUa) || 0) +
      (Number(progress.totalScoreRu) || 0);

    const totalMaxAll = totalMaxScore * 4;
    
    const percent = totalMaxAll > 0
        ? totalProgress / totalMaxAll
        : 0;
    const unlockNext = percent >= 0.8;


    if (unlockNext) {
        
      await knex('users')
        .where({ userID: userId })
        .andWhere("categoryID", categoryID)
        .update({
          categoryID: knex.raw('categoryID + 1')
        });
    }
    
    res.json({ success: true, unlockNext });
  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;