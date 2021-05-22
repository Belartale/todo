const { Router } = require("express");
const router = Router();
const { ObjectId } = require("mongodb");
const chalk = require("chalk");

const connectDb = require("./connectDb");

router.post("/changeTodo", async (req, res) => {
  try {
    await connectDb.client.connect();
    const todos = connectDb.client.db().collection("todos");
    const user = await todos.findOne({ _id: ObjectId(req.cookies._id) });

    let toJSON = JSON.stringify(user.todoCards);

    let findOneTodo = JSON.parse(toJSON).findIndex((elem) => {
      if (elem.idTodo == req.body.idTodo) {
        return elem;
      }
    });

    function updateItemArray(arr, index, obj) {
      return [].concat(
        arr.slice(0, index),
        { ...arr[index], ...obj },
        arr.slice(index + 1)
      );
    }

    await todos.updateOne(
      { _id: ObjectId(req.cookies._id) },
      {
        $set: {
          todoCards: updateItemArray(user.todoCards, findOneTodo, {
            titleTodo: req.body.changeTitle,
            textTodo: req.body.changeText,
            colorTodo: req.body.changeColor,
          }),
        },
      }
    );

    await res.redirect("/previewTodos");
  } catch (error) {
    console.log(chalk.red(error));
  }
});

module.exports = router;
