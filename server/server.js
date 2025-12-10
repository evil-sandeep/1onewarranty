// server.js (updated: passport init, cookie support, safer CORS, ping)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const warrantyRoutes = require('./routes/warranty');
const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contactRoute');
const careerRoute = require('./routes/careerRoute');
const googleAuth = require('./routes/googleAuth');

// ensure passport strategies are registered (this file loads your strategy)
require('./config/passportGoogle');

const PORT = process.env.PORT || 5000;
const MONGO_CONN = process.env.MONGO_CONN || process.env.MONGO_URI || process.env.MONGO_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();

// --- Middleware (single setup) ---
// Configure CORS to allow your frontend and credentials (cookies) if needed.
// In production narrow this down further.
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// cookie parser (needed if you use httpOnly cookie to store token)
app.use(cookieParser());

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize passport (must be done before routes that use it)
app.use(passport.initialize());
// If you use sessions: app.use(passport.session());

// Simple request logger to help debug requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Quick health / ping route
app.get('/ping', (req, res) => res.send('pong'));

// --- Mount API routes ---
// Keep your existing mounting style (mounted at root)
// Mount contactRoute at root so its POST '/contact' is available as POST /contact
app.use('/', contactRoute);

// Career and Google Auth
app.use('/', careerRoute);
app.use('/', googleAuth);

// Mount warranty and auth routes under /api/**
app.use('/api/warranties', warrantyRoutes);
app.use('/api/auth', authRoutes);

// Basic health route (keeps the same response at /)
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
