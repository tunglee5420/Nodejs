
const pool=require("../config/dbconfig")//数据库配置

//插入数据
exports.insertBlog=function (blog_info,callback) {
    if(blog_info===null){
        return -1;
    }
    var title=blog_info.title;
    var content =blog_info.content;
    var pics=blog_info.pics;
    var sid=blog_info.sid;

    var sql="insert into blog( title ,content, pics, user_id, time) values(?,?,?,(select id from user where sid=?),NOW())";
    pool.query(sql,[title, content,pics,sid],function (err, data) {
        if(err)  callback(err);
        else  callback(null,data);
    })
}

exports.selectBlogs=function(data,callback){
    console.log(data);
    var sql = " select * from blog_view ";
    var arr=[];
    if((data.sid===null||data.sid ==='')&&(data.id===null||data.id ==='')){
        sql+="order by time desc";
    }else {
        sql +="where ";
        if((data.sid===null||data.sid ==='')&&(data.id!=null||data.id !=='')){
            sql+="blog_id=?";
            arr.push(data.id);
        } else if((data.sid !=null||data.sid !=='')&&(data.id===null||data.id ==='')){
            sql+="sid=?";
            arr.push(data.sid)
        }else  {
            sql += "blog_id=? and sid=? ";
            arr.push(data.id);
            arr.push(data.sid);
        }
        sql+=" order by time desc";
    }
    console.log(sql)
    console.log(arr);
    pool.query(sql,arr,function(err, data) {
        if(err)  callback(err);
        else  callback(null,data);
    })
}

//删除数据
exports.deleteBlogById=function(data,callback){
    if(data===''||data===null) throw new Error("参数异常");
    var sql = " delete from blog where id=? and user_id=(select id from user where sid=?)";
    pool.query(sql,[data.id, data.sid],function(err, data) {
        if(err)  callback(err);
        else  callback(null,data);
    })
}
exports.searchBlog=function(key,callback) {

    var sql = "SELECT * FROM blog_view WHERE  title LIKE CONCAT('%',?,'%') order by time desc";

    pool.query(sql,[key],function(err, data) {
        if(err)  callback(err);
        else  callback(null,data);
    })
}


