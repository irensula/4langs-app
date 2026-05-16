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

// show user's progress on PregressScreen
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const maxRow = await knex('exercises')
            .sum({ maxScore: 'maxScore' })
            .first();

        const maxScorePerLanguage = Number(maxRow.maxScore) || 0;
        const maxScoreAll = maxScorePerLanguage * 4;

        const progress = await knex('progress')
            .where('progress.userID', userId)
            .sum({
                en: knex.raw('COALESCE(score_en,0)'),
                fi: knex.raw('COALESCE(score_fi,0)'),
                ua: knex.raw('COALESCE(score_ua,0)'),
                ru: knex.raw('COALESCE(score_ru,0)')
            })
            .first();

        const currentScoreEn = Number(progress.en) || 0;
        const currentScoreFi = Number(progress.fi) || 0;
        const currentScoreUa = Number(progress.ua) || 0;
        const currentScoreRu = Number(progress.ru) || 0;

        const currentScoreAll = currentScoreEn + currentScoreFi + currentScoreUa + currentScoreRu;

        const totalMaxScore = Number(maxRow.totalMaxScore) || 0;

        res.json({
            currentScoreAll,
            maxScoreAll,
            currentScoreEn,
            currentScoreFi,
            currentScoreUa,
            currentScoreRu,
            maxScorePerLanguage,
        });
    } catch(err) {
            console.error('Total progress error: ', err);
            res.status(500).json({ error: 'Failed to fetch total progress' });
    }
});

// unlock next category
router.get('/:id/:categoryID', async (req, res, next) => {
    const userId = req.params.id;
    const categoryID = req.params.categoryID;
    
    try {
        const maxRow = await knex('exercises')
            .where({ categoryID })
            .sum({ maxScore: 'maxScore' })
            .first();

        const maxScorePerLanguage = Number(maxRow.maxScore) || 0;
        const maxScoreAll = maxScorePerLanguage * 4;

        const progress = await knex('progress')
            .join('exercises', 'progress.exerciseID', 'exercises.exerciseID')
            .where({ 'progress.userID': userId, 'exercises.categoryID': categoryID })
            .sum({
                en: knex.raw('COALESCE(score_en,0)'),
                fi: knex.raw('COALESCE(score_fi,0)'),
                ua: knex.raw('COALESCE(score_ua,0)'),
                ru: knex.raw('COALESCE(score_ru,0)')
            })
            .first();

        const currentScoreEn = Number(progress.en) || 0;
        const currentScoreFi = Number(progress.fi) || 0;
        const currentScoreUa = Number(progress.ua) || 0;
        const currentScoreRu = Number(progress.ru) || 0;

        const currentScoreAll = currentScoreEn + currentScoreFi + currentScoreUa + currentScoreRu;

        const totalMaxScore = Number(maxRow.totalMaxScore) || 0;
       
        const unlockNext = maxScoreAll > 0 && currentScoreAll / maxScoreAll >= 0.8;

        res.json({
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