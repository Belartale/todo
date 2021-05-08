const { Router } = require("express");
const router = Router();
const { MongoClient, ObjectId } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const mainPage = require("./mainPage");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.get("/createTodo", async (req, res) => {
  if (
    (await mainPage.getIdUser(req.cookies._id).then((e) => e)) ==
      req.cookies._id &&
    req.cookies._id != null
  ) {
    res.render("createTodo", {});
  } else {
    res.send("<h1>you didn't login</h1>");
  }
});

router.post("/createTodo", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");

  let todo = await todos.findOne({ _id: ObjectId(req.cookies._id) });

  let arr = [...todo.todoCards];

  arr.push({
    titleTodo: req.body.titleTodo,
    textTodo: req.body.textTodo,
    colorTodo: req.body.colorTodo,
    timeFromTodo: Date.now(),
    timeToTodo: req.body.timeToTodo,
  });

  let t = await todos.updateOne(
    { _id: ObjectId(req.cookies._id) },
    {
      $set: {
        todoCards: arr,
      },
    }
  );

  // await todos.todoCards.insertOne({
  //   titleTodo: req.body.titleTodo,
  //   textTodo: req.body.textTodo,
  //   colorTodo: req.body.colorTodo,
  //   timeFromTodo: Date.now(),
  //   timeToTodo: req.body.timeToTodo,
  // });

  await res.redirect("/previewTodos");
});

module.exports = router;
