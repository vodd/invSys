var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var providerDB = new Datastore({
    filename: './providerDB.db',
    autoload: true,
    timestampData: true
});

router.get('/provider',function(req,res){
    providerDB.find({},function(err,data){
        if(err){
            throw err
        }else{
            res.render('provider',{data:data})
        }
    })
})

router.post('/provider',function(req,res){
    var newPorvider = req.body;
    providerDB.insert(newPorvider,function(err){
        if(err){
            throw err;
        }else{
            res.redirect('/provider')
        }
    })
})

router.get('/provider-show/:id',function(req,res){
    providerDB.find({_id:req.params.id},function(err,data){
        if(err){
            throw err
        }else{
            res.render('provider_show',{data:data})
        }
    })
})


router.get('/edit-provider/:id',function(req,res){
    providerDB.find({_id:req.params.id},function(err,data){
        if(err){
            throw err;
        }else{
            res.render('edit-provider',{title:'Modifier un fournisseur',data:data});
        }
    });
});

router.post('/edit-provider',function(req,res){
    var providerId = req.body.id
    providerDB.update({_id:providerId},req.body,{},function(err,numReplaced){
        if(err){
            throw err;
        }else{
            console.log(req.body)
            res.redirect('/provider');
        }
    })
});
router.get('/listprovider/:name',function(req,res){
    var regex = new RegExp(req.params.name, 'i');
    providerDB.find({name:regex},function(err,data){
        if(err){
            throw err;
        }else{
            res.send({data:data})
        }
    });
});
module.exports = router;
