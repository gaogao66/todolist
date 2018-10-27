// //功能是加密，签名
// var crypto=require("crypto");
//
// var obj=crypto.createHash('md5');
//
// obj.update('123332434');
//
// var str=obj.digest("hex");
//
// console.log(str);
//
// var crypto=require("crypto");
//
// module.exports={
//     //后缀
//     MD_UNFIX:'wertyuiopp[]\1234567890-=ASDFGHJKLQWERTYUIOPASDFGHJKLqwertyuiopasdfghjk;zxcvbnm,.ZXCVBNMDFGHJK',
//     md5: function (str){
//         var obj=crypto.createHash("md5");
//         obj.update(str);
//         return obj.digest("hex");
//     }
// };
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