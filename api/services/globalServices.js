const jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");

/**
 * This function is usae for to authenticate api end points and validate access token for resource access
 */
module.exports.validateAccessToken = function(req, res, next) {
  let accessToken = req.signedCookies.token; //req.body.token || req.headers['x-access-token'];
  if (accessToken) {
    const token = accessToken.split("~")[1];
    req.currentUser = {};
    jwt.verify(token, "R2VBRK3JC7QOB4CL6B5VN5532UR7LZXE", function(
      err,
      decoded
    ) {
      if (decoded) {
        req.currentUser._id = decoded._id;
        req.currentUser.nickName = decoded.nickName;
        req.currentUser.emailId = decoded.emailId;
        req.currentUser.status = decoded.status;
        req.currentUser.createdOn = decoded.createdOn;

        next();
      } else {
        //return module.exports.sendAPIResponse('error','invalidToken',null,req,res,next);
        //	res.status(200).json({ status: 'error', message : 'invalidToken' });
        res.render("pages/login", { status: "error", message: "invalidToken" });
      }
    });
  } else {
    res.render("pages/login", { status: "error", message: "invalidToken" });
    //return module.exports.sendAPIResponse('error','tokenNA',null,req,res,next)
  }
};

module.exports.generateJwt = function(req, res) {
  return (
    "Bearer~" +
    jwt.sign(
      {
        _id: req.userDetails._id,
        nickName: req.userDetails.nickName,
        emailId: req.userDetails.emailId,
        password: req.userDetails.password,
        status: req.userDetails.status,
        createdOn: req.userDetails.createdOn,
        exp: Date.now() + 1 * 1 * 05 * 60 * 1000
      },
      "R2VBRK3JC7QOB4CL6B5VN5532UR7LZXE"
    )
  );
};
