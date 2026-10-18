import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        const token = req.cookies?.token || bearerToken || req.headers?.token;

        if (!token) {
            return res.status(401).json({ message: "user does not have token" });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "user does not have a valid token" });
        }

        req.userId = verifyToken.userId;
        req.userEmail = verifyToken.email;
        next();
    } catch (error) {
        console.log("isAuth error:", error.message);
        return res.status(401).json({ message: `isAuth error: ${error.message}` });
    }
};

export default isAuth;