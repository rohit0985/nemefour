const express = require("express");
const TodoRouter = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {authorised} = require("../Middlewares/autherization")

const { TodoModel } = require("../Models/Todo.model");
const { UserModel } = require("../Models/User.model");

TodoRouter.get("/", authorised, async (req, res) => {
    const payload = req.body
    const query = req.query
  try{
    const user = await UserModel.findOne({_id:payload.userID})
   const todos =  await TodoModel.find({userID:  user._id}, query)
    res.send({todos});
  }catch(err){
    res.send({ err: "Some error occured" });
  }
});

TodoRouter.post("/create", authorised, async (req, res) => {
    try{
      await TodoModel.create(req.body)
      res.send({ msg: "todo created" });
    }catch(err){
      res.send({ err: "Some error occured" });
    }
  });

  TodoRouter.delete("/delete/:id", authorised, async (req, res) => {
    const {id} = req.params

  try{

    const todo = await TodoModel.findOne({_id:id})
     const user = await UserModel.findOne({_id:todo.userID})
    if(user._id == todo.userID){
        await TodoModel.findByIdAndDelete({_id:id})
        res.send({"msg": "deleted successfully"})
    }else{
       res.send({"err": "not authorised"})
    }
   
  }catch(err){
    res.send({ err: "Some error occured" });
  }
});







module.exports = { TodoRouter };


