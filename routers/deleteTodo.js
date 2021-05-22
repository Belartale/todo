const { Router } = require("express");
const router = Router();
const { ObjectId } = require("mongodb");
const chalk = require("chalk");

const connectDb = require("./connectDb");
router.post("/deleteTodo", async (req, res) => {
  try {
    await connectDb.client.connect();
    const todos = connectDb.client.db().collection("todos");
    const user = await todos.findOne({ _id: ObjectId(req.cookies._id) });

    let findOneTodo = user.todoCards.findIndex((elem) => {
      if (elem.idTodo == req.body.idTodo) {
        return elem;
      }
    });

    function removeItemArray(arr, index) {
      return [].concat(arr.slice(0, index), arr.slice(index + 1));
    }

    await todos.updateOne(
      { _id: ObjectId(req.cookies._id) },
      { $set: { todoCards: removeItemArray(user.todoCards, findOneTodo) } }
    );

    await res.redirect("/previewTodos");
  } catch (error) {
    console.log(req.cookies._id);
    console.log(chalk.red(error));
  }
});

module.exports = router;
