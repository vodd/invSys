var express = require('express');
var router = express.Router();
var invoices = require('../model/quota.js');
var client = require('../model/client.js');

router.get('/quota',function(req,res){
    res.render('quota',{title:'invoiceArmy'});
});

router.get('/quota/client/:sea',function(req,res) {
    var regex = new RegExp(req.params.sea, 'i');
    client.find({name:regex},function(err,data){
        if(err){
            throw err;
        }
            res.send({data:data});
    });
});
//post invoice
router.post('/quota',function(req,res){
   var client = [];
   var product = [];
   client.push({name:req.body.namec,address:req.body.address,rc:req.body.rc});

  for (var i=1 ;i<req.body.name.length;i++){
    product.push({name:req.body.name[i], prix:req.body.prix[i], qte:req.body.qte[i]});
   }
  var invoice =  new invoices();
  invoice.client = client;
  invoice.product = product;
  invoice.date = req.body.date;
  invoice.total = req.body.total;
  console.log(invoice);
  invoice.save(function(err){
    if(err){
      throw err;
    }else{
      res.redirect('edit-quota/'+invoice._id);
    }
  });
});

router.get('/edit-quota/:id',function(req,res){
  invoices.findById(req.params.id,function(err,data){
    if(err){
      throw err;
    }else{
      res.render('quota_show',{title:'invoiceArmy',data:data});
    }
  });
});
router.get('/quto/:id',function(req,res){
  invoices.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
    }else{
      res.send({data:data});
      console.log(req.params.id);
    }
  });
});

//update invoice
router.post('/quota/:id',function(req,res){
  var product = [];
  for (var i=1 ;i<req.body.name.length;i++){
    product.push({name:req.body.name[i], prix:req.body.prix[i], qte:req.body.qte[i]});
   }
  invoices.findByIdAndUpdate(req.params.id,{product:product,total:req.body.total},function(err,numRowsAffected,rawRes){
      if(err){
          throw err;
      }else{
          res.redirect('/');
      }
  });
});

//delete invoice
router.get('/delete-quota/:id',function(req,res){
  invoices.findByIdAndRemove(req.params.id,function(err){
    if(err){
      throw(err);
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
