const express = require("express");
const app = express();
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const sass = require("node-sass");

const todosRouters = require("./routers/todos");

const PORT = process.env.PORT || 3000;

//

app.set("view engine", "sass");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(todosRouters);

const start = (params) => {
  try {
    app.listen(PORT, () => {
      console.log(chalk.blue("START SERVER"));
      //!

      //!
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

start();
