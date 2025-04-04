import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    console.log("🔹 Checking Admin Token:", req.headers["atoken"]); // Debugging Log

    const atoken = req.headers["atoken"]; // ✅ Extract token correctly
    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET); // ✅ Verify token
    console.log("🔹 Token Decoded:", token_decode); // Debugging Log

    if (!token_decode.email) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    req.adminEmail = token_decode.email; // ✅ Attach admin email to request
    next();
  } catch (error) {
    console.log("❌ Error in authAdmin:", error);
    res.status(403).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authAdmin;
