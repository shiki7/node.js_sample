var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  var msg = "なにか書いて";
  if (req.session.message != undefined) {
    msg = req.session.message;
  }
  var data = {
    title: "Hello!",
    content: msg
  };
  res.render("hello", data);
});

router.post("/post", (req, res, next) => {
  // postを取得
  var msg = req.body["message"];
  req.session.message = msg;
  var data = {
    title: "Hello!",
    content: req.session.message
  };
  res.render("hello", data);
});

module.exports = router;
