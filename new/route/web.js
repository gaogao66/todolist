var express=require('express');

module.exports=function(){
    var route=express.Router();
    route.get('/',function(req,res){
        res.send("ok web.js").end();
    });

    return route;
}