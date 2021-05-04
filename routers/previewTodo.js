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

    todo.forEach((element) => {
      // element.timeLeft = Date.parse(element.timeTo) - Date.now();
      let timeTo = Date.parse(element.timeTo);
      element.timeDays = Math.floor(
        (timeTo - Date.now()) / 1000 / 60 / 60 / 24
      );
      element.timeHours = Math.floor((timeTo - Date.now()) / 1000 / 60 / 60);
      element.timeMinutes = Math.floor((timeTo - Date.now()) / 1000 / 60);
    });

    await res.render("index", {
      arr: todo,
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
});

module.exports = router;
