// Core Module
const path = require("path");

// External Module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
// const DB_PATH = "mongodb+srv://chaitanyachaudhary73:FGGyrjub7QrPXHNf@chaitanya-cluster.7bkyhy1.mongodb.net/snippet?retryWrites=true&w=majority&appName=chaitanya-cluster";
const DB_PATH = "mongodb://localhost:27017/Scratch";

// Local Module
const snippetsRouter = require("./routes/snippetsRouter");
const { pageNotFound, errorHandler } = require("./controllers/errors");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/snippet", snippetsRouter);

// Error handling
app.use(pageNotFound);
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 3001;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
