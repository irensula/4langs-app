var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs')

router.post('/', (req, res, next) => {
    const user = req.body;
    const saltRounds = 10;
    console.log({ firstname: user.firstname, lastname: user.lastname, email: user.email });
    if (!user.firstname || !user.lastname || !user.address || !user.city || !user.zipcode || !user.phone || !user.email || !user.password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    if (user.password.trim() === '') {
        return res.status(400).json({ error: "Password is required." });
    }
    knex('user').where('email', user.email).first()
        .then(existinguser => {
            if (existinguser) {
                return res.status(400).json({ error: "Email is already registered." });
            }

            bcrypt.hash(user.password, saltRounds)
                .then((passwordHash) => {
                    const newuser = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        address: user.address,
                        city: user.city,
                        zipcode: user.zipcode,
                        phone: user.phone,
                        email: user.email,
                        password: passwordHash
                    }
                    knex('user').insert(newuser)
                        .then(() => {
                            console.log("register onnistui")
                            res.status(201).json({ message: "user registered successfully" })
                        })
                        .catch((error) => {
                            console.error("Error inserting into database:", error);
                            res.status(500).json({ error: "Failed to register user" });
                        });
                })
                .catch((error) => {
                    console.error("Error hashing password:", error);
                    res.status(500).json({ error: "Error processing registration." });
                });
            })
            .catch((error) => {
                console.error("Error checking existing email:", error);
                res.status(500).json({ error: "Internal server error while checking email." });
        });
})

module.exports = router;