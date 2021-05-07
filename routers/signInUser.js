const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.post("/signInUser", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");
  const todo = await todos.findOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });
  if (
    req.body.userName == todo.userName ||
    req.body.userPassword == todo.userPassword
  ) {
    await res.cookie("_id", todo._id, {});
    await res.render("create", {});
  } else {
    await res.send("<h1>error</h1>");
  }
});

module.exports = router;
