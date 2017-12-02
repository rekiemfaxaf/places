var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');

const Place = require('./models/Place');
const places = require('./routes/places');
const users = require('./routes/users');
const sessions = require('./routes/sessions')
const favorites = require('./routes/favorites');
const visits = require('./routes/visits');
const visitisPlaces = require('./routes/visitisPlaces');

const db = require('./config/database');
const secrets = require('./config/secrets');


var app = express();
db.connect();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
  .unless({path: ['/sessions','/users'], method: 'GET'})
);

// mount routes for places with router file
app.use('/places',places);
app.use('/places',visitisPlaces);
app.use('/users',users);
app.use('/sessions',sessions);
app.use('/favorites',favorites);
app.use('/visits',visits);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json(err);
});

module.exports = app;
