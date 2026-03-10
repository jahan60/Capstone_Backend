import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = (req, res, next) => {   //protect: middleware function, runs before protected routes
  try {
    const token = req.headers.authorization?.split(" ")[1]; //Extracts the token from the authorization header using .spilt(" "), with ?. preventing errors if the header is missing.


    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //check if the token is valid using secret key

    req.user = decoded; // if valid attach user info to request
    next(); //move to the next middleware

  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};