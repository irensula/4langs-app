var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
    const user = req.body;
      
    knex('users').select('*').where('email', '=', user.email)
        .then((dbuser) => {
            if (dbuser.length == 0) {
                return res.status(401).json(
                    { error: "invalid email or password" }
                )
            }
            const tempUser = dbuser[0];
            bcrypt.compare(user.password, tempUser.password)
                .then((passwordCorrect) => {
                    if (!passwordCorrect) {
                        return res.status(401).json(
                            { error: "invalid email or password" }
                        )
                    } 
                    //token
                    const userForToken = {
                        id: tempUser.id,
                        email: tempUser.email,
                        phonenumber: tempUser.phonenumber,
                    } 
                    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '7d' });
                    console.log("token", token,
                        "id", tempUser.id,
                        "email", tempUser.email,
                        "role", "regularuser");
                    res.status(200).send({
                        token, userForToken,
                        id: tempUser.id,
                        email: tempUser.email,
                        phonenumber: tempUser.phonenumber,
                    });
                })
                .catch((bcryptError) => {
                    console.error('Error comparing password for email:', user.email, bcryptError);
                    res.status(500).json({ error: 'Password comparison failed' });
                });
        })
        .catch((dbError) => {
            console.error('Error fetching user from database for email:', user.email, dbError);
            res.status(500).json({ error: 'Database query failed' });
        });
})

module.exports = router;