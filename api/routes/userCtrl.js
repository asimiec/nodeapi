const express = require("express");
var cookieParser = require("cookie-parser");
const router = express.Router();
app.use(cookieParser("ABCDEFGHIJKLMNOp"));

var async = require("async");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var usersModel = require("../models/usersModel.js");
var globalServices = require("../services/globalServices");
var usersModel = new usersModel();

router.get("/login", (req, res, next) => {
  res.render("pages/login");
});

// route for user logout
router.get("/logout", (req, res) => {
  console.log(req.cookies.token);
  if (req.cookies.token) {
    res.clearCookie("token");

    res.redirect("/user/login");
  } else {
    res.redirect("/user/login");
  }
});

/**
 * This function is use for user login module
 */
router.post("/login", (req, res, next) => {
  async.waterfall(
    [
      function(next) {
        usersModel.getUserDetails(
          req.body.emailId,
          req.body.password,
          req,
          res,
          next
        ); //Get login user details
      },
      function(next) {
        let token = globalServices.generateJwt(req, res); //Call generate access-token method of global service

        res.cookie("token", token, { signed: true });
        res.status(200).redirect("/questions");
        //res.status(200).json({ status: 'success', 'access-token': token }); //Send access token to the user
      }
    ],
    function(err, result) {
      logger.error(err);
    }
  );
});

module.exports = router;