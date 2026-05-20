var express = require("express");
var router = express.Router();

const config = require("../utils/config");
const options = config.DATABASE_OPTIONS;
const knex = require("knex")(options);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const user = req.body;

  knex("users")
    .select("users.*", "user_images.url")
    .leftJoin("user_images", "users.imageID", "user_images.imageID")
    .where("email", "=", user.email)
    .then((dbuser) => {
      console.log("LOGIN BODY:", user);

      if (dbuser.length == 0) {
        console.log("USER NOT FOUND");
        return res
          .status(401)
          .json({ error: "Invalid credentials" });
      }
      const tempUser = dbuser[0];
      console.log("DB USER:", tempUser.email);
      console.log("HASH:", tempUser.password);
      console.log("INPUT PASS:", user.password);

      bcrypt
        .compare(user.password, tempUser.password)
        .then((passwordCorrect) => {
          if (!passwordCorrect) {
            return res
              .status(401)
              .json({ error: "Tarkista käyttäjätunnus tai salasana" });
          }
          //token
          const userForToken = {
            id: tempUser.userID,
            username: tempUser.username,
            email: tempUser.email,
            phonenumber: tempUser.phonenumber,
            imageID: tempUser.imageID,
            url: tempUser.url,
          };
          const token = jwt.sign(userForToken, config.SECRET, {
            expiresIn: "1m",
          });
          console.log("NEW TOKEN ISSUED:", token);
          console.log("EXPIRES IN: 1m");
          console.log(
            "token",
            token,
            "id",
            tempUser.userID,
            "username",
            tempUser.username,
            "email",
            tempUser.email,
            "imageID",
            tempUser.imageID,
            "url",
            tempUser.url,
            "role",
            "regularuser"
          );
          res.status(200).send({
            token,
            userForToken,
            id: tempUser.userID,
            username: tempUser.username,
            email: tempUser.email,
            phonenumber: tempUser.phonenumber,
            imageID: tempUser.imageID,
            url: tempUser.url,
          });
        })
        .catch((bcryptError) => {
          console.error(
            "Error comparing password for email:",
            user.email,
            bcryptError
          );
          res.status(500).json({ error: "Password comparison failed" });
        });
    })
    .catch((dbError) => {
      console.error(
        "Error fetching user from database for email:",
        user.email,
        dbError
      );
      res.status(500).json({ error: "Database query failed" });
    });
});

module.exports = router;
