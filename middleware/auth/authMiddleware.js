const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers["authorization"];
  
  // Check if the header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1]; // Get the token part

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Call the next middleware
  });
};

module.exports = { verifyToken };
