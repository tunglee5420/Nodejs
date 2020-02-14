const express=require("express");
const router=express.Router();
const blogDAO=require('../DAO/BlogDAO');
const Token=require('../utils/jwtUtil');
const md5=require('md5-node');
const commentDAO=require("../DAO/CommitDAO");
const likeDAO=require("../DAO/LikeDAO");
const collectDAO=require("../DAO/CollectDAO")
//发表博客
router.post("/addBlog" , function (req,res) {
    var blogBody=req.body;
    var header=req.headers;
    var token=header["token"]
    var user=Token.decrypt(token).data;
    if(blogBody==null){
        res.error("参数错误");
        return;
    }
    blogBody.sid=user.sid;

    blogDAO.insertBlog(blogBody,function(err, data){
        if (err){
            res.error(err);
            return;
        }
        if(data.affectedRows===0){
            res.json({
                code:-1,
                msg:"发表失败"
            });
            return;
        }else {
            res.json({
                code:0,
                msg:"发表成功"
            });
        }
    });

});
//获取个人博客
router.post("/getMyBlogs" , function (req,res) {
    var blogBody=req.body;
    var header=req.headers;
    var token=header["token"];
    var user=Token.decrypt(token).data;
    if(blogBody==null){
        res.error("参数错误");
        return;
    }

    var conditions={
        "sid":user.sid,
        "id":""
    }

    blogDAO.selectBlogs(conditions,function(err, data){
        if (err){
            res.error(err);
            return;
        }

        if(data===null||data.length===0){

            res.json({code:-1,data:null,msg:"暂无数据"});
            return;
        }else {
            res.json({
                code:0,
                data:data,
                msg:""
            });
        }
    });

});

//获取博客
router.post("/getBlogs" , function (req,res) {
    var blogBody=req.body;
    if(blogBody==null){
        res.error("参数错误");
        return;
    }
    var conditions={
        "id":null,
        "sid":null
    }
    blogDAO.selectBlogs(conditions,function(err, data){
        if (err){
            res.error(err);
            return;
        }

        if(data===null||data.length===0){
            res.json({code:-1,data:null,msg:"暂无数据"});
            return;
        }else {
            res.json({
                code:0,
                data:data,
                msg:""
            });
        }
    });

});
//删除blog
router.post("/deleteBlog" , function (req,res) {
    var blogBody=req.body;
    // var header=req.headers;
    // var token=header["token"];
    // var user=Token.decrypt(token).data;
    if(blogBody===null){
        res.error("参数错误");
        return;
    }

    var conditions={
        sid:blogBody.sid,
        id:blogBody.id
    }
    blogDAO.deleteBlogById(conditions,function(err, data){
        if (err){
            res.error(err);
            return;
        }
        if(data.affectedRows===0){

            res.json({code:-1,msg:"删除失败"});
            return;
        }else {
            res.json({
                code:0,
                msg:"删除成功"
            });
        }
    });

});

//发表评论
router.post("/addComment" , function (req,res) {
    var commit=req.body;
    var header=req.headers;
    var token=header["token"];
    var user=Token.decrypt(token).data;
    if(commit===null){
        res.error("参数错误");
        return;
    }

    var conditions={
        sid:user.sid,
        id:commit.id,
        commit:commit.commit
    }

    commentDAO.insertCommit(conditions,function(err, data){

        if (err){
            res.error(err);
            return;
        }
        if(data.affectedRows===0){

            res.json({code:-1,msg:"发表失败"});
            return;
        }else {
            res.json({
                code:0,
                msg:"发表成功！"
            });
        }
    });

});


//点赞
router.post("/addLike" , function (req,res) {
    var blog=req.body;
    var header=req.headers;
    var token=header["token"];
    var user=Token.decrypt(token).data;
    if(blog===null){
        res.error("参数错误");
        return;
    }

    var conditions={
        sid:user.sid,
        id:blog.id
    }
    console.log(conditions);

    likeDAO.insertLike(conditions,function(err, data){

        if (err){
            res.error(err);
            return;
        }
        if(data.affectedRows===0){

            res.json({code:-1,msg:"点赞失败"});
            return;
        }else {
            res.json({
                code:0,
                msg:"点赞成功！"
            });
        }
    });

});
//收藏
router.post("/collect", function(req, res) {
    var blog=req.body;
    var header=req.headers;
    var token=header["token"];
    var user=Token.decrypt(token).data;
    if(blog===null){
        res.error("参数错误");
        return;
    }
    var conditions={
        sid:user.sid,
        id:blog.id
    }
    console.log(conditions);

    collectDAO.insertCollect(conditions,function(err, data){

        if (err){
            res.error(err);
            return;
        }
        if(data.affectedRows===0){

            res.json({code:-1,msg:"收藏失败"});
            return;
        }else {
            res.json({
                code:0,
                msg:"收藏成功！"
            });
        }
    });

});
module.exports = router;
