const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
      // unique: true,
      // trim: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todos", todoSchema);

module.exports = todoModel;
