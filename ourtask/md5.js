// var crypto=require("crypto");
//
// var obj=crypto.createHash("md5");
//
// var str='1234567890';
// obj.update(str);
//
// var str1=obj.digest("hex");
//
// console.log(str1);

var crypto=require("crypto");

module.exports={
    //后缀
    MD_UNFIX:'wertyuiopp[]\1234567890-=ASDFGHJKLQWERTYUIOPASDFGHJKLqwertyuiopasdfghjk;zxcvbnm,.ZXCVBNMDFGHJK',
    md5:function(str){
        var obj=crypto.createHash("md5");
        obj.update(str);
        return obj.digest("hex");
    }
}