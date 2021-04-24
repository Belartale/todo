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
    await res.render("index", {
      arr: todo,
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
});

router.get("/create", (req, res) => {
  res.render("create", {});
});

router.post("/create", async (req, res) => {
  await client.connect();
  const todos = client.db().collection("todos");
  await todos.insertOne({ title: req.body.title, text: req.body.title });

  // await todo.save(); // асинхроность и воз промис
  await res.redirect("/"); // посмотреть список всех todo

  // res.render("create", {});
});

// const getAllTodos = async () => {
//   await client.connect();
//   const todos = client.db().collection("todos");

//   const todo = await todos.find().toArray();
//   // console.log(chalk.yellow(todo));
//   return todo[2].title;
// };

// router.get("/", async (req, res) => {
//   console.log(getAllTodos());
// });

module.exports = router;
