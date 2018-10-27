var express=require('express');
var commend=require('./md5.js');
var mysql=require('mysql');

var connect=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'ourtask'
});

module.exports=function(){
    var route=express.Router();
    route.get('/',function(req,res){
        res.send("ok").end();
    })
    // route.get('/',function(req,res){
    //     res.render('./template/admin/adminlogin.html',{});
    // });
    // route.post('/',function(req,res){
    //     console.log(req.body);
    //     var username1=req.body.username;
    //     var password=commend.md5(req.body.password+commend.MD_UNFIX);
    //     console.log(password);
    //     connect.query(`select * from admin where username='${username1}'`,function(err,data){
    //         console.log(data);
    //         if(err){
    //             res.status(500).send("database error").end();
    //         }else{
    //             if(data.length==0){
    //                 res.status(400).send("no this admin").end();
    //             }else{
    //                 if(data[0].password==password){
    //                     req.session['admin_id']=data[0].id;
    //                     // res.end("ok");
    //                     console.log("password is ok");
    //                     res.redirect("./template/admin/manage");
    //                 }else{
    //                     res.status(400).send("this passwd is not correct").end();
    //                 }
    //             }
    //         }
    //     });
    // });

    return route;
}