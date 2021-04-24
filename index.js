const express = require("express");
const app = express();
const chalk = require("chalk");
const path = require("path");

const todosRouters = require("./routers/todos");

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(todosRouters);

const start = (params) => {
  try {
    app.listen(PORT, async () => {
      console.log(chalk.blue("START SERVER"));
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

start();

//

// const express = require("express");
// const app = express();
// const { MongoClient } = require("mongodb");
// const chalk = require("chalk");

// const Routers = require("chalk");

// const client = new MongoClient(
//   "mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority"
// );

// const PORT = process.env.PORT || 3000;

// app.set("view engine", "pug");

// const start = (params) => {
//   try {
//     app.listen(PORT, async () => {
//       console.log(chalk.blue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! START SERVER"));

//       await client.connect();
//       const todos = client.db().collection("todos");

//       // await todos.insertOne({ name: "1111111111" });

//       const todo = await todos.find().toArray((err, result) => {
//         console.log(result);

//         app.get("/", function (req, res) {
//           res.render("index", {
//             arr: result,
//           });
//         });
//       });
//     });
//   } catch (error) {
//     console.log(chalk.red(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${error}`));
//   }
// };

// start();
