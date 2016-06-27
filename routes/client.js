var express = require('express');
var router = express.Router();
var client = require('../model/client.js');
var invoices = require('../model/invoice.js');

router.get('/client',function(req,res){
    client.find(function(err,data){
        if(err){
            res.render('index',{title:'vodlab',descrip : 'vodlab website',datafalse: 'rien a afficher'});
        }
        res.render('client',{title:'Listes des clients',data:data});
    });
});

router.post('/client',function(req,res){
    newone = new client();
    newone.name = req.body.name;
    newone.address = req.body.address;
    newone.rc = req.body.rc;
    newone.tel = req.body.tel;
    newone.ai = req.body.ai;
    newone.email = req.body.email;
    newone.nif = req.body.nif;
    newone.nis = req.body.nis;
    newone.save(function(err){
        if(err){
            console.log(err);
        }
        res.render('client',{title:'Ajouter un client',msg:'client ajouter'});
        console.log(newone);
    });
});

router.get('/client/:id',function(req,res){
    client.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
        }
         res.send({data:data});
    });
});

router.get('/edit-client/:id',function(req,res){
    client.findById(req.params.id,function(err,data){
        if(err){
            throw err;
        }else{
            res.render('edit-client',{title:'Modifier un client',data:data});
        }
    });
});

router.post('/edit-client',function(req,res){
    client.update({_id:req.body.id},{name:req.body.name,address:req.body.address,rc:req.body.rc},function(err,numRowsAffected,rawRes){
        if(err){
            throw err;
        }else{
            res.redirect('/client');
        }
    });
});

router.get('/delete-client/:id',function(req,res){
    client.findByIdAndRemove(req.params.id,function(err){
        if(err){
                throw err;
        }else{
                res.redirect('/client');
        }
    });
});

router.get('/client-show/:id',function(req,res){
    client.findById(req.params.id,function(err,data){
        if(err){
            throw err
        }else{
            invoices.find({'client.name':data.name},function(err,d){
                if(err){
                    throw err;
                }else{
                    res.render('client-show',{data:data,d:d})
                }
            })
        }
    })
});
module.exports = router;
