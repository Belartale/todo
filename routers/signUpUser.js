const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.get("/signUpUser", (req, res) => {
  res.render("signUpUser", {});
});

router.post("/signUpUser", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");

  await todos.insertOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    todoCards: [],
  });

  const todo = await todos.findOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });
  await res.cookie("_id", todo._id, {});
  await res.redirect("/");
});

module.exports = router;
