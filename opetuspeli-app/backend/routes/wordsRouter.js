var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);

router.get('/', (req, res, next) => {
    knex('product')
        .select('*')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching products:', err.message);
            res.status(500).json({ error: 'Failed to fetch products' })
    })
})

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    knex('product')
        .where({ id: productId})
        .first()
        .then(product => {
            if(product) {
                res.json(product);
            } else {
                res.status(404).json({ error: "Product not found" });
            }
        })
        .catch(err => {
            console.error('Error fetching product: ', err.message);
            res.status(500).json({ error: 'Failed to fetch product by ID' });
        });
})
module.exports = router;