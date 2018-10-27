$(document).ready(function(){
    $(".btn").click(function(e){
        e.preventDefault();
        var name=$(".form-control")[0].value;
        // $.ajax({
        //     url:"http://www.omdbapi.com/?apikey=15f82942&s="+name,
        //     success:function(data){
        //         console.log(data);
        //         let movie=data.Search;
        //         console.log(movie);
        //         let str='';
        //         $.each(movie, function (index, mov) {
        //             str+=`
        //                 <div class="col-lg-4 single-movie">
        //                   <div class="well text-center">
        //                     <img src="${mov.Poster}" class="">
        //                     <h5 class="">${mov.Title}</h5>
        //                     <a onclick="moviedetails('${mov.imdbID}')">more details</a>
        //                   </div>
        //                 </div>
        //                 ` ;
        //             // console.log(${mov.imdbID});
        //         });
        //         $("#content").html(str);
        //         //           $("#content").html(`<div class="col-lg-4">
        //         //     <img src="${data.Poster}" />
        //         //     <h2>${data.Title}</h2>
        //         // </div>`);
        //     },
        //     error:function(data){
        //         console.log(name);
        //         console.log(data.status);
        //         $("#content").html("发生错误"+data.status);
        //     }
        // });
        // $(".row").load("http://www.omdbapi.com/?apikey=15f82942&s="+name,function(response,status){
        //     if(status==='success'){
        //         let str='';
        //         response=$.parseJSON(response).Search;
        //         console.log(response);
        //         $(response).each(function(index,mov){
        //             console.log(mov,index);
        //             str+=`<div class="col-lg-4 single-movie">
        //                   <div class="well text-center">
        //                     <img src="${mov.Poster}" class="">
        //                     <h5 class="">${mov.Title}</h5>
        //                     <a onclick="moviedetails('${mov.imdbID}')">more details</a>
        //                   </div>
        //                 </div>`;
        //         });
        //         $(".row").html(str);
        //     }
        // });
        $.get("http://www.omdbapi.com/?apikey=15f82942&s="+name,function(data,status){
            console.log(data,status);
            var sum=data.totalResults;
            console.log(sum);
            $("#totalsum").html('总共返回的结果个数为'+sum.toString());
            data=data.Search;
            var str='';
            $(data).each(function(index,mov){
                console.log(mov,index);
                str+=`<div class="col-lg-4 single-movie">
                          <div class="well text-center">
                            <img src="${mov.Poster}" class="">
                            <h5 class="">${mov.Title}</h5>
                            <a onclick="moviedetails('${mov.imdbID}')">more details</a>
                          </div>
                        </div>`;
            });
            $(".row").html(str);
        });
    });
});
function moviedetails(imdb){
    window.sessionStorage.setItem('movie_id',imdb);
    window.location="details.html";
}
function details(){
    var id=window.sessionStorage.getItem('movie_id');
    console.log(id);
    $.ajax({
        url:"http://www.omdbapi.com/?apikey=15f82942&i="+id,
        success:function(data){
            console.log(data);
            $(".col-lg-10").html(`
            <div class="col-lg-4"><img src="${data.Poster}" /></div>
            <div class="col-lg-4"><h1>${data.Title}</h1>
                    <h3>${data.Runtime}</h3>
                    <p>${data.Plot}</p>
            </div>  
                    `);
        },
        error:function(){
            $(".col-lg-10").html(`
                    <h1>something wrong with page!</h1>`);
        }
    });
}