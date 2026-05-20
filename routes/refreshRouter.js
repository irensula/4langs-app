var express = require("express");
var router = express.Router();
const config = require("../utils/config");
const options = config.DATABASE_OPTIONS;
const knex = require("knex")(options);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const storedToken = await db.getRefreshToken(decoded.id);

    if (storedToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    });

    res.json({
      accessToken: newAccessToken,
    });

  } catch (err) {
    return res.status(403).json({ error: "Expired refresh token" });
  }
});

module.exports = router;