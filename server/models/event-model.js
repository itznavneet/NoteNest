const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["Birthday", "Anniversary", "Reminder", "Meeting", "Other"],
    required: true
  },
  remark: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
