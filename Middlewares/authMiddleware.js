import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user info to request
    next();

  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};