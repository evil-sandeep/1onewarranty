// server/seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// model
const Warranty = require(path.join(__dirname, "..", "models", "Warranty"));

// Try to load demo data (supports .js or .json)
const dataPathBase = path.join(__dirname, "..", "data", "demoWarranty"); // file without extension
let sample;

try {
  // try .js/.cjs/.mjs via require first
  sample = require(dataPathBase);
} catch (errRequire) {
  // if require failed, try reading JSON file
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

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/onewarranty";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    console.log("Sample length:", sample.length);

    // clear existing docs
    await Warranty.deleteMany({});
    console.log("Cleared existing warranties.");

    // insert with ordered:false so errors won't stop whole insert
    const inserted = await Warranty.insertMany(sample, { ordered: false }).catch((err) => {
      console.error("Partial insert error:", err && err.message);
      // If partial failure, attempt to return insertedDocs if present
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
