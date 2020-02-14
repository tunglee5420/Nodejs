const express = require("express");
const router = express.Router();
const userDao=require('../DAO/UserDAO');
const Token=require('../utils/jwtUtil');
const md5=require('md5-node');


router.post("/updateUserInfo",function(req, res){
    var user = req.body;

    if(user.sid===null||user.sid===""){
        res.json({code:-1,msg:"信息错误"});
    }else {

        userDao.updateByUserName(user,(err,data)=>{

            if(err){
                res.json(err);
                return;
            }
            if(data.affectedRows===0){
                res.json({
                    code:-1,
                    msg:"修改失败"
                });
            }else {

                res.json({
                    code:0,
                    msg:"修改成功"
                });
            }

        })
    }
})
router.post("/updatePassword", function(req, res) {

    var user = req.body;

    if(user.sid===null||user.sid===""){
        res.json({code:-1,msg:"信息错误"});
    }else {
        user.password=md5(user.password);
        userDao.updatePassward(user,(err,data)=>{

            if(err){
                res.json(err);
                return;
            }
            if(data.affectedRows===0){

                res.json({
                    code:-1,
                    msg:"修改失败"
                });
            }else {

                res.json({
                    code:0,
                    msg:"修改成功"
                });
            }

        })
    }
})

module.exports = router;
