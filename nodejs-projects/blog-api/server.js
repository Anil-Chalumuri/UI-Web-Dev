require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConfig");

const app = express();
const PORT = process.env.PORT || 1234;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Intial Route
app.get("/", (request, response) => {
  response.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

// Routes
app.use("/api/v1/auth", require("./routes/v1/auth.route"));
app.use("/api/v1/blogs", require("./routes/v1/blog.route"));

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  }

  console.log(`Server is running on port http://localhost:${PORT}`);
});
