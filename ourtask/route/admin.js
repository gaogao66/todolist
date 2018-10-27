var express=require('express');
var md5=require("../md5.js");
var mysql=require("mysql");
var path=require('path');

//创建数据库数据池
var connect=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'ourtask',
});

module.exports=function(){
    var route=express.Router();
    route.use('/assets',express.static('./assets'));
    route.get(function(req,res,next){
        if(!req.session['sess_id']&&req.url!='/userlogin'){
            res.redirect('/admin/userlogin');
        }else{
            next();
        }
    });
    route.get('/userlogin',function(req,res){
        res.render('admin/userlogin.html',{});
    });

    route.post('/userlogin',function(req,res){
        console.log(req.body);
        var username=req.body.username;
        var password=md5.md5(req.body.password+md5.MD_UNFIX);
        console.log(password);
        connect.query(`select * from admin where username='${username}'`,function(err,data){
            if(err){
                res.status(400).send("databases error").end();
            }else{
                if(data.length==0){
                    res.status(500).send("no this admin").end();
                }else{
                    if(password==data[0].password){
                        // res.status(302).send("ok").end();
                        req.session['sess_id']=data[0].id;
                        res.redirect('/admin/index');
                    }else{
                        console.log(data[0].password);
                        res.status(400).send("password is error").end();
                    }
                }
            }
        })
    });
    route.get('/head/manage',function(req,res){
       res.render('admin/head/manage.html');
    });
    route.get('/index',function(req,res){
        switch(req.query.act){
            case 'mod':
                connect.query(`select * from banner where id=${req.query.id}`,function(err,data){
                    if(err){
                        console.log(err);
                        res.status(500).send('databases error').end();
                    }else if(data.length==0){
                        res.status(500).send('data not found').end();
                    } else{
                        connect.query(`select * from banner`,function(err,banners){
                            if(err){
                                console.log("databases error");
                                res.status(500).send("databases error").end();
                            }else {
                                res.render('admin/index.html', {banners, mod_data: data[0]});
                            }
                        });
                    }
                });
                break;
            case 'del':connect.query(`delete from banner where id=${req.query.id}`,function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('databases error').end();
                }else{
                    res.redirect('/admin/index');
                }
            })
                break;
            default: connect.query(`select * from banner`,function(err,banners){
                if(err){
                    console.log("databases error");
                    res.status(500).send("databases error").end();
                }else{
                    // console.log(banners);
                    res.render('admin/index.html',{banners});
                }
            });
                break;
        }

    });
    route.post('/index',function(req,res){
        var title=req.body.title;
        var content=req.body.content;
        var href=req.body.href;
        var time=req.body.time;
        var writer=req.body.writer;
        var count=req.body.count;
        if(req.body.mod_id){//修改
            connect.query(`update banner set title='${req.body.title}',content='${req.body.content}',time='${req.body.time}',writer='${req.body.writer}' where id=${req.body.mod_id}`,function(err,data){
                if(err){
                    res.status(500).send('databases error').end();
                }else{
                    res.redirect('/admin/index');
                }
            });
        }else{//添加
            if(!title || !content || !href){
                res.status(400).send("it mast be write").end();
            }
            else{
                connect.query(`insert into banner(title,content,href,time,writer,count) 
        values('${title}','${content}','${href}','${time}','${writer}','${count}')`,function(err,data){
                    if(err){
                        res.status(400).send('databases error').end();
                    }else{
                        res.redirect('/admin/index');
                    }
                });
            }
        }
    });
    return route;
}
