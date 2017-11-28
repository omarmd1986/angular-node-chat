'use strict';

var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var flash         = require('connect-flash');
var session       = require('express-session');

var db            = require('./database');
var passport      = require('./auth');
var config        = require('./config');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make public the dist folder.
// This folder will be create when ng build run
app.use(express.static(path.join(__dirname, '../../dist')));

// Expose internal modules..
app.use('/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap')));
app.use('/bootstrap-social', express.static(path.join(__dirname, '../../node_modules/bootstrap-social')));

// Initialize Passport
app.use(passport.initialize());

// Create a session to pass flash messages.
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(flash());

// Routes
app.use('/', index);

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
  res.render('error');
});

module.exports = app;
