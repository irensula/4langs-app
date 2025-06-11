let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let Ajv = require('ajv');

let userschema = require('./schemas/userschema.json');
let validateSchema = require('./middleware/validate');
let isAuthenticated = require('./middleware/auth');

let indexRouter = require('./routes/index');
let wordsRouter = require('./routes/wordsRouter');
let sentencesRouter = reqire('./routes/sentencesRouter');
let loginRouter = require('./routes/loginRouter');
let registerRouter = require('./routes/registerRouter');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/words', isAuthenticated, wordsRouter);
app.use('/sentences', isAuthenticated, sentencesRouter);
app.use('/login', loginRouter);
app.use('/register', validateSchema(userschema), registerRouter);

module.exports = app;