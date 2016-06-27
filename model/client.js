var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  address:String,
  rc: String,
  tel: String,
  email: String,
  ai: String,
  nif: String,
  nis: String,

});

var client = mongoose.model('client',ClientSchema);

module.exports = client;
