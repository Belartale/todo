const express = require("express");
const app = express();
const chalk = require("chalk");
const path = require("path");

const todosRouters = require("./routers/todos");

const PORT = process.env.PORT || 3000;

//

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(todosRouters);

const start = (params) => {
  try {
    app.listen(PORT, async () => {
      console.log(chalk.blue("START SERVER"));
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

start();
