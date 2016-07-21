var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var purchaseDB = new Datastore({
    filename: './purchaseDB.db',
    autoload: true,
    timestampData: true
});

router.get('/purchase',function(req,res){
    res.render('purchase');
})

module.exports = router;
