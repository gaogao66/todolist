//underscore的zip和unzip实现数组的压缩解压
var _=require("underscore");

// var name=["张三","李四","王五"];
// var age=[12,14,15];
// var gender=["男","男","女"];
//
// var result=_.zip(name,age,gender);
// console.log(result);
//
// result=_.unzip(result);
// console.log(result);


//template函数
var html="<h2><%=name%></h2>";

var fn=_.template(html);

var result=fn({name:"haha"});
console.log(result);