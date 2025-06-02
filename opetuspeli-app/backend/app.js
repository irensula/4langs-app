let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let Ajv = require('ajv');

var userschema = require('./schemas/userschema.json');
var orderschema = require('./schemas/orderschema.json');
var validateSchema = require('./middleware/validate');
var isAuthenticated = require('./middleware/auth');

let indexRouter = require('./routes/index');
let productsRouter = require('./routes/productsRouter');
let loginRouter = require('./routes/loginRouter');
let registerRouter = require('./routes/registerRouter');
let cartItemsRouter = require('./routes/cartItemsRouter');
let ordersRouter = require('./routes/ordersRouter');
let clearCartItemsRouter = require('./routes/clearCartItemsRouter');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/register', validateSchema(userschema), registerRouter);
app.use('/cartitems', isAuthenticated, cartItemsRouter);
app.use('/orders', isAuthenticated, ordersRouter);
app.use('/clearcartitems', isAuthenticated, clearCartItemsRouter);
module.exports = app;