"use strict";

var express = require("express");

var app = express();

var chalk = require("chalk");

var fs = require("fs");

var path = require("path");

var sass = require("node-sass");

var todosRouters = require("./routers/todos");

var PORT = process.env.PORT || 3000; //

app.set("view engine", "sass");
app.set("view engine", "pug");
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(todosRouters);

var start = function start(params) {
  try {
    app.listen(PORT, function () {
      console.log(chalk.blue("START SERVER")); //!
      //!
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

start();