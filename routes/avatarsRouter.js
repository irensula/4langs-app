const express = require("express");
const router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);

router.get("/", async (req, res) => {
  try {
    const images = await knex("user_images").select("imageID", "url", "label");
    res.json(images);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({ error: "Failed to load avatars" });
  }
});

router.get("/test", async (req, res) => {
  console.log("Hitting /avatars/test");
  try {
    const result = await knex.raw("SELECT 1+1 AS result");
    console.log("DB result:", result);
    res.json({ db: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
