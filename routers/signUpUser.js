const { Router } = require("express");
const router = Router();
const chalk = require("chalk");
const path = require("path");

const connectDb = require("./connectDb");

router.get("/signUpUser", (req, res) => {
  res.render("signUpUser", {});
});

router.post("/signUpUser", async (req, res) => {
  await connectDb.client.connect();
  const todos = connectDb.client.db().collection("todos");

  const findUserName = await todos.findOne({ userName: req.body.userName });

  async function addUser(params) {
    await params.todos.insertOne({
      userName: params.req.userName,
      userPassword: params.req.userPassword,
      todoCards: [],
    });

    let todo = await todos.findOne({
      userName: params.req.userName,
      userPassword: params.req.userPassword,
    });
    await res.cookie("_id", todo._id, {});
    await res.cookie("authUser", true, {});
  }

  if (findUserName != null) {
    if (Object.keys(findUserName).length <= 0) {
      await addUser({ todos: todos, req: req.body });

      await res.redirect("/");
    } else {
      await res.send("Such a user already exists !!!");
    }
  } else if (findUserName == null) {
    await addUser({ todos: todos, req: req.body });

    await res.redirect("/");
  } else {
    await res.send("Something went wrong");
  }
});

module.exports = router;
