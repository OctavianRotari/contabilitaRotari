var express = require('express');
var router = express.Router();
var Fatture = require('./../models/bill.js');

router.get ('/', function (req, res, next) {
  Fatture.find(function (err, fatture) {
    if ( err ) {
      return next(err);
    }
   res.json(fatture);
  });
});

router.post ('/', function (req, res, next) {
  Fatture.create (req.body, function (err, fattura) {
    if (err) {
      return next(err);
    }
    res.json(fattura);
  });
});

module.exports = router;
