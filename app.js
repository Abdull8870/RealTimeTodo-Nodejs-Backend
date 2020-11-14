const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const editRoutes = require("./routes/edit");
const friendRoutes = require("./routes/friend");
const friendstodolistRoutes = require("./routes/friendstodolist");
const friendstodoeditRoutes = require("./routes/friendstodoedit");

const appConfig = require('./appConfig');

const app = express();

mongoose
  .connect(
    appConfig.db
  )
  .then(() => {
        console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/edit", editRoutes);
app.use("/api/editfriendslist", friendstodoeditRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/friendstodolist",friendstodolistRoutes);



module.exports = app;
