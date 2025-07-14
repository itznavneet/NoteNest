// server/middleware/auth-middleware.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.userId;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = auth;
