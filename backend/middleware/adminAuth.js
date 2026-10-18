import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = req.cookies?.token || bearerToken || req.headers?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not Authorised, Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("AdminAuth Error:", error.message);

    return res.status(401).json({
      message: error.message,
    });
  }
};

export default adminAuth;