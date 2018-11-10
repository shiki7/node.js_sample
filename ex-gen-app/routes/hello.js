var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // getパラメータ取得
  // var name = req.query.name;
  // var mail = req.query.mail;
  var data = {
    title: "Hello!",
    // content: "your_name=" + name + "<br>your_mail_adress=" + mail
    content: "なにか入力してください"
  };
  res.render("hello", data);
});

router.post("/post", function(req, res, next) {
  // postを取得
  var msg = req.body["message"];
  var data = {
    title: "Hello!",
    content: msg
  };
  res.render("hello", data);
});

module.exports = router;
