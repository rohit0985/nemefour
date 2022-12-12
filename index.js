require("dotenv").config();
const express = require("express");
const app = express();

const { connection } = require("./config/db");
const { UserRouter } = require("./Routes/users.route");
const { TodoRouter } = require("./Routes/todos.route");


app.use(express.json())

app.get("/", (req, res) => {
  res.send({ msg: `Hello from ${process.env.NAME}'s todo app` });
});

app.use("/users", UserRouter);
app.use("/todos", TodoRouter);










app.listen(7500, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (err) {
    console.log("ERROR occured while connecting to db");
    console.log(err);
  }
  console.log(`Listening at port ${process.env.PORT}`);
});
