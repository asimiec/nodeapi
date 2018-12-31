const express = require("express");
global.app = express();
const morgan = require("morgan"); //for logging incoming request
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const questionRoutes = require("./api/routes/Questions");
const answerRoutes = require("./api/routes/Answers");

const loginRoutes = require("./api/routes/userCtrl");
app.use(morgan("dev"));
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTION") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", loginRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
});
module.exports = app;
