//将index.html和data.json文件一起渲染
//加载模块
const http=require("http");
const path=require("path");
const mime=require("mime");
const fs=require("fs");
const url=require("url");
const querystring=require("querystring");
const _=require("underscore");

http.createServer(function(req,res){
   //写一个挂载在res对象上的render函数,用来读取文件并响应
   //filename 是所请求的文件爱你完整路径
   res.render=function(filename,tpldata){
       fs.readFile(filename,function(err,data){
           if(err&&err.code!=='ENOENT'){
               throw err;
           }
           //判断是否有模板传入
           if(tpldata){
               var fn=_.template(data.toString('utf8'));//渲染html,template的值data得是一个字符串
               data=fn(tpldata);//渲染传入的值新闻
           }
           res.setHeader('Content-Type',mime.getType(filename));
           res.end(data);
       });
   };
   req.url=req.url.toLowerCase();
   req.method=req.method.toLowerCase();
   var urlobj=url.parse(req.url,true);
   console.log(urlobj.pathname);
   if(req.url==='/'||req.url==='/index.html'&&req.method==='get'){
       fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
           if(err&&err!=='ENOENT'){
               throw err;
           }
           //将字符串转换成数组
           var listnew=JSON.parse(data||'[]');
           //把读取到的内容和页面里面模板所需要的变量当作要传的对象的属性，读取到的内容作为值
           res.render(path.join(__dirname,'source','index.html'),{list:listnew});
       })

   }
   else if(req.url==='/submit.html'&&req.method==='get'){
       res.render(path.join(__dirname,'source','submit.html'));
   }
   else if(req.url.startsWith('/list.html')&&req.method==='get'){
       //通过利用给json文件的每一个对象添加id来访问该页面
       //通过从data.json文件中查找对应的id号来，找到对应的内容并渲染页面
       fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
           if(err&&err!=='ENOENT'){
               throw err;
           }
           var listnews=JSON.parse(data||'[]');
           for(var i=0;i<listnews.length;i++){
               if(listnews[i].id.toString()===urlobj.query.id){
                   var model=listnews[i];
               }
           }
           res.render(path.join(__dirname,'source','list.html'),{list:model});
       })

   }
   else if(req.url.startsWith('/add')&&req.method==='get'){
       //首先获取用户get提交的数据，通过url模块将数据转换为一个对象,通过url.parse（req.url,true）
       //将url对象中的query属性true后也解析成为一个对象
       //解析后把对象转换后存入data.json
       //查看data.json 文件中的内容
       fs.readFile(path.join(__dirname,'data','data.json'),"utf8",function(err,data){
           //如果读取文件出错了但又不是文件不存在，则认为不属于网页出错
           if(err&&err.code!='ENOENT'){
               throw err;
           }
           //读取到的内容转换为数组，若没有读取到则为空数组
           var list=JSON.parse(data||'[]');
           //给list添加id
           urlobj.query.id=list.length;
           list.push(urlobj.query);
           //将添加了新闻的list数组转换为json对象，并存入data.json
           fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
               if(err){
                   throw err;
               }
               res.end('over');
           });
           res.writeHead(302,'found',{
               'Location':'/'
           });
           res.end('ok');
       })
   }
   else if(req.url==='/add'&&req.method==='post'){
       //post方式提交的数据，需存入data.json 文件中
       //同样需先拿到data.json文件中之前的数据
       //获取用户post方式提交的数据，由于数据可能较多，所以会多次提交，每次提交数据会触发req的对象data
       //要获取用户提交过来的数据就必须监听req的data对象
       //当req的对象end被触发则说明数据提交完毕
       fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
           if(err&&err!=='ENOENT'){
               throw err;
           }
           var list=JSON.parse(data||'[]');
           //定义一个新数组用来存储用户每次提交的一部分数据
           var array=[];
           req.on('data',function(chunk){
               //chunk是一个buffer类的用户每次传递过来的数据
               array.push(chunk);
           });
           req.on('end',function(err){
               console.log('ok');
           });
           //把接受到的存储李buffer类数据的array数组合并为一个buffer
           var postbody=Buffer.concat(array);
           //把buffer类转换成数组
           //转换为查询字符串
           postbody=postbody.toString('utf8');
           //将查询字符串转换成json对象
           postbody=querystring.parse(postbody);
           //存入list数组
           postbody.id=list.length;
           list.push(postbody);
           fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
               if(err){
                   throw err;
               }
               res.writeHead(302,'found',{
                   'Location':'/'
               });
               res.end();
           });
       })
   }
   else if(req.url.startsWith('/img')){
        res.render(path.join(__dirname,req.url));
   }
   else {
       // res.setcode='404';
       // res.setMessage='not found';
       // res.setHeader('Content-Type','text/html');
       res.writeHead(404,'not found',{
           'Content-Type':'text/html;charset:utf-8;'
       });
       res.end("404 not found");
   }
}).listen(8080,function(){
    console.log("http://localhost:8080");
});