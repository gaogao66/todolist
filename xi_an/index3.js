//功能：
//实现在原来的list数组上追加新闻而不是覆盖
//实现get,post方法提交数据
//实现首页显示新闻
//添加渲染首页新闻的功能

//优化data.json数据的读取功能，封装函数

//加载模块
var http=require("http");
var path=require("path");
var fs=require("fs");
var mime=require("mime");
var url=require("url");
var querystring= require("querystring");
var _=require("underscore");


//创建http服务
http.createServer(function(req,res){
    //将render函数挂载到res上面
    res.render=function(filename,tpldata){
        fs.readFile(filename,function(err,data){
            if(err){
                throw err;
            }
            //没有模板的传入则正常读取数据
            if(tpldata){
                //如果传递了tpldata对象，则进行index.html和tpldata新闻数据的渲染
                //利用_.template（.html）进行html模板函数的构建，然后用模板函数调用tpldata新闻数据，达到将俩者结合渲染的功能
                var fn=_.template(data.toString("utf8"));
                data=fn(tpldata);
            }
            res.end(data);
        })
    }
    req.url=req.url.toLowerCase();
    req.method=req.method.toLowerCase();
    var urlobj=url.parse(req.url,true);
//url.parse的第一个参数代表待解析的字符串，第二个参数代表是否将已经解析成对象的query是否解析为对象
    if(req.url==='/'||req.url==='/index.html'&&req.method==='get'){
        //读取index.html页面
        //首先读取新闻数据在data.json中，并存入数组中
        // fs.readFile(path.join(__dirname,"data","data.json"),"utf8",function(err,data){
        //     if(err&&err!=="ENOENT"){
        //         throw err;
        //     }
        //     //console.log(data);
        //     var listnews=JSON.parse(data||'[]');
        //     filename=path.join(__dirname,'source','index.html');
        //     //首页中需要用到list所以使待传参数的属性名为list,值为listnews 读取到的新闻数据
        //     res.render(filename,{list:listnews});
        // });
        readnewsdata(function(listnews){
            filename=path.join(__dirname,'source','index.html');
            //首页中需要用到list所以使待传参数的属性名为list,值为listnews 读取到的新闻数据
            res.render(filename,{list:listnews});
        });
    }
    else if(req.url.startsWith("/list")&&req.method==="get"){
        var model=[];
        filename=path.join(__dirname,'source','list.html');
        readnewsdata(function(listnews){
            for(var i=0;i<listnews.length;i++){
                if(listnews[i].id.toString()===urlobj.query.id)
                {
                    model=listnews[i];
                }
            }
            if(model){
                res.render(filename,{list:model});
            }else{
                res.end("no this list");
            }
        });
        // fs.readFile(path.join(__dirname,"data","data.json"),"utf8",function(err,data){
        //     if(err&&err!=='ENOENT'){
        //         throw err;
        //     }
        //     var listnews=JSON.parse(data||'[]');
        //
        // });
    }
    else if(req.url==="/submit.html"&&req.method==="get"){
        filename=path.join(__dirname,'source','submit.html');
        res.render(filename);
    }
    else if(req.url.startsWith("/add")&&req.method==="get"){
        //get方式添加新闻
        // 1.获取用户get方式提交过来的数据
        //要获取用户get提交过来的数据，需要用到url(内置模块)模块
        //既然是get方式提交数据，所以可以直接通过req.url获取数据，但使用起来不方便(得自己截取字符串，获取想要的数据)
        //通过url（模块），可以把get提交的数据解析成一个json对象，使用起来方便
        // 2.把用户提交过来的数据添加到data.json
        // fs.readFile(path.join(__dirname,"data",'data.json'),)
        // var list=[];
        // 1.1 读取data.json文件中的内容，并把读取到的内容转化为数组
        // 1.2 读取文件的时候可以直接写utf8编码，这样读取到的就直接是字符串
        //     fs.readFile(path.join(__dirname,"data","data.json"),"utf8",function(err,data){
        //         //第一次访问网站，data.json文件本来就不存在，所以肯定是有错的
        //         //但我们并不认为是网站出错了，所以不抛出异常
        //         if(err&& err.code!=="ENOENT"){
        //             throw err;
        //         }
        //         var list=JSON.parse(data || "[]");
        //         urlboj.query.id=list.length;
        //         list.push(urlobj.query);
        //         fs.writeFile(path.join(__dirname,"data","data.json"),JSON.stringify(list),"utf8",function(err){
        //             if(err){
        //                 throw err;
        //             }
        //             console.log("ok");
        //         });
        //         //不可抓换undefined所以用空数组转换为数组
        //         //设置响应报文头，通过响应报文头通知浏览器，执行一次页面跳转
        //         // 3.跳转到新闻列表页
        //         //重定向
        //         res.statusCode=302;
        //         res.statusMessage="found";
        //         res.setHeader('Location',"/");
        //         res.end();
        //     });
         readnewsdata(function(list){
             urlobj.query.id=list.length;
             list.push(urlobj.query);
             // fs.writeFile(path.join(__dirname,"data","data.json"),JSON.stringify(list),"utf8",function(err){
             //     if(err){
             //         throw err;
             //     }
             //     console.log("ok");
             // });
             writenewsdata(JSON.stringify(list),function(){
                 res.statusCode=302;
                 res.statusMessage="found";
                 res.setHeader('Location',"/");
                 res.end();
             });
             //不可抓换undefined所以用空数组转换为数组
             //设置响应报文头，通过响应报文头通知浏览器，执行一次页面跳转
             // 3.跳转到新闻列表页
             //重定向
         }) ;
    }
    else if(req.url==="/add" && req.method==="post"){
        // 1. 读取data.json文件中的数据
        // 2. 将读取到的数据转换为list素组
        // 3. push一条新闻
        // 4. 将list写入data.json文件中
        // fs.readFile(path.join(__dirname,"data","data.json"),"utf8",function(err,data){
        //     //第一次访问网站，data.json文件本来就不存在，所以肯定是有错的
        //     //但我们并不认为是网站出错了，所以不抛出异常
        //     if(err&& err.code!=="ENOENT"){
        //         throw err;
        //     }
        //     var list=JSON.parse(data || "[]");
        //
        //     var array=[];
        //     req.on('data',function(chunk){
        //         //此处的chunk参数，就是每次浏览器提交的部分数据
        //         //chunk数据类型就是一个Buffer对象
        //         array.push(chunk);
        //     });
        //     //获取用户post提交的数据，用户提交的数据会较多，所以会分多次提交数据，每次提交一部分数据，每次提交都会触发req的data事件
        //     //当触发req的对象的end事件时就说明数据全部提交给服务器
        //     //所以获取用户post提交的数据就必须监听req的data事件
        //     //监听req的end对象，当end事件触发表示数据提交完毕
        //     req.on('end',function(){
        //         //将array中的每个Buffer对象集合成为一个Buffer对象
        //         //通过Buffer对象的concat类方法
        //         var postbody=Buffer.concat(array);
        //         // console.log(postbody);
        //         //将Buffer对象转换为一个查询字符串
        //         postbody=postbody.toString("utf8");
        //         //将查询字符串转换为json对象，通过queryString.parse方法
        //         postbody=querystring.parse(postbody);
        //         postbody.id=list.length;
        //         list.push(postbody);
        //         fs.writeFile(path.join(__dirname,"data","data.json"),JSON.stringify(list),"utf8",function(err){
        //                 if(err){
        //                     throw err;
        //                 }
        //                 console.log("ok");//不可抓换undefined所以用空数组转换为数组
        //                 res.statusCode=302;
        //                 res.statusMessage="found";
        //                 res.setHeader('Location',"/");
        //                 res.end();
        //         });
        //      });
        // });
        readnewsdata(function(list) {
            postdata(req,function(postbody) {
                postbody.id = list.length;
                list.push(postbody);
                console.log(list);
                writenewsdata(JSON.stringify(list),function(){
                    res.statusCode = 302;
                    res.statusMessage = "found";
                    res.setHeader('Location', "/");
                    res.end();
                });
            });
        });
            // var array = [];
            // req.on('data', function (chunk) {
            //     //此处的chunk参数，就是每次浏览器提交的部分数据
            //     //chunk数据类型就是一个Buffer对象
            //     array.push(chunk);
            // });
            // //获取用户post提交的数据，用户提交的数据会较多，所以会分多次提交数据，每次提交一部分数据，每次提交都会触发req的data事件
            // //当触发req的对象的end事件时就说明数据全部提交给服务器
            // //所以获取用户post提交的数据就必须监听req的data事件
            // //监听req的end对象，当end事件触发表示数据提交完毕
            // req.on('end', function () {
            //     //将array中的每个Buffer对象集合成为一个Buffer对象
            //     //通过Buffer对象的concat类方法
            //     // var postbody = Buffer.concat(array);
            //     // // console.log(postbody);
            //     // //将Buffer对象转换为一个查询字符串
            //     // postbody = postbody.toString("utf8");
            //     // //将查询字符串转换为json对象，通过queryString.parse方法
            //     // postbody = querystring.parse(postbody);
            //     // postbody.id = list.length;
            //     // list.push(postbody);
            //     // fs.writeFile(path.join(__dirname, "data", "data.json"), JSON.stringify(list), "utf8", function (err) {
            //     //     if (err) {
            //     //         throw err;
            //     //     }
            //     //     console.log("ok");//不可抓换undefined所以用空数组转换为数组
            //     //     res.statusCode = 302;
            //     //     res.statusMessage = "found";
            //     //     res.setHeader('Location', "/");
            //     //     res.end();
            //     // });
            // });
        // });
    }
    //如果用户请求的为某个路径下的静态资源则可以统一写代码
    else if(req.url.startsWith('/img')&&req.method=='get'){
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                throw err;
            }
            res.setHeader('Content-Type',mime.getType(req.url));
            res.end(data);
        });
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
//优化函数data.json的读取
function readnewsdata(callback){
    fs.readFile(path.join(__dirname,"data","data.json"),"utf8",function(err,data) {
        if (err && err !== 'ENOENT') {
            throw err;
        }
        var listnews = JSON.parse(data || '[]');
        callback(listnews);
    });
}
//封装写入数据data.json
function writenewsdata(data,callback){
    fs.writeFile(path.join(__dirname,'data','data.json'),data,function(err){
        if(err){
            throw err;
        }
        console.log(data);
        callback();
    });
}
//封装post提交方式获取数据
function postdata(req,callback){
    var array=[];
    req.on('data',function(chunk){
        array.push(chunk);
    });
    req.on('end',function() {
        //将array中的每个Buffer对象集合成为一个Buffer对象
        //通过Buffer对象的concat类方法
        var postbody = Buffer.concat(array);
        // console.log(postbody);
        //将Buffer对象转换为一个查询字符串
        postbody = postbody.toString("utf8");
        //将查询字符串转换为json对象，通过queryString.parse方法
        postbody = querystring.parse(postbody);
        callback(postbody);
    });
}