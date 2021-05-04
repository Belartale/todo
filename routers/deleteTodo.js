const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.post("/deleteTodo", async (req, res) => {
  try {
    await client.connect();
    const todos = client.db().collection("todos");

    // todos.findOneAndDelete(req.body.obj);

    await todos.deleteOne({
      title: req.body.title,
      text: req.body.text,
      color: req.body.color,
      timeFrom: req.body.timeFrom,
      timeTo: req.body.timeTo,
    });

    await res.redirect("/");
  } catch (error) {
    console.log(chalk.red(error));
  }
});

module.exports = router;
