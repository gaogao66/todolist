var express=require("express");
var path=require("path");
var ejs=require('ejs');
var consolidate=require('consolidate');
var config=require("./config.js");
var mysql=require('mysql');
var static=require("express-static");
var cookieparser=require("cookie-parser");
var cookiesession=require("cookie-session");
var expressroute=require("express-route");
var bodyparser=require("body-parser");
var multer=require("multer");
var multerobj=multer({desc:'./load/download'});

var connect=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'ourtask',
});

var server=express();
//模板
server.engine('html',consolidate.ejs);
server.set('views', '/home/fangao/WebstormProjects/ourtask/template');
server.set('view engine','html');


server.use(bodyparser.urlencoded({extended:true}));
server.use(multerobj.any());
//cookie session
(function(){
    var keys=[];
    for(var i=0;i<10000;i++){
        keys[i]=Math.random()+"dfsj_"+Math.random();
    }
    server.use(cookieparser());
    server.use(cookiesession({
        name:'sess_id',
        keys:keys,
        maxAge:10*60*1000 //10分钟
    }));
})();

//登录
server.use("/",require('./route/web.js')());
server.use("/admin",require("./route/admin.js")());

//路由模块

server.listen(config.port,function(){
    console.log("http://localhost:"+config.port);
});