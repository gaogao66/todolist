//加载模块
var http=require("http");
var path=require("path");
var fs=require("fs");
var mime=require("mime");
var url=require("url");

//创建http服务
http.createServer(function(req,res){
    //将render函数挂载到res上面
    res.render=function(filename){
        fs.readFile(filename,function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    var urlobj=url.parse(req.url,true);
//url.parse的第一个参数代表待解析的字符串，第二个参数代表是否将已经解析成对象的query是否解析为对象
    console.log(urlobj);
    if(req.url==='/'||req.url==='/index'&&req.method==='get'){
        //读取index.html页面
        filename=path.join(__dirname,'source','index.html');
        res.render(filename);
    }
    else if(req.url==="/list" &&req.method==="get"){
        filename=path.join(__dirname,'source','list.html');
        res.render(filename);
    }
    else if(req.url==="/submit"&&req.method==="get"){

        filename=path.join(__dirname,'source','submit.html');
        res.render(filename);
    }
    else if(req.url.startsWith("/add")&&req.method=="get"){
        //get方式添加新闻
        // 1.获取用户get方式提交过来的数据
        //要获取用户get提交过来的数据，需要用到url(内置模块)模块
        //既然是get方式提交数据，所以可以直接通过req.url获取数据，但使用起来不方便(得自己截取字符串，获取想要的数据)
        //通过url（模块），可以把get提交的数据解析成一个json对象，使用起来方便
        // 2.把用户提交过来的数据添加到data.json
        var list=[];
        list.push(urlobj.query);
        fs.writeFile(path.join(__dirname,"data","data.json"),JSON.stringify(list),"utf8",function(err){
            if(err){
                throw err;
            }
            console.log("ok");
            //设置响应报文头，通过响应报文头通知浏览器，执行一次页面跳转
            // 3.跳转到新闻列表页
            //重定向
            res.statusCode=302;
            res.statusMessage="found";
            res.setHeader('Location',"/");
            res.end();
        })



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