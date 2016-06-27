var express = require('express');
var router = express.Router();
var invoices = require('../model/invoice.js');
var prd = require('../model/prd.js');
var client = require('../model/client.js');

router.get('/invoice',function(req,res){
    res.render('invoice',{title:'invoiceArmy'});
});

router.get('/invoice/client/:sea',function(req,res) {
    var regex = new RegExp(req.params.sea, 'i');
    client.find({name:regex},function(err,data){
        if(err){
            throw err;
        }
            res.send({data:data});
    });
});
//post invoice
router.post('/invoice',function(req,res){
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
  invoice.tva = req.body.tva;
    invoice.ht = req.body.ht;
    invoice.total = req.body.total;
  //stock manager
  for (var i=0; i<invoice.product.length;i++) {
    var qte_f = invoice.product[i].qte;
    prd.findOne({name:invoice.product[i].name},function(err,data){
      var qte = data.qte - qte_f;
      prd.findOneAndUpdate({name:data.name},{qte:qte},function(err,numRowsAffected,rawRes){
        if(err){
          throw err
        }
      })
    })
  };
  //stock manager
  invoice.save(function(err){
    if(err){
      throw err;
    }else{
      res.redirect('edit-invoice/'+invoice._id);
    }
  });
});

router.get('/edit-invoice/:id',function(req,res){
  invoices.findById(req.params.id,function(err,data){
    if(err){
      throw err;
    }else{
      var idF = parseInt(data._id); //Generate ID
        var datex = data.date;
        datex = datex.substr(6,7);
        idF =  idF+datex;
      res.render('invoice_show',{title:'invoiceArmy',data:data,idF:idF});
    }
  });
});
router.get('/inv/:id',function(req,res){
  invoices.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
    }else{
      res.send({data:data});
      console.log(data);
    }
  });
});

//update invoice
router.post('/invoice/:id',function(req,res){
  var product = [];
  for (var i=1 ;i<req.body.name.length;i++){
    product.push({name:req.body.name[i], prix:req.body.prix[i], qte:req.body.qte[i]});
   }
    var tvaM = req.body.ht*17/100;
    var totalM = Number(req.body.ht) + Number(tvaM);
    console.log(totalM);
  invoices.findByIdAndUpdate(req.params.id,{product:product,ht:req.body.ht,tva:tvaM,total:totalM},function(err,numRowsAffected,rawRes){
      if(err){
          throw err;
      }else{
          res.redirect('/');
      }
  });
});

//delete invoice
router.get('/delete-invoice/:id',function(req,res){
  invoices.findByIdAndRemove(req.params.id,function(err){
    if(err){
      throw(err);
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
