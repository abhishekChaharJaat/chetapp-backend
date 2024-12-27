import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const token = authHeader.split(" ")[1]; // Get the token after 'Bearer'

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Attach user ID to the request object
    req.id = decoded.userId;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default isAuthenticated;
