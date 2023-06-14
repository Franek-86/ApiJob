const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobSchema = new Schema({
  company: {
    type: String,
    required: [true, "please provide company"],
  },
  position: {
    type: String,
    required: [true, "please provide position"],
  },
  createdBy: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("job", jobSchema);
