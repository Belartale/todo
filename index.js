const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const Routers = require("chalk");

// const fs = require("fs");
// const path = require("path");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority"
);

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

const start = (params) => {
  try {
    app.listen(PORT, async () => {
      console.log(chalk.blue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! START SERVER"));

      await client.connect();
      const todos = client.db().collection("todos");

      // await todos.insertOne({ name: "1111111111" });

      const todo = await todos.find().toArray((err, result) => {
        console.log(result);

        app.get("/", function (req, res) {
          res.render("index", {
            title: "Hey",
            message: result[0].name,
            arr: result,
          });
        });
      });

      // console.log(todo);
    });
  } catch (error) {
    console.log(chalk.red(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${error}`));
  }
};

start();
