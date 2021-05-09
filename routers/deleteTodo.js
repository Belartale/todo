const { Router } = require("express");
const router = Router();
const { MongoClient, ObjectId } = require("mongodb");
const chalk = require("chalk");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

router.post("/deleteTodo", async (req, res) => {
  try {
    await client.connect();
    const todos = client.db().collection("todos");
    const user = await todos.findOne({ _id: ObjectId(req.cookies._id) });

    // [1, 2, 3, 4, 5] find
    // some do

    let findOneTodo = user.todoCards.findIndex((elem) => {
      if (elem.idTodo == req.body.idTodo) {
        return elem;
      }
    });
    console.log(findOneTodo);

    let result = user.todoCards.slice(findOneTodo, 1);

    console.log(result);

    await todos.updateOne(
      { _id: ObjectId(req.cookies._id) },
      { $set: { todoCards: result } }
    );

    await res.redirect("/previewTodos");
  } catch (error) {
    console.log(req.cookies._id);
    console.log(chalk.red(error));
  }
});

module.exports = router;
