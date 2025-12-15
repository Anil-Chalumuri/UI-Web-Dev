const express = require("express");
// const mongoose = require("mongoose");
const userModel = require("./model/user.model");
const connectDB = require("./config/dbConfig");
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // To Parse JSON Body

// mongoose
//   .connect("mongodb://localhost:27017/euron-fsd-batch1")
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// Intial Route
app.get("/", (request, response) => {
  response.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  }

  console.log("Server is running on port http://localhost:3000");
});
