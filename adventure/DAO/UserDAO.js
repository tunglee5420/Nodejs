
const pool=require("../config/dbconfig")//数据库配置

exports.selectByUserName = function(sid,callback) {
    var sql="select * from user where sid=?";
    pool.query(sql,[sid],function(err, data) {
        console.log(data)
        if (err) {
            callback(err);
        }
        callback(null,data);

    })
}

exports.deleteByUserName=function(sid, callback) {
    var sql="delete from user where sid=?";
    pool.query(sql,[sid],function (err, data) {
        if(err)
            callback(err);
        else
            callback(null, data);



    })
}

exports.insertUser=function(user, callback) {
    const sid = user.sid;
    const password = user.password;
    const grade=user.grade;
    const major=user.major;
    const email = user.email;
    const name = user.name;
    const headimg=user.headimg;
    var sql ="insert into user(sid,password,name,grade,major,email,headimg) values(?,?,?,?,?,?,?)"
    pool.query(sql, [sid,password,name,grade,major,email,headimg], function(err, data){
        if(err)
            callback(err);
        else
            callback(null, data);
    })
}

exports.updateByUserName = function(user, callback) {
    var sql="update user set ";
    const sid = user.sid;
    const name = user.name;
    const grade=user.grade;
    const major=user.major;
    const email = user.email;
    const headimg=user.headimg;

    const arr=[];
    if (grade != null && grade !==''){
        arr.push(grade );
        sql+="grade=?";
    }
    if(name!=null && name!==''){
        arr.push(name);
        sql+=",name=?";
    }

    if (major != null && major !==''){
        arr.push(major );
        sql+=",major=?";
    }
    if(email != null && email !==''){
        arr.push(email);
        sql+=",email=?";
    }

    if (headimg != null && headimg !==''){
        arr.push(headimg);
        sql+=",headimg=?";
    }
    sql+=" where sid=?";
    arr.push(sid);
    console.log(sql)
    pool.query(sql,arr,function (err,data) {
        if(err)
            callback(err);
        else
            callback(null, data);
    })
}

exports.updatePassward = function(user, callback) {

    const sid = user.sid;
    const password = user.password;

    var sql="update user set password=? where sid=?";

    pool.query(sql,[password,sid],function (err,data) {
        if(err)
            callback(err);
        else
            callback(null, data);
    })
}
