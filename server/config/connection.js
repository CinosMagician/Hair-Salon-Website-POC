const mongoose = require("mongoose");

// MONGODB_URI is from MongoDB Atlas and set in Render as environment variable
mongoose.connect(
  "mongodb://127.0.0.1:27017/hairsalon"
);

module.exports = mongoose.connection;

// process.env.MONGODB_URI || 