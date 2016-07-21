var express = require('express');
var router = express.Router();
var invoices = require('../model/invoice.js');
var quotas = require('../model/quota.js');

router.get('/', function(req, res, next) {
      quotas.find(function(err,data){
        if(err){
            throw err;
        }else{
          invoices.find(function(err,d){
            if(err){
              throw err
            }else{
              res.render('index',{title:'Activity',data:data,d:d});
            }
          })

        }
  })
});
router.post('/findata',function(req,res){
    console.log(req.body.date)
    quotas.find({'date':req.body.date},function(err,data){
        if(err){
            throw err;
        }else{
          invoices.find({'date':req.body.date},function(er,d){
            if(er){
              throw er
            }else{
              res.render('index_i',{title:'Recherche',data:data,d:d});
            }
          })

        }
})
});
module.exports = router;
