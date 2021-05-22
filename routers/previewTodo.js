const { Router } = require("express");
const router = Router();
const {  ObjectId } = require("mongodb");
const chalk = require("chalk");

const mainPage = require("./mainPage");

const connectDb = require("./connectDb");

router.get("/previewTodos", async (req, res) => {
  if (
    (await mainPage.getIdUser(req.cookies._id).then((e) => e)) ==
      req.cookies._id &&
    req.cookies._id != null
  ) {
    await connectDb.client.connect();
    const todos = connectDb.client.db().collection("todos");
    const user = await todos.findOne({ _id: ObjectId(req.cookies._id) });

    user.todoCards.forEach((element) => {
      let timeTo = Date.parse(element.timeToTodo);
      element.timeDaysTodo = Math.floor(
        (timeTo - Date.now()) / 1000 / 60 / 60 / 24
      );
      element.timeHoursTodo = Math.floor(
        (timeTo - Date.now()) / 1000 / 60 / 60
      );
      element.timeMinutesTodo = Math.floor((timeTo - Date.now()) / 1000 / 60);
    });

    await res.render("previewTodos", {
      todoCards: user.todoCards,
    });
  } else {
    res.render("notActiveUser", { namePage: "preview todo" });
  }
});

module.exports = router;
