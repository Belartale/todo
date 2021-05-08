const express = require("express");
const app = express();
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

const sass = require("node-sass");

// const todosRouters = require("./routers/todos");

const mainPage = require("./routers/mainPage");

const signInUser = require("./routers/signInUser");
const signUpUser = require("./routers/signUpUser");

const previewTodo = require("./routers/previewTodo");
const createTodo = require("./routers/createTodo");
const changeTodo = require("./routers/changeTodo");
const deleteTodo = require("./routers/deleteTodo");

const PORT = process.env.PORT || 3000;

//

app.set("view engine", "sass");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use(cookieParser());

app.use(mainPage.router);

app.use(signInUser);
app.use(signUpUser);

app.use(previewTodo);
app.use(createTodo);
app.use(changeTodo);
app.use(deleteTodo);
// app.set("port", 5000);

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
