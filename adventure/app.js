const express=require("express");//引入框架
const app=express();//创建对象
const Token=require('./utils/jwtUtil')//权限设置
const bodyParser = require("body-parser");
const md5=require('md5-node');

app.listen(3331,function() {
    console.log("项目已经启动，请访问http://localhost:3331/login")
});

app.use(bodyParser.json())// for parsing application/json
app.use(bodyParser.urlencoded({extended : false}))// for parsing application/x-www-form-urlencoded


app.use("/public",express.static(__dirname+"/public"));

//设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//拦截器设置
app.all("*", function(req, res,next){
    let path = req.path;

    if(path.indexOf("/outline")===0){
        console.log('这个api 不需要验证token的');
        return  next()
    }
    const token = req.headers.token;
    // console.log(token)
    if (!token) {
        return res.json({
            code: 401,
            msg: '请登录获取token'
        })
    }

    /**
     * 解析token是否过期 和是否是正确的token
     */
    const body=req.body;
    const data=Token.decrypt(token)
    if(data.result){

        return  next()


    }else {
        return res.json({
            code: 401,
            data : data.data,
            msg: '用户身份错误'
        })
    }

});

const loginRoute=require('./routes/loginRoute.js');
app.use("/outline", loginRoute);
//上传文件
const commonRoute=require('./routes/commonRoute');
app.use("/outline", commonRoute);

const userRoute = require("./routes/userRoute");
app.use("/inline", userRoute);

const blogRoute = require("./routes/blogRoute.js");
app.use("/inline", blogRoute);

