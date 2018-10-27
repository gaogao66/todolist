//加载所需要的的模块
var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");

http.createServer(function(req,res){
    if(req.url.startsWith("/source1"))
    {
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                throw err;
            }
            res.setHeader("Content-Type",mime.getType(req.url));
            res.end(data);
        });

    }
    // else if(){
    //     res.writeHead(200,"ok",{
    //         'Content-Type':mime.getType(req.url)
    //     });
    // }
    else{
        res.end("404");
    }

}).listen(9090,function(){
    console.log("http://localhost:9090");
});