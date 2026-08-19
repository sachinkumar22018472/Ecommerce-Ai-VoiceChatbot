import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    

    const { token } = req.cookies;

    if (!token) {
      
      return res.status(400).json({
        message: "Not Authorised, Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    

    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("AdminAuth Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export default adminAuth;