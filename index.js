const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./model/user.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mernApp")
  .then(() => {
    console.log("MONGO CONNECTED");
  })
  .catch((e) => {
    console.log("error:", e);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({
    username: username,
    password: password,
  });
  if (findUser) {
    res.json(findUser);
  } else {
    console.log("no data found");
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });
  await newUser.save();
  return res.json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("port listening on port 5000");
});
