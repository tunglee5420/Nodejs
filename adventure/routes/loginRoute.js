const express=require("express");
const router=express.Router();
const userDao=require('../DAO/UserDAO');
const Token=require('../utils/jwtUtil');
const md5=require('md5-node');

router.post("/login",function(req, res) {
    try {

        var user=req.body;
        console.log(user)
        if(user.sid===null||user.sid===""){
            res.json({code:-1,data:null,msg:"学号为空"});

        }else {
            userDao.selectByUserName(user.sid,function (err,data) {
                if (err) res.send(err);

                if(data===null||data.length===0){

                    res.json({code:-1,data:null,msg:"你还没有注册账号"});
                    return;
                }


                if(data[0].password===md5(user.password)){

                    var name=data[0].name;
                    var sid=data[0].sid;
                    var grade=data[0].grade;
                    var major=data[0].major;
                    var token=Token.encrypt({
                        sid:data[0].sid,
                        name:data[0].name,
                        grade:data[0].grade,
                        major: data[0].major
                    },60*60*24);

                    res.json({code:0,data:{
                            token:token,
                            name:name,
                            grade:grade,
                            major: major,
                            sid:sid
                        },msg:"登录成功"});
                }else {
                    res.json({code:-1,msg:"密码错误"});
                }


            });
        }


    }catch (e) {
        console.log(e)
    }

});
router.post("/register",function (req,res) {

       var user = req.body;
       userDao.selectByUserName(user.sid,function (err,data) {

           if (err) res.send(err);
           if(data.length>0){
               res.json({code:-1,msg:"账号已被注册，请重新注册"});
           }else {
               user.password = md5(user.password);
               userDao.insertUser(user,(err,data)=>{
                   if(err) res.send(err)
                   else {

                       if(data.affectedRows===0) {
                           res.json({
                               code:-1,
                               msg:"注册失败"
                           });
                       }else {

                           res.json({
                               code:0,
                               data: "",
                               msg:"注册成功"
                           });
                       }
                   }
               })
           }

       });

});
module.exports = router;



