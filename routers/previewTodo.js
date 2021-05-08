const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const mainPage = require("./mainPage");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.get("/previewTodos", async (req, res) => {
  if (
    (await mainPage.getIdUser(req.cookies._id).then((e) => e)) ==
      req.cookies._id &&
    req.cookies._id != null
  ) {
    await client.connect();
    const todos = client.db().collection("todos");
    const manyTodo = await todos.find().toArray();

    console.log(manyTodo[0].todoCards);
    console.log(chalk.red("previewTodo 23 row"));

    manyTodo.forEach((element) => {
      // element.timeLeft = Date.parse(element.timeTo) - Date.now();
      let timeTo = Date.parse(element.timeToTodo);
      element.timeDays = Math.floor(
        (timeTo - Date.now()) / 1000 / 60 / 60 / 24
      );
      element.timeHours = Math.floor((timeTo - Date.now()) / 1000 / 60 / 60);
      element.timeMinutes = Math.floor((timeTo - Date.now()) / 1000 / 60);
    });

    await res.render("previewTodos", {
      todos: manyTodo,
    });
  } else {
    res.send("<h1>you didn't login</h1>");
  }
});

module.exports = router;
