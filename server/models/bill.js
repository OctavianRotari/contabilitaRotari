var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BillSchema = new Schema({
  name: String,
  typeOfBill: String,
  numberOfBill: Number,
  date: { type: Date, default: Date.now },
  total: Number,
  note: String,
  methodOfPayment: String,
  iva: Number,
  paid: Number
},{ collection: 'bills' });

module.exports = mongoose.model('bill', BillSchema);
