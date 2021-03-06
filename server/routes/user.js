var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user.js');

router.post('/register', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function (err, account) {
    if (err) {
      return res.status(500).json({ err:err });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({ status: 'Registration Successful', account: account });
    });
  });
});

router.post('/login', function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).json({ err: err });
    }
    if (!user) {
      return res.status(401).json({ err: info });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ err: 'Could not log-in user' });
      }
      user.online = true;
      res.status(200).json({ status:'Log in successful' });
    });
  })(req, res);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({ status: 'Bye' });
});

router.get('/auth', function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
});

module.exports = router;
