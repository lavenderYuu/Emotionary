const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.post("/product", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

mongoose
  .connect(
    "mongodb+srv://slack:emotionary@emotionary.qhnktaq.mongodb.net/?retryWrites=true&w=majority&appName=Emotionary"
  )
  .then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
