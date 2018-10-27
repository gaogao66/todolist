var n=0;
function cartoonright(){
    n=(n+1)%5;
    var array=document.getElementById('lele').getElementsByTagName('img');
    for(i=0;i<array.length;i++){
        if(n==i)
        {
            if(i-1>-1){
                array[i-1].style.display='none';
            }
            else{
                array[i+4].style.display='none';
            }
            array[i].style.display='block';
        }
    }
}
function cartoonleft(){
    n=(n+4)%5;
    var array=document.getElementById('lele').getElementsByTagName('img');
    for(i=0;i<array.length;i++){
        if(n==i)
        {
            if(i+1<5){
                array[i+1].style.display='none';
            }
            else{
                array[i-4].style.display='none';
            }
            array[i].style.display='block';
        }
    }
}