var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SalarySchema = new Schema({
  name: String,
  month: String,
  date: { type: Date, default: Date.now },
  total: Number,
  paid: Number
});

module.exports = mongoose.model('salary', SalarySchema);
