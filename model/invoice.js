var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
  name      : { type: String },
  prix       : { type: Number },
  qte: {type:Number}
},{_id: false});
var Client = new Schema({
  name: String,
  address:String,
  rc: String,
  tel: String,
  email: String,
  ai: String,
  nif: String,
  nis: String,
},{_id: false});
var InvoiceSchema = new Schema({
  product:[Product],
    client:[Client],
  total:Number,
  ht:Number,
  tva:Number,
  date:String,
  seq: {type:Number,default:1}
});

var invoice = mongoose.model('invoice',InvoiceSchema);

module.exports = invoice;
