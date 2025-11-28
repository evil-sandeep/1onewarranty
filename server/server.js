// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const warrantyRoutes = require('./routes/warranty')
const authRoutes = require("./routes/authRoutes.js")


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());


// middleware
app.use(cors());
app.use(express.json()); // parse JSON body
app.use("/api/warranties", warrantyRoutes);

// connect DB
if (!MONGO_URI) {
  console.error("MONGO_URI not set in env");
  process.exit(1);
}
connectDB(MONGO_URI);

// routes
app.get("/", (req, res) => res.send("OneWarranty API is running"));
app.use("/api/warranties", warrantyRoutes);

// generic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
