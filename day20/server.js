const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json()); // To Parse JSON Body

mongoose
  .connect("mongodb://localhost:27017/euron-fsd-batch1")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Intial Route
app.get("/", (request, response) => {
  response.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

// Routes
app.use("/api/v1/todos", require("./routes/v1/todo.route"));
app.use("/api/v2/todos", require("./routes/v2/todo.route"));

app.listen(3000, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  }

  console.log("Server is running on port http://localhost:3000");
});
