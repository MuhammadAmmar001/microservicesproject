const mongoose = require("mongoose");

// Connection URI

// Add to envs later
const DB_URL =
  "mongodb+srv://ahmadareeb3026:1234@cluster0.u0yv2iy.mongodb.net/cloud_log_svc?retryWrites=true&w=majority";

// Connect to MongoDB

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds (adjust as needed)
});

// Check if the connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
