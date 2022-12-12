const express = require("express");
const UserRouter = express.Router();
const ip = require("ip");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { UserModel } = require("../Models/User.model");

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const ipAdd = ip.address();
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      await UserModel.create({ name, email, password: hash, ipAdd });
      console.log(req.body);
      res.send({ msg: "newUser created successfully", newUser: req.body });
    });
  } catch (err) {
    console.log("Error:-", arr);
    res.send({ err: "Some error occured" });
  }
});

UserRouter.post("/signin", async (req, res) => {
  const payload = req.body;
  const { email, password } = payload;
  const user = await UserModel.findOne({ email });
  console.log(user);
  try {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ userID: user._id }, process.env.SECRET);
        res.send({ msg: "newUser signin successfully", token: token });
      } else {
        res.send({ err: "wrong credentials" });
      }
    });
  } catch (err) {
    console.log("Error:-", err);
    res.send({ err: "Some error occured" });
  }
});

module.exports = { UserRouter };
