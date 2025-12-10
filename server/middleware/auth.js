// middleware/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

function getTokenFromReq(req) {
  // 1) Try httpOnly cookie (cookie-parser required in server.js)
  if (req.cookies && req.cookies.token) return req.cookies.token;

  // 2) Try Authorization header: Bearer <token>
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) return auth.split(" ")[1];

  // 3) Try token in query (not recommended) / fragment won't be here
  if (req.query && req.query.token) return req.query.token;

  return null;
}

function authMiddleware(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ msg: "Not authenticated" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // payload should contain at least id and email
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware, getTokenFromReq };
