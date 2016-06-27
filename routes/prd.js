var express = require('express');
var router = express.Router();
var prd = require('../model/prd.js');

router.get('/prd',function(req,res){
    prd.find(function(err,data){
        if(err){
            throw err;
        }
        res.render('prd',{title:'Liste des produits',data:data});
    });
});
router.post('/prd',function(req,res){
    var newPrd = new prd();
    newPrd.name = req.body.name;
    newPrd.prix = req.body.prix;
    newPrd.qte = req.body.qte;
    newPrd.save(function(err){
        if(err){
            throw err;
        }
        res.render('prd',{title:'Produit ajouter'});
    });
});
router.get('/prd/:sea1',function(req,res){
    var regex = new RegExp(req.params.sea1, 'i');
    prd.find({name:regex},function(err,data){
        if(err){
            throw err;
        }
            res.send({data:data});
    });
});


module.exports = router;
