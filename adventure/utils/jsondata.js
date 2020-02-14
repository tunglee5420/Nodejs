module.exports={
    JsonData:{
        code:0,
        data:"",
        msg:"",
        build:function(code,data, msg){
            this.code = code;
            this.data=data;
            this.msg= msg;
        },
        get:function () {
            return this;
        }
    }
}
