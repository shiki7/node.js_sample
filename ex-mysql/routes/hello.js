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
    content: "新しいレコードを入力:",
    form: { name: "", mail: "", age: 0 }
  };
  res.render("hello/add", data);
});

router.post("/add", (req, res, next) => {
  req.check("name", "NAMEは必ず入力してください").notEmpty();
  req.check("mail", "メールを入力してください").isEmail();
  req.check("age", "年齢を入力してください").isInt();

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      var re = '<ul class="error">';
      var result_arr = result.array();
      for (var n in result_arr) {
        re += "<li>" + result_arr[n].msg + "</li>";
      }
      re += "</ul>";
      var data = {
        title: "Hello/Add",
        content: re,
        form: req.body
      };
      res.render("hello/add", data);
    } else {
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
    }
  });
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

// 指定レコードを編集
router.get("/edit", (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "select * from mydata where id = ?",
    id,
    (error, results, fields) => {
      if (error == null) {
        var data = {
          title: "Hello/edit",
          content: "id=" + id + "のレコード",
          mydata: results[0]
        };
        res.render("hello/edit", data);
      }
    }
  );

  connection.end();
});

// 編集フォーム送信の処理
router.post("/edit", (req, res, next) => {
  var id = req.body.id;
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = { name: nm, mail: ml, age: ag };

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "update mydata set ? where id = ?",
    [data, id],
    (error, results, fields) => {
      res.redirect("/hello");
    }
  );

  connection.end();
});

router.get("/delete", (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "select * from mydata where id = ?",
    id,
    (error, results, fields) => {
      if (error == null) {
        var data = {
          title: "Hello/delete",
          content: "id=" + id + "のレコード",
          mydata: results[0]
        };
        res.render("hello/delete", data);
      }
    }
  );

  connection.end();
});

router.post("/delete", (req, res, next) => {
  var id = req.body.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    "delete from mydata where id = ?",
    id,
    (error, results, fields) => {
      res.redirect("/hello");
    }
  );

  connection.end();
});

module.exports = router;
