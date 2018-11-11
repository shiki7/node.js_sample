var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var mysql_setting = {
  host: "localhost",
  user: "root",
  password: "",
  database: "my_nodeapp_db"
};

router.get("/", (req, res, next) => {
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query("Select * from mydata", (error, results, fields) => {
    if (error == null) {
      var data = { title: "mysql", content: results };
      res.render("hello/index", data);
    }
  });
  connection.end();
});

router.get("/add", (req, res, next) => {
  var data = {
    title: "Hello/Add",
    content: "新しいレコードを入力:"
  };
  res.render("hello/add", data);
});

router.post("/add", (req, res, next) => {
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = { name: nm, mail: ml, age: ag };

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "insert into mydata set ?",
    data,
    (error, results, fields) => {
      res.redirect("/hello");
    }
  );

  connection.end();
});

router.get("/show", (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "select * from mydata where id = ?",
    id,
    (error, results, fields) => {
      if (error == null) {
        var data = {
          title: "Hello/show",
          content: "id=" + id + "のレコード",
          mydata: results[0]
        };
        res.render("hello/show", data);
      }
    }
  );

  connection.end();
});

module.exports = router;
