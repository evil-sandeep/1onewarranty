// routes/warranty.js
const express = require("express");
const router = express.Router();
const Warranty = require("../models/Warranty");
// const {
//   createWarranty,
//   getWarrantyBySerial
// } = require("../controllers/warrantyController");

// GET all warranties (with optional query: brand, active)
router.get("/", async (req, res) => {
  try {
    const { brand, active } = req.query;
    const filter = {};
    if (brand) filter.brand = new RegExp(brand, "i");

    let docs = await Warranty.find(filter).sort({ createdAt: -1 });

    if (active === "true") {
      const now = new Date();
      docs = docs.filter((d) => d.warrantyExpiry && new Date(d.warrantyExpiry) > now);
    } else if (active === "false") {
      const now = new Date();
      docs = docs.filter((d) => !d.warrantyExpiry || new Date(d.warrantyExpiry) <= now);
    }

    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single warranty by id
router.get("/:id", async (req, res) => {
  try {
    const doc = await Warranty.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create warranty
router.post("/add", async (req, res) => {
  try {
    const payload = req.body;
console.log("Saving Warranty:", payload);   // ✅ log before saving
    // Convert warrantyPeriod to number
    if (payload.warrantyPeriod) {
      payload.warrantyPeriod = Number(payload.warrantyPeriod);
    }

    // Auto-calc expiry if missing
    if (!payload.warrantyExpiry && payload.purchaseDate && payload.warrantyPeriod) {
      const expiry = new Date(payload.purchaseDate);
      expiry.setMonth(expiry.getMonth() + payload.warrantyPeriod);
      payload.warrantyExpiry = expiry;
    }

    const newDoc = new Warranty(payload);
    await newDoc.save();
    console.log("Saved Warranty:", newDoc);    // ✅ log saved document


    res.status(201).json(newDoc);
    

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// PUT update warranty
router.put("/:id", async (req, res) => {
  try {
    const updated = await Warranty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
// CREATE a new warranty record
router.post("/", async (req, res) => {
  try {
    const payload = req.body;

    // Basic validation (adjust as needed)
    if (!payload.productName || !payload.serialNumber || !payload.brand || !payload.purchaseDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optionally compute warrantyExpiry from purchaseDate + warrantyPeriod if not provided
    // e.g. if warrantyPeriod = "12 months" parse it

    const newWarranty = new Warranty({
      productName: payload.productName,
      brand: payload.brand,
      purchaseDate: payload.purchaseDate,
      warrantyPeriod: payload.warrantyPeriod || null,
      warrantyExpiry: payload.warrantyExpiry || null,
      serialNumber: payload.serialNumber,
      seller: payload.seller || null,
      warrantyType: payload.warrantyType || null,
    });

    const saved = await newWarranty.save();

    // If using Socket.IO to broadcast new record to other clients:
    // if (req.app.get('io')) req.app.get('io').emit('warranty:created', saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/warranties error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE warranty
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Warranty.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/serial/:serial", async (req, res) => {
  try {
    const serial = req.params.serial.trim();
    if (!serial) return res.status(400).json({ message: "Serial required" });

    // search case-insensitive
    const doc = await Warranty.findOne({
      serialNumber: { $regex: `^${serial}$`, $options: "i" },
    });

    if (!doc) return res.status(404).json({ message: "Warranty not found" });

    // compute expiry / status
    const now = new Date();
    const expiry = doc.warrantyExpiry ? new Date(doc.warrantyExpiry) : null;
    const isExpired = expiry ? expiry < now : false;

    res.json({
      id: doc._id,
      productName: doc.productName,
      brand: doc.brand,
      purchaseDate: doc.purchaseDate,
      warrantyExpiry: doc.warrantyExpiry,
      serialNumber: doc.serialNumber,
      seller: doc.seller,
      warrantyType: doc.warrantyType,
      isExpired,
    });
  } catch (err) {
    console.error("GET /serial/:serial error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Protected add warranty route
// router.post("/", auth, createWarranty);

// // Public check warranty route
// router.get("/serial/:serial", getWarrantyBySerial);

module.exports = router;
