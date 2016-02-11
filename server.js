var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./server/routes/index.js');
var bill = require('./server/routes/bill.js');
var user = require('./server/routes/user.js');
var salary = require('./server/routes/salary.js');
var database = require('./server/config/database.js');
var mongoose = require('mongoose');
var app = express();
// var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local' ).Strategy;
// session
var session = require('express-session');
// user schema/model
var User = require('./server/models/user.js');

mongoose.connect(database.mongoURI[app.settings.env], function (err) {
  if (err) {
    console.log('Connection error', err);
  }
  else {
    console.log('Connection successful');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser(function (user, done) {
  debugger;
  done(null, user.id);
}));

passport.deserializeUser(User.deserializeUser(function (id, done) {
  User.findById(id, function (err, user ) {
    debugger;
    done(err, user);
  });
}));

app.use('/', routes);
app.use('/user', user);
app.use('/fatture', bill);
app.use('/stipendi', salary);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
