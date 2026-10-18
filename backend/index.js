import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { submitContact } from "./controller/contactController.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://ecommerce-ai-voice-chatbot-ltph.vercel.app",
    "https://ecommerce-ai-voice-chatbot.vercel.app",
    "https://ecommerce-ai-voice-chatbot-jt97.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "token"]
    })
);


// Routes
app.get("/", (req, res) => {
    res.send("Backend Server is Running Successfully");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", submitContact);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Server
app.listen(port, () => {
    console.log(`Hello From Server on port ${port}`);
    connectDb();
});
