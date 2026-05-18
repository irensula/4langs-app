let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let Ajv = require("ajv");
let cors = require("cors");

let app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Схемы и middleware
let userschema = require("./schemas/userschema.json");
let validateSchema = require("./middleware/validate");
let isAuthenticated = require("./middleware/auth");

app.use("/avatars", require("./routes/avatarsRouter"));
app.use("/images", express.static("assets/images"));
app.use("/sounds", express.static("assets/sounds"));
app.use("/login", require("./routes/loginRouter"));
app.use(
  "/register",
  validateSchema(userschema),
  require("./routes/registerRouter")
);
app.use("/categories", isAuthenticated, require("./routes/categoriesRouter"));
app.use("/words", isAuthenticated, require("./routes/wordsRouter"));
app.use("/sentences", isAuthenticated, require("./routes/sentencesRouter"));
app.use("/texts", isAuthenticated, require("./routes/textsRouter"));
app.use("/users", isAuthenticated, require("./routes/usersRouter"));
app.use("/progress", isAuthenticated, require("./routes/progressRouter"));
app.use("/max-score", isAuthenticated, require("./routes/exercisesRouter"));
app.use("/", require("./routes/index"));

module.exports = app;