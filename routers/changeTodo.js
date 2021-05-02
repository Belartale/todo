const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.post("/changeTodo", async (req, res) => {
  try {
    await client.connect();
    const todos = client.db().collection("todos");

    await todos.updateOne(
      { title: req.body.title, text: req.body.text, color: req.body.color },
      {
        $set: {
          title: req.body.changeTitle,
          text: req.body.changeText,
          color: req.body.changeColor,
        },
      }
    );

    const todo = await todos.find().toArray();

    await res.render("index", { arr: todo });
  } catch (error) {
    console.log(chalk.red(error));
  }
});

module.exports = router;
