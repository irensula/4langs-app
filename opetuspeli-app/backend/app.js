let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let Ajv = require('ajv');

let app = express();

let cors = require('cors');
app.use(cors({
    origin: '*'
}));

let userschema = require('./schemas/userschema.json');
let validateSchema = require('./middleware/validate');
let isAuthenticated = require('./middleware/auth');

let indexRouter = require('./routes/index');
let avatarsRouter = require('./routes/avatarsRouter');
let loginRouter = require('./routes/loginRouter');
let registerRouter = require('./routes/registerRouter');
let wordsRouter = require('./routes/wordsRouter');
let sentencesRouter = require('./routes/sentencesRouter');
let textsRouter = require('./routes/textsRouter');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/avatars', avatarsRouter);
app.use('/login', loginRouter);
app.use('/register', validateSchema(userschema), registerRouter);
app.use('/words', isAuthenticated, wordsRouter);
app.use('/sentences', isAuthenticated, sentencesRouter);
app.use('/texts', isAuthenticated, textsRouter);

module.exports = app;