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
      // function(next) {
      //   console.log('asim');console.log()
      //  if(response){
      //     let token = globalServices.generateJwt(req, res); //Call generate access-token method of global service

      //     res.cookie("token", token, { signed: true });
      //     if(req.userDetails.role == 'role'){
      //     res.status(200).redirect("/questions");
      //     }else{
      //       res.status(200).json({ status: 'success', 'access-token': token }); //Send access token to the user
      //     }
      //  }else{
      //     res.status(409).json({ status: "error", message: "Email id or password is not matching" });
      //  }
       
      // }
    ],
    function(err, result) {
      if(result){
         let token = globalServices.generateJwt(result); //Call generate access-token method of global service
         res.cookie("token", token, { signed: true });
         if(result.role == 'admin'){
         res.status(200).redirect("/questions");
         }else{
           res.status(200).json({ status: 'success', 'access-token': token }); //Send access token to the user
         }
      }else{
         res.status(409).json({ status: "error", message: "Email id or password is not matching" });
      }

    }
  );
});

module.exports = router;
