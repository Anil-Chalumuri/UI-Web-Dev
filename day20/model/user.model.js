const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    role: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

// Sample User Fields
// _id: 693c3b992b112655360cd32d
// name: "John Doe"
// email: "john.doe@example.com"
// phone: "9876543210"
// password: "$2a$10$abc123fakeHASHforUser1"
// role: "user"
// isActive: true
// createdAt: 2025-12-12T15:58:17.569+00:00
// updatedAt: 2025-12-12T15:58:17.569+00:00
