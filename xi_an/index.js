//加载模块
var http=require("http");
var path=require("path");
var fs=require("fs");
var mime=require("mime");

//创建http服务
http.createServer(function(req,res){
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    if(req.url==='/'||req.url==='/index'&&req.method==='get'){
        //读取index.html页面
        fs.readFile(path.join(__dirname,'source','index.html'),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
    else if(req.url==="/list" &&req.method==="get"){
        fs.readFile(path.join(__dirname,'source','list.html'),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
    else if(req.url==="/submit"&&req.method==="get"){
        fs.readFile(path.join(__dirname,'source','submit.html'),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
    else if(req.url=="/add"&&req.method=="get"){
        fs.readFile(path.join(__dirname,'source','index.html'),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
    else if(req=="/add"&&req.method=="post"){

    }
    //如果用户请求的为某个路径下的静态资源则可以统一写代码
    else if(req.url.startsWith('/img')&&req.method=='get'){
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                throw err;
            }
            res.setHeader('Content-Type',mime.getType(req.url));
            res.end(data);
        })
    }
    else {
        res.writeHead(404,"not found",{
            'Content-Type':"text/html;charset:utf-8;"
        });
        res.end("404 not found!");
    }
}).listen(8080,function(){
    console.log("http://localhost:8080");
});
