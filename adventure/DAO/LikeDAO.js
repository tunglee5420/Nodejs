const pool=require("../config/dbconfig")//数据库配置


exports.selectLikes = function(blog_id,callback) {
    var sql="select name from like_view where blog_id=?";
    pool.query(sql,[blog_id],function(err, data) {
        if (err) {
            callback(err);
        }
        callback(null,data);

    })
};

exports.deleteLike=function(data, callback) {

    var sql="delete from mylike where blog_id=? and liker=(select id from user where sid=?) ";
    pool.query(sql,[data.id , data.sid],function (err, data) {
        if(err)
            callback(err);
        else
            callback(null, data);

    })
};

exports.insertLike=function(data, callback) {

    var sql ="insert into mylike(blog_id,liker,time) values(?,(select id from user where sid=?),NOW())";

    pool.query(sql, [data.id, data.sid], function(err, data){

        if(err)
            callback(err);
        else
            callback(null, data);
    })
}
