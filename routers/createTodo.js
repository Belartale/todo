const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.get("/create", (req, res) => {
  // console.log(Date.now());
  res.render("create", {});
});

router.post("/createTodo", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(chalk.red(error));
  }
});

module.exports = router;
