const express = require('express');
const router = express.Router();
const config = require('../utils/config');
const knex = require('knex')(config.DATABASE_OPTIONS);

router.get('/', async (req, res) => {
    try {
        const images = await knex('user_images').select('imageID', 'url', 'label');
        res.json(images);
    } catch (error) {
        console.error('Error fetching avatars:', error);
        res.status(500).json({ error: 'Failed to load avatars' });
    }
});

module.exports = router;