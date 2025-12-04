// server/seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Model
const Warranty = require(path.join(__dirname, "..", "models", "Warranty"));

// Load demo data (.js or .json)
const dataPathBase = path.join(__dirname, "..", "data", "demoWarranty"); 
let sample;

try {
  sample = require(dataPathBase);
} catch (errRequire) {
  try {
    const jsonPath = dataPathBase + ".json";
    if (fs.existsSync(jsonPath)) {
      sample = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    } else {
      console.error("Could not load demoWarranty via require or JSON:", errRequire.message);
      process.exit(1);
    }
  } catch (errJson) {
    console.error("Failed to parse demoWarranty.json:", errJson);
    process.exit(1);
  }
}

if (!Array.isArray(sample)) {
  console.error("demoWarranty must export an array. Found:", typeof sample);
  process.exit(1);
}

// ✅ Use MONGO_CONN from .env
const MONGO_CONN = process.env.MONGO_CONN;

if (!MONGO_CONN) {
  console.error("No Mongo connection string found in .env. Make sure MONGO_CONN is set.");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_CONN);
    console.log("Connected to MongoDB:", MONGO_CONN);

    console.log("Sample length:", sample.length);

    // Clear existing documents
    await Warranty.deleteMany({});
    console.log("Cleared existing warranties.");

    // Insert demo data
    const inserted = await Warranty.insertMany(sample, { ordered: false }).catch(err => {
      console.error("Partial insert error:", err && err.message);
      return (err && err.insertedDocs) || [];
    });

    console.log("Inserted count:", Array.isArray(inserted) ? inserted.length : 0);

    await mongoose.disconnect();
    console.log("Disconnected. Seed complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
