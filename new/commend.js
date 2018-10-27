var pluspasswd=require("./template/admin/comm/md5.js");

var str='111111';

str=pluspasswd.md5(str+"wertyuiopp[]\\1234567890-=ASDFGHJKLQWERTYUIOPASDFGHJKLqwertyuiopasdfghjk;zxcvbnm,.ZXCVBNMDFGHJK");

console.log(str);