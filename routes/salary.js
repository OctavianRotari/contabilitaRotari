var express = require('express');
var router = express.Router();
var Salary = require('./../models/salary.js');

router.get ('/', function (req, res, next) {
  Salary.find(function (err, salary) {
    if ( err ) {
      return next(err);
    }
   res.json(salary);
  });
});

router.post ('/', function (req, res, next) {
  Salary.create (req.body, function (err, salary) {
    if (err) {
      return next(err);
    }
    res.json(salary);
  });
});

router.get ('/:id', function (req, res, next) {
   Salary.findById(req.params.id, function (err, salary) {
    if (err) {
      return next(err);
    }
    res.json(salary);
  });
});

module.exports = router;
