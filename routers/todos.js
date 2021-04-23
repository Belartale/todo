const { Router } = require("express");
const router = Router();

const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority"
);

router.get("/", (req, res) => {
  client.connect();
  const todos = client.db().collection("todos");

  // await todos.insertOne({
  //   title: "Title3",
  //   text:
  //     "some text",
  // });

  const todo = todos.find().toArray((err, result) => {
    console.log(result);

    // app.get("/", function (req, res) {
    res.render("index", {
      title: "Hey",
      message: result[0].name,
      arr: result,
    });
    // });
  });
});
