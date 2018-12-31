const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dbConnection = require("./dbConnection");
//category schema definition
var questionSchema = dbConnection.Schema(
  {
    // _id:mongoose.Schema.Types.ObjectId,
    question: { type: String },
    options: { type: Array },
    status: { type: String, default: "active" },
    createdBy: { type: String, default: "Admin" },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
// questionSchema.pre('save', next => {
//   now = new Date();
//   if(!this.createdAt) {
//     this.createdAt = now;
//   }
//    next();
// });

/**
 * This model method adds video
 **/
// questionSchema.methods.saveQuestion = function(req, res, next) {console.log(req.body);
//   var questionInsert = new questions(req.body);
//   questionInsert.save(function(err, response) {
//     console.log(12345);
//     console.log(err);console.log(response);
//         if(err) {
//           next(err, null);
//         } else {
//           next(null, response);
//         }
//       }
//   );
// };

/**
 * This model method fetch videos
 **/
// videoSchema.methods.fetchVideos = function(req, res, next) {
//   if(configs.trialId || req.query.trialId) {
//     videos.find({ status : true, trialId : configs.trialId || req.query.trialId }, {}, function(err, response) {
//       if(err) {
//         sendAPIRes('error','serverError',null, req, res);
//       } else {
//         sendAPIRes('success','infoFoundWithData',response, req, res);
//       }
//     }).sort({"createdOn":-1});
//   } else {
//     sendAPIRes('error','missingTrail',null, req, res);
//   }
// };
//Exports the ProductSchema for use elsewhere.
module.exports = dbConnection.db.model("questions", questionSchema);
