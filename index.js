const express = require("express");
const app = express();
const mongodb = require("mongodb");
const chalk = require("chalk");

const PORT = process.env.PORT || 3000;

function start(params) {
  try {
    app.listen(PORT, () => {
      console.log(chalk.blue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! START SERVER"));
    });
  } catch (error) {
    console.log(chalk.red(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${error}`));
  }
}

start();
