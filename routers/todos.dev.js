"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var _require2 = require("mongodb"),
    MongoClient = _require2.MongoClient,
    ObjectID = _require2.ObjectID,
    ObjectId = _require2.ObjectId;

var chalk = require("chalk");

var client = new MongoClient("mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority", {
  useUnifiedTopology: true
});
router.get("/", function _callee(req, res) {
  var todos, todo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          todos = client.db().collection("todos");
          _context.next = 6;
          return regeneratorRuntime.awrap(todos.find().toArray());

        case 6:
          todo = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(res.render("index", {
            arr: todo
          }));

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(chalk.red(_context.t0));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post("/changeTodo", function _callee2(req, res) {
  var todos, todo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          todos = client.db().collection("todos");
          _context2.next = 6;
          return regeneratorRuntime.awrap(todos.updateOne({
            title: req.body.title,
            text: req.body.text
          }, {
            $set: {
              title: req.body.changeTitle,
              text: req.body.changeText
            }
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(todos.find().toArray());

        case 8:
          todo = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(res.render("index", {
            arr: todo
          }));

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(chalk.red(_context2.t0));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //! DEL

router.post("/deleteTodo", function _callee3(req, res) {
  var todos, text;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          text = function _ref(text) {
            var resultText;

            if (text == "empty") {
              return resultText = "empty";
            } else {
              return text;
            }
          };

          _context3.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          todos = client.db().collection("todos"); // todos.findOneAndDelete(req.body.obj);

          _context3.next = 6;
          return regeneratorRuntime.awrap(todos.deleteOne({
            title: req.body.title,
            text: text(req.body.text)
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(res.redirect("/"));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //!

router.get("/create", function (req, res) {
  res.render("create", {});
});
router.post("/createTodo", function _callee4(req, res) {
  var todos, text;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          text = function _ref2(text) {
            var resultText;

            if (text == "") {
              resultText = "empty";
              return resultText;
            } else {
              return text;
            }
          };

          _context4.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          todos = client.db().collection("todos"); // await todos.insertOne({ title: req.body.title, text: req.body.text });

          _context4.next = 6;
          return regeneratorRuntime.awrap(todos.insertOne({
            title: req.body.title,
            text: text(req.body.text)
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(res.redirect("/"));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;