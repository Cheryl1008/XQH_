var express = require("express");
var router = express.Router();
var data = require("./sqlconn.js");
var config = require("./config.js");

//登录
router.post(config.interfaceUrl.login,function(req,res){

  var username = req.body.username;
  var password = req.body.password;

  // var sql = "select * from user";
  var sql = "SELECT * FROM user WHERE username=? AND password=?";
  var params = [username,password]
  data(sql,params,function(result){
    if(result.length > 0){
      res.send(result)
    }else{
      res.send({
        msg:"用户名密码不存在",
        code:"4004"
      })
    }
  })
})

// 注册接口
router.post(config.interfaceUrl.register,function(req,res){

  var username = req.body.username;
  var password = req.body.password;
  var sql = "INSERT INTO user values(null,?,?)";
  var params = [username,password];
  data(sql,params,function(result){
    if(result.affectedRows){
      res.send({
        msg:"注册成功",
        code:"200"
      })
    }else{
      res.send({
        msg:'注册失败',
        code:4005
      })
    }
  })
})


module.exports = router;
