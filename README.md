# [todo](https://belartale-todo.herokuapp.com/)

**Main technologies: Pug, CSS, Express.js, Cookie-parser, MongoDB.**

This project about completing daily tasks, you can buy groceries in the store or complete a goal. When you create new profile, your info (user name and password) keep in MongoDB. It will be so: 

```javascript
{
  _id: "60a923ddf7393d44587696d7",
  userName: "user1",
  userPassword: "1",
  todoCards: [
    {
      idTodo:"1621802711026",
      titleTodo:"Buy bread",
      textTodo:"Buy 3 items.",
      colorTodo:"#eef066",
      timeFromTodo:1621802711026,
      timeToTodo:"2021-07-23T23:44",
    },
    {
      idTodo:"1621802834599",
      titleTodo:"Buy my first car.",
      textTodo:"look for blue Nissan.",
      colorTodo:"#81bdfd",
      timeFromTodo:1621802834599,
      timeToTodo:"2022-07-23T23:47",
    },
  ]
}
```

You can coonect to my db with:
```javascript
const client = new MongoClient("mongodb+srv://admin-app-todo1:admin-app-todo1@cluster0.7h1fx.mongodb.net/app-todo?retryWrites=true&w=majority");
```

I used icons from:
* https://www.flaticon.com/packs/miscellaneous-51
* https://www.flaticon.com/packs/essential-8
