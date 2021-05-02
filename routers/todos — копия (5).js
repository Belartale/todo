const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const todos = client.db().collection("todos");

    const todo = await todos.find().toArray();

    await res.render("index", {
      arr: todo,
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
});

//? CREATE PAGE
router.get("/create", (req, res) => {
  res.render("create", {});
});

//? CREATE TODO

router.post("/createTodo", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");

  // await todos.insertOne({ title: req.body.title, text: req.body.text });

  function text(text) {
    let resultText;

    if (text == "") {
      resultText = "empty";
      return resultText;
    } else {
      return text;
    }
  }

  await todos.insertOne({
    title: req.body.title,
    text: text(req.body.text),
    color: req.body.color,
  });

  await res.redirect("/");
});
//?

// CHANGE
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
//

//! DEL
router.post("/deleteTodo", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");

  // todos.findOneAndDelete(req.body.obj);

  function text(text) {
    let resultText;

    if (text == "empty") {
      return (resultText = "empty");
    } else {
      return text;
    }
  }

  await todos.deleteOne({ title: req.body.title, text: text(req.body.text) });

  await res.redirect("/");
});
//!

module.exports = router;
