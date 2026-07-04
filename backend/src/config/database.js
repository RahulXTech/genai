const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    // await mongoose.connect("mongodb+srv://resumeAnalyzer:EY5Dzkbs2WIsqJvd@@@@@datacluster.u8sqr50.mongodb.net/?appName=DataCluster");
    await mongoose.connect("mongodb://127.0.0.1:27017/GenAIShereyains");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;





