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

});
var QuotaSchema = new Schema({
  product:[Product],
	client:[Client],
  total:Number,
  tva:Number,
  date:String

});

var quota = mongoose.model('quota',QuotaSchema);

module.exports = quota;
