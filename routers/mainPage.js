const { Router } = require("express");
const router = Router();
const { MongoClient, ObjectId } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

async function getIdUser(params) {
  await client.connect();
  const todos = client.db().collection("todos");
  const todo = await todos.findOne({ _id: ObjectId(params) });

  if (typeof todo == "object" && todo != null) {
    // console.log(chalk.green("GET todo._id"));
    return todo._id;
  } else {
    console.log(chalk.red("NOT todo._id  NULLLLLLLLLLL"));
  }
}

router.get("/", async (req, res) => {
  if (
    (await getIdUser(req.cookies._id).then((e) => e)) == req.cookies._id &&
    req.cookies._id != null
  ) {
    console.log(chalk.green("to createTodo"));
    res.render("createTodo", {});
  } else {
    console.log(chalk.red("req.cookies NULLLLLLLLLL"));
  }

  res.render("mainPage", {});
});

// module.exports = router;

module.exports = {
  router: router,
  getIdUser: getIdUser,
};
