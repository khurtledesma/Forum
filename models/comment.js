
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { 
      type: String, 
      required: true 
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    }
}
);

module.exports = mongoose.model("Comment", CommentSchema);