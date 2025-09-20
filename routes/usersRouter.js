let express = require("express");
let router = express.Router();
const config = require("../utils/config");
const knex = require("knex")(config.DATABASE_OPTIONS);
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
  knex("users")
    .select("*")
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ error: "Failed to fetch users" });
    });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  knex("users")
    .where({ "users.userID": userId })
    .leftJoin("user_images", "users.imageID", "user_images.imageID")
    .select("users.*", "user_images.url as url")
    .first()
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching user: ", err.message);
      res.status(500).json({ error: "Failed to fetch user by ID" });
    });
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, phonenumber, password, imageID } = req.body;
  console.log("BODY RECEIVED:", req.body);
  if (userId !== res.locals.auth.userId.toString()) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update another user" });
  }

  if (!username || !email || !phonenumber) {
    return res.status(400).json({
      error: "Missing required fields (username, email, phonenumber)",
    });
  }
  try {
    const updatedUser = {
      username,
      email,
      phonenumber,
    };

    if (password && password.trim() !== "") {
      updatedUser.password = await bcrypt.hash(password, 10);
    }

    if (imageID !== undefined) {
      updatedUser.imageID = imageID;
    }

    await knex("users").where("userID", "=", userId).update(updatedUser);

    const updated = await knex("users")
      .leftJoin("user_images", "users.imageID", "user_images.imageID")
      .select(
        "users.userID as id",
        "users.username",
        "users.email",
        "users.phonenumber",
        "users.password",
        "users.imageID",
        "users.categoryID",
        "user_images.url as url"
      )
      .where("users.userID", "=", userId)
      .first();

    if (!updated) {
      return res.status(404).json({ error: "User not found after update" });
    }
    res.json(updated);
  } catch (err) {
    console.error("UPDATE users failed", err);
    res.status(500).json({ error: "Database update error" });
  }
});

router.get("/:id/category", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await knex("users")
      .where({ "users.userID": userId })
      .select("categoryID")
      .first();

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ categoryID: user.categoryID });
  } catch (err) {
    console.error("Error fetching categoryID: ", err);
    res.status(500).json({ error: "Failed to fetch categoryID" });
  }
});

router.put("/:id/category", async (req, res) => {
  const userId = req.params.id;

  if (userId !== res.locals.auth.userId.toString()) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update another user" });
  }

  try {
    // 1. Get user's current category
    const user = await knex("users").where("userID", userId).first();

    if (!user) return res.status(404).json({ error: "User not found" });

    const currentCategoryID = user.categoryID;

    // 2. Get all exercises and sum user progress
    const exercises = await knex("exercises")
      .leftJoin("progress", function () {
        this.on("exercises.exerciseID", "progress.exerciseID").andOn(
          "progress.userID",
          "=",
          knex.raw("?", [userId])
        );
      })
      .where("exercises.categoryID", currentCategoryID)
      .select(
        "exercises.maxScore",
        "progress.score_en",
        "progress.score_fi",
        "progress.score_ua",
        "progress.score_ru"
      );

    let userTotal = 0;
    let totalCategoryScore = 0;

    exercises.forEach((ex) => {
      const exerciseScore =
        (ex.score_en || 0) +
        (ex.score_fi || 0) +
        (ex.score_ua || 0) +
        (ex.score_ru || 0);
      userTotal += exerciseScore;
      totalCategoryScore += ex.maxScore * 4;
    });

    const percent =
      totalCategoryScore > 0 ? (userTotal / totalCategoryScore) * 100 : 0;

    console.log({ userTotal, totalCategoryScore, percent, currentCategoryID });
    // 3. Unlock next category if threshold is met (80% in your case)

    if (percent >= 80) {
      const nextCategory = await knex("categories")
        .where("categoryID", ">", currentCategoryID)
        .orderBy("categoryID", "asc")
        .first();

      if (nextCategory) {
        await knex("users")
          .where("userID", userId)
          .update({ categoryID: nextCategory.categoryID });
      }
    }
    // 4. Return updated user
    const updatedUser = await knex("users").where("userID", userId).first();

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating category: ", err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

module.exports = router;
