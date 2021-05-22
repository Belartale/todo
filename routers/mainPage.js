const { Router } = require("express");
const router = Router();
const { ObjectId } = require("mongodb");
const chalk = require("chalk");
const path = require("path");

const connectDb = require("./connectDb");

async function getIdUser(params) {
  await connectDb.client.connect();
  const todos = connectDb.client.db().collection("todos");
  const todo = await todos.findOne({ _id: ObjectId(params) });

  if (typeof todo == "object" && todo != null) {
    return todo._id;
  } else {
  }
}

router.get("/", async (req, res) => {
  if (
    (await getIdUser(req.cookies._id).then((e) => e)) == req.cookies._id &&
    req.cookies._id != null
  ) {
    res.render("createTodo", {});
  } else {
  }

  res.render("mainPage", {});
});

module.exports = {
  router: router,
  getIdUser: getIdUser,
};
