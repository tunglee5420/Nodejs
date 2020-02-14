const express=require("express");
const router=express.Router();
const fileUpload=require('../utils/fileupload');
const blogDAO=require('../DAO/BlogDAO');
const commitDAO=require("../DAO/CommitDAO");
const likeDAO=require("../DAO/LikeDAO");
//上传文件
router.post("/upload",function(req, res){
    fileUpload.postImg(req,res);
    // console.log(res.body)
});


//获取博客
router.post("/getBlogs" , function (req,res) {
    var blogBody=req.body;
    if(blogBody==null){
        res.error("参数错误");
        return;
    }
    console.log(blogBody);
    var conditions={
        "id":blogBody.id,
        "sid":blogBody.sid,
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
router.post("/searchBlogs" , function (req,res) {
    var blogBody=req.body;
    if(blogBody==null){
        res.error("参数错误");
        return;
    }
    var key=blogBody.key;
    blogDAO.searchBlog(key,function(err, data){
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
router.post("/getCommits",function (req, res) {
    var body=req.body;
    if(body==null){
        res.error("参数错误");
        return;
    }
    var id=body.id;

    commitDAO.selectCommits(id,function(err, data) {
        if (err){
            res.error(err);
            return;
        }
        // console.log(data)
        if(data===null||data.length===0){
            res.json({code:-1,data:null,msg:"暂无数据"});

        }else {
            res.json({
                code:0,
                data:data,
                msg:""
            });
        }

    })

});
//获赞
router.post("/getLikes" , function (req,res) {
    var blog=req.body;

    if(blog===null){
        res.error("参数错误");
        return;
    }
    likeDAO.selectLikes(blog.id,function(err, data){
        if (err){
            res.error(err);
            return;
        }
        if(data===null){
            res.json({code:-1,data:null,msg:"暂无数据"});

        }else {
            res.json({
                code:0,
                data:data.length,
                msg:""
            });
        }
    });

});
module.exports= router;
