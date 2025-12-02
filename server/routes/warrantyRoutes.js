const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createWarranty,
  getWarrantyBySerial
} = require("../controllers/warrantyController");

// Protected add warranty route
router.post("/", auth, createWarranty);

// Public check warranty route
router.get("/serial/:serial", getWarrantyBySerial);

module.exports = router;
