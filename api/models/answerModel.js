const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dbConnection = require("./dbConnection");
//category schema definition
var answerSchema = dbConnection.Schema(
  {
    // _id:mongoose.Schema.Types.ObjectId,
    questionId: { type: String },
    userId: { type: String },
    answer: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

answerSchema.index({ questionId: 1 }, { unique: true });

module.exports = dbConnection.db.model("answers", answerSchema);
