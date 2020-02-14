const pool=require("../config/dbconfig")//数据库配置


exports.selectCommits = function(blog_id,callback) {
    var sql="select name,commit,commit_time from commit_view where blog_id=? order by commit_time desc";
    pool.query(sql,[blog_id],function(err, data) {
        if (err) {
            callback(err);
        }
        callback(null,data);

    })
};

exports.deleteCommit=function(data, callback) {

    var sql="delete from commit where blog_id=? and committer=(select id from user where sid=?) ";
    pool.query(sql,[data.id , data.sid],function (err, data) {
        if(err)
            callback(err);
        else
            callback(null, data);

    })
};

exports.insertCommit=function(data, callback) {

    var sql ="insert into commit(blog_id, committer,commit,time) values(?,(select id from user where sid=?),?,NOW())";
    pool.query(sql, [data.id, data.sid,data.commit], function(err, data){
        if(err)
            callback(err);
        else
            callback(null, data);
    })
}
