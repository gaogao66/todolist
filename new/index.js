// 加载express模块
var express=require("express");

// 创建一个app对象，（类似server对象）
 var app=express();

//监听路由
app.get("/index",function(req,res){
    // res.end 方式支持的参数有 buffer 对象和 string 字符串，并且此处中文乱码
    res.end("hello world 你好中国");
    // res.send 方式支持参数 buffer 对象 string, object, 数组array
    // res.send 自动发送更多的响应报文头，其中包括content-type:charset:utf8;不会乱码
    res.send("hello world 你好中国");
});


 //启动http服务
app.listen(9098,function(){
    console.log("http://localhost:9098");
});

// app.get()和app.use()的区别
// app.use()不限定请求方法，并且路径只要以所要求的路径开头就可以（/index/djfksdf  ok /indexdsf notok）