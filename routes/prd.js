var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var productDB = new Datastore({
    filename: './productDB.db',
    autoload: true,
    timestampData: true
});

router.get('/prd',function(req,res){
    productDB.find({},function(err,data){
        if(err){
            throw err;
        }else{
        res.render('prd',{title:'Liste des produits',data:data});
        }
    });
});
router.post('/prd',function(req,res){
    var newPrd = req.body;
    productDB.insert(newPrd,function(err){
        if(err){
            throw err;
        }else{
        res.redirect('/prd')
        }
    });
});

router.get('/prd/:sea1',function(req,res){
    var regex = new RegExp(req.params.sea1, 'i');
    productDB.find({name:regex},function(err,data){
        if(err){
            throw err;
        }else{
            res.send({data:data});
        }
    });
});

router.post('/qteplus',function(req,res){

    productDB.findOne({_id:req.body.id},function(err,data){
        var newQte = Number(data.qte) + Number(req.body.qte)
        console.log(req.body.prix)
        productDB.update({_id:req.body.id},{$set:{qte:newQte,prix:req.body.prix}},{},function(err,numReplaced){
            if(err){
                throw err;
            }
        })
    })

});

module.exports = router;
