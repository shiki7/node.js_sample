var express = require("express");
var ejs = require("ejs");

var app = express();

app.engine("ejs", ejs.renderFile);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Index",
    content: "This is Express-app Top page"
  });
});

app.listen(3000, () => {
  console.log("Server is running!");
});
