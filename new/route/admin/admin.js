var express=require('express');
var commend=require('./md5.js');
var mysql=require('mysql');

var connect=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'ourtask'
})

module.exports=function(){
    var route=express.Router();
    route.get(function(req,res,next){
         //console.log(req.url);
        if(!req.session['admin_id']&&req.url!='/adminlogin'){
            res.redirect('/admin/comm/adminlogin');
        }else{
            next();
        }
    });
    route.get('/comm/adminlogin/',require('../template/admin/comm/adminlogin')());
    route.post('/comm/adminlogin/',require('../template/admin/comm/adminlogin')());

    route.get('/manage',function(req,res){
        res.render('admin/manage.html');
        // res.send("ok").end();
    });

    route.get('/index',function(req,res){
        switch(req.query.act){
            case 'mod':connect.query(`select * from banner where id=${req.query.id}`,function(err,data){
                if(err){
                    res.status(400).send("databases error").end();
                }else{
                    connect.query(`select * from banner`,function(err,list){
                       if(err){
                           res.status(400).send("databases error").end();
                       } else{
                           res.render('admin/index.html',{list,mod_data:data[0]});
                           console.log(data);
                       }
                    });
                }
            });
                break;
            case 'del':connect.query(`delete from banner where id=${req.query.id}`,function(err,data){
                if(err){
                    res.status(400).send('databases error').end();
                }else{
                    res.redirect('/admin/index');
                }
            });
                break;
            default:connect.query(`select * from banner`,function(err,data){
                if(err){
                    res.status(400).send('databases error').end();
                }else{
                    // console.log("it's ok");
                    res.render('admin/index.html',{list:data});
                }
            });
            break;
        }
    });

    route.post('/index',function(req,res){
        var title=req.body.title;
        var content=req.body.content;
        var time=req.body.time;
        var writer=req.body.writer;
        var href=req.body.href;
        if(req.body.mod_id){//修改
            connect .query(`update banner set title='${req.body.title}',content='${req.body.content}',
                time='${req.body.time}',writer='${req.body.writer}'`,function(err,data){
                if(err){
                    res.status(400).send('databases error').end();
                } else{
                    res.redirect('/admin/index');
                }
            });
        }else{//添加
            if(!title || !content || !href || !writer || !time){
                res.status(500).send('it must be write');
            }
            else{
                connect.query(`insert into banner(title,content,time,href,writer)
             values('${title}','${content}','${time}','${href}','${writer}')`,function(err,data){
                    if(err){
                        console.log("it's databases error");
                        res.status(400).send('databases error').end();
                    }else{
                        res.redirect('/admin/index');
                    }
                });
            }
        }
    });

    route.get('/file',function(req,res){
        connect.query(`select * from image`,function(err,data){
            if(err){
                res.status(400).send('databases error');
            }else{
                res.render('admin/file.html',{data});
            }
        })

    });
    route.post('/file',function(req,res){
        if(req.body.mod_data){//修改

        }else{//添加

        }
        
    })
    return route;
};