// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const warrantyRoutes = require('./routes/warranty');
const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contactRoute');
const careerRoute = require("./routes/careerRoute");
const googleAuth = require("./routes/googleAuth");

const PORT = process.env.PORT || 5000;
const MONGO_CONN = process.env.MONGO_CONN || process.env.MONGO_URI || process.env.MONGO_URL;

const app = express();

// --- Middleware (single setup) ---
app.use(cors()); // enable CORS for dev (configure origin in production if needed)
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Simple request logger to help debug requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// --- Mount API routes ---
// Mount contactRoute at root so its POST '/contact' becomes available as POST /contact
app.use('/', contactRoute);

//Career Route
app.use("/", careerRoute);
//Googleauth 
app.use("/", googleAuth);

// Mount warranty and auth routes under /api/**
app.use('/api/warranties', warrantyRoutes);
app.use('/api/auth', authRoutes);

// Basic health route
app.get('/', (req, res) => res.send('OneWarranty API is running'));

// Serve client build in production AFTER all API routes
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) =>
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  );
}

// Generic 404 (for anything not matched)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Generic error handler (last)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ message: 'Internal server error' });
});

// --- Start server after DB connection ---
(async function start() {
  try {
    if (!MONGO_CONN) {
      console.warn('No Mongo connection string provided (MONGO_CONN/MONGO_URI). Skipping DB connect.');
    } else {
      await connectDB(MONGO_CONN);
      console.log('MongoDB connected');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
