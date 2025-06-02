var express = require('express');
var router = express.Router();

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
const knex = require('knex')(options);
const bcrypt = require('bcryptjs')

router.post('/', (req, res, next) => {
    const customer = req.body;
    const saltRounds = 10;
    console.log({ firstname: customer.firstname, lastname: customer.lastname, email: customer.email });
    if (!customer.firstname || !customer.lastname || !customer.address || !customer.city || !customer.zipcode || !customer.phone || !customer.email || !customer.password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    if (customer.password.trim() === '') {
        return res.status(400).json({ error: "Password is required." });
    }
    knex('customer').where('email', customer.email).first()
        .then(existingCustomer => {
            if (existingCustomer) {
                return res.status(400).json({ error: "Email is already registered." });
            }

            bcrypt.hash(customer.password, saltRounds)
                .then((passwordHash) => {
                    const newCustomer = {
                        firstname: customer.firstname,
                        lastname: customer.lastname,
                        address: customer.address,
                        city: customer.city,
                        zipcode: customer.zipcode,
                        phone: customer.phone,
                        email: customer.email,
                        password: passwordHash
                    }
                    knex('customer').insert(newCustomer)
                        .then(() => {
                            console.log("register onnistui")
                            res.status(201).json({ message: "Customer registered successfully" })
                        })
                        .catch((error) => {
                            console.error("Error inserting into database:", error);
                            res.status(500).json({ error: "Failed to register customer" });
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