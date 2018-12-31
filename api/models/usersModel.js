const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dbConnection = require("./dbConnection");
var userSchema = dbConnection.Schema(
  {
    nickName: String,
    emailId: String,
    password: String,
    createdOn: Date,
    status: {
      type: String,
      enum: ["active", "inActive"]
    }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

/**
 * This model method is used for to get login user details
 */
userSchema.methods.getUserDetails = function(
  emailId,
  password,
  req,
  res,
  next
) {
  query = { emailId: emailId, password: password };
  users.findOne(query, function(err, response) {
    console.log(response);
    console.log(err);
    if (response) {
      req.userDetails = response._doc;
      next(null, response._doc);
    } else {
      res
        .status(409)
        .json({
          status: "error",
          message: "Email id or password is not matching"
        });
    }
  });
};

let users = dbConnection.db.model("users", userSchema);
module.exports = users;
