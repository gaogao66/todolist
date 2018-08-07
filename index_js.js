function getkey(event){
    if(event.keyCode===13){
        var div=document.getElementsByClassName('out');
        var text=document.getElementById('in').value;
        if(text){
            var p=document.createElement("p");
            var div1=document.createElement("div");
            var input=document.createElement("input");
            var button=document.createElement("button");
            var textnode=document.createTextNode(text);
            p.appendChild(textnode);
            button.className="icono-cross";
            button.onclick=function (event){
                var oldNode = event.originalTarget.parentElement;
                oldNode.parentNode.removeChild(oldNode);
            };
            input.onclick=function(event){
                if(event.originalTarget.checked){
                    act();
                }else{
                    clc();
                }
            }
            input.type="checkbox";
            div1.appendChild(input);
            div1.appendChild(p);
            div1.appendChild(button);
            div1.className="task";
            div[0].appendChild(div1);
        }
    }
}
function a(){
    var tasks=document.getElementsByClassName('task');
    for(var i=0;i<tasks.length;i++){
        console.log(tasks[i]);
        if(tasks[i]){
            tasks[i].style.display="block";
        }
    }
}
var flag=0;
function act(){
    var tasks=document.getElementsByClassName('task');
    for(var i=0;i<tasks.length;i++){
        console.log(tasks[i]);
        if(tasks[i].firstChild.checked){
            tasks[i].style.display="none";
        }
        else{
            tasks[i].style.display="block";
        }
    }
}

function clc(){
    var tasks=document.getElementsByClassName('task');
    for(var i=0;i<tasks.length;i++){
        console.log(tasks[i]);
        if(!tasks[i].firstChild.checked){
            tasks[i].style.display="none";
        }else{
            tasks[i].style.display="block";
        }
    }
}
window.addEventListener("click",function getitem() {
        var item = document.getElementById('item');
        var tasks=document.getElementsByClassName("task");
        var sum=tasks.length;
        for(var i=0;i<tasks.length;i++){
            if(tasks[i].firstChild.checked){
                sum-=1;
            }
        }
        item.innerText = sum + "items left";
});

// function divide(){
//     var collect=document.getElementsByClassName('task');
//     var complete=document.getElementById('complete1');
//     var active=document.getElementById('active1');
//     console.log(collect);
//     for(var i=0;i<collect.length;i++){
//         console.log(collect[i].cloneNode(false));
//         if(collect[i].firstChild.checked)
//         {
//             complete.appendChild(collect[i]);
//         }else{
//             active.appendChild(collect[i]);
//         }
//     }
// }
//
// function click1(){
//     divide();
//     var complete=document.getElementById('complete');
//     var active=document.getElementById('active');
//     var all=document.getElementById('all');
//     var div=document.getElementsByClassName('out');
//     var new_complete=document.getElementById('complete1');
//     var new_active=document.getElementById('active1');
//     complete.onclick = function () {
//         console.log("it's ok");
//         new_complete.style.display = "block";
//         div[0].style.display = "none";
//         new_active.style.display = "none";
//     };
//     active.onclick=function(){
//         console.log("it's ok");
//         new_complete.style.display="none";
//         div[0].style.display="none";
//         new_active.style.display="block";
//     };
//     all.onclick=function(){
//         console.log("it's ok");
//         new_complete.style.display="none";
//         div[0].style.display="block";
//         new_active.style.display="none";
//
//     }
// }
