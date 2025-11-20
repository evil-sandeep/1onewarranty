// models/Warranty.js
const mongoose = require("mongoose");

const WarrantySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyPeriod: { type: String }, // e.g. "12 months"
  warrantyExpiry: { type: Date },
  serialNumber: { type: String },
  seller: { type: String },
  warrantyType: { type: String },
  createdAt: { type: Date, default: Date.now },
 
},{ timestamps: true });

module.exports = mongoose.model("Warranty", WarrantySchema);
