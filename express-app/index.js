var express = require("express");
var ejs = require("ejs");

var app = express();

app.engine("ejs", ejs.renderFile);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Index",
    content: "This is Express-app Top page",
    link: { href: "/other", text: "別ページへ移動" }
  });
});

app.get("/other", (req, res) => {
  var msg = "This is Other Page";
  res.render("index.ejs", {
    title: "other",
    content: msg,
    link: { href: "/", text: "トップに戻る" }
  });
});

app.listen(3000, () => {
  console.log("Server is running!");
});
