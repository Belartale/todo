const { Router } = require("express");
const router = Router();
const chalk = require("chalk");
const path = require("path");

const connectDb = require("./connectDb");

router.post("/signInUser", async (req, res) => {
  await connectDb.client.connect();
  const todos = connectDb.client.db().collection("todos");
  const todo = await todos.findOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });
  if (
    req.body.userName == todo.userName ||
    req.body.userPassword == todo.userPassword
  ) {
    await res.cookie("_id", todo._id, {});
    await res.cookie("authUser", true, {});
    await res.render("createTodo", {});
  } else {
    res.render("notActiveUser", { namePage: "000000000" });
  }
});

module.exports = router;
