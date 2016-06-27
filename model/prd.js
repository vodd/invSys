var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  prix:String,
  qte:String
});

var prd = mongoose.model('prd',ProductSchema);

module.exports = prd;
