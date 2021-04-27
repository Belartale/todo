const { Router } = require("express");
const router = Router();
const { MongoClient, ObjectID, ObjectId } = require("mongodb");
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

//! DEL
router.post("/", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");

  await todos.deleteOne({
    title: req.body.title,
    text: req.body.text,
  });

  await res.redirect("/");
});

router.get("/create", (req, res) => {
  res.render("create", {});
});

router.post("/create", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");
  await todos.insertOne({ title: req.body.title, text: req.body.text });

  await res.redirect("/"); // посмотреть список всех todo
});

module.exports = router;
