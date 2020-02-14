const jwt=require('jsonwebtoken');

let cert = "just123wlxh";//私钥

const Token = {
    encrypt:function(data,time){ //data加密数据，time过期时间
        return jwt.sign(data, cert, {expiresIn:time})
    },
    decrypt:function(token){
        try {
            let data = jwt.verify(token, cert);
            return {
                result:true,
                data : data

            };
        } catch (e) {
            return {
                result:false,
                data:e
            }
        }
    }
}
module.exports = Token;
