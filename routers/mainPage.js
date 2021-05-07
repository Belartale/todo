const { Router } = require("express");
const router = Router();
const { MongoClient } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

async function changeIdUser(params) {
  await client.connect();
  const todos = client.db().collection("todos");
  const todo = await todos.findOne({
    _id: params,
  });
  if (todo) {
    return true;
  }
}

router.get("/", async (req, res) => {
  if (changeIdUser(req.cookies._id)) {
    res.render("create", {});
  }
  // await client.connect();
  // const todos = client.db().collection("todos");
  // const todo = await todos.findOne({ userName: req.body.userName });

  // if (req.body.userName == todo.userName) {
  //   console.log("OPEN");
  // }

  // res.clearCookie("some1", "donKnow1");
  // if (req.body.userName == a) {
  // }
  // res.cookie("user", { userName: "arr" });
  res.render("mainPage", {});
});

module.exports = router;
