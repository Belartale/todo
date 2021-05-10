const { Router } = require("express");
const router = Router();
const { MongoClient, ObjectId } = require("mongodb");
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
    const user = await todos.findOne({ _id: ObjectId(req.cookies._id) });

    user.todoCards.forEach((element) => {
      let timeTo = Date.parse(element.timeToTodo);
      element.timeDaysTodo = Math.floor(
        (timeTo - Date.now()) / 1000 / 60 / 60 / 24
      );
      element.timeHours = Math.floor((timeTo - Date.now()) / 1000 / 60 / 60);
      element.timeMinutes = Math.floor((timeTo - Date.now()) / 1000 / 60);
    });

    await res.render("previewTodos", {
      todoCards: user.todoCards,
    });
  } else {
    res.send("<h1>you didn't login</h1>");
  }
});

module.exports = router;
