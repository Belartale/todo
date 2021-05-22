const { Router } = require("express");
const router = Router();
const { ObjectId } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const mainPage = require("./mainPage");

const connectDb = require("./connectDb");

router.get("/createTodo", async (req, res) => {
  if (
    (await mainPage.getIdUser(req.cookies._id).then((e) => e)) ==
      req.cookies._id &&
    req.cookies._id != null
  ) {
    res.render("createTodo", {});
  } else {
    res.render("notActiveUser", { namePage: "create your todo" });
  }
});

router.post("/createTodo", async (req, res) => {
  await connectDb.client.connect();
  const todos = connectDb.client.db().collection("todos");

  let todo = await todos.findOne({ _id: ObjectId(req.cookies._id) });

  let arr = [...todo.todoCards];

  arr.push({
    idTodo: JSON.stringify(Date.now()),
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

  await res.redirect("/previewTodos");
});

module.exports = router;
