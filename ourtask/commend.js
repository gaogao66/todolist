var md5=require("./md5.js");

str='111111';

str=md5.md5(str+md5.MD_UNFIX);

console.log(str);