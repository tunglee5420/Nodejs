const pool=require("../config/dbconfig")//数据库配置


exports.selectCollects = function(datas,callback) {
    var sql="select * from collect where blog_id=? and user_id=(select id from user where sid=?)";
    pool.query(sql,[datas.id ,datas.sid],function(err, data) {
        if (err) {
            callback(err);
        }
        callback(null,data);

    })
};

exports.deleteCollect=function(data, callback) {

    var sql="delete from collect where blog_id=? and user_id=(select id from user where sid=?) ";
    pool.query(sql,[data.id , data.sid],function (err, data) {
        if(err)
            callback(err);
        else
            callback(null, data);

    })
};

exports.insertCollect=function(data, callback) {
    var sql ="insert into collect(blog_id, user_id,time) values(?,(select id from user where sid=?),NOW())";
    pool.query(sql, [data.id, data.sid], function(err, data){
        if(err)
            callback(err);
        else
            callback(null, data);
    })
}
