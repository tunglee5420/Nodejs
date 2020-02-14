var fs=require("fs");
var formidable=require("formidable");
const path = require('path');

exports.postImg=function (req,res) {
    var imgInfo;
    //创建上传表单
    const form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';

    // 设置存储文件的目录
    const imgPath = path.join(__dirname, '../public')
    // console.log(imgPath);
    // console.log(req)
    // 如果目录不存在则创建
    if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
    form.uploadDir = imgPath;
    // 上传文件大小限制
    form.maxFieldsSize = 20 * 1024 * 1024;
    //保留后缀
    form.keepExtensions = true;
    // 上传文件的入口文件
    form.parse(req, function(err,fields,files) {

        if (err) {
            res.locals.error = err;
            return;
        }else {

            imgInfo=files.photo.path;
            var imgURL="http://localhost:3331/public/"+imgInfo.substr(imgInfo.lastIndexOf('\\')+1);

            res.json({
                code:0,
                data:{"img":imgURL},
                msg:"上传成功"
            })
        }

    });



};
