var express = require("express");
var router = express.Router();

var data = [
  { name: "hoge1", age: 30, mail: "fuga1" },
  { name: "hoge2", age: 31, mail: "fuga2" },
  { name: "hoge3", age: 32, mail: "fuga3" }
];

router.get("/", (req, res, next) => {
  var n = req.query.id;
  res.json(data[n]);
});

module.exports = router;
