import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// ======================================================
// COD - PLACE ORDER
// ======================================================

export const PlaceOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);

        await newOrder.save();

        // Clear cart
        await User.findByIdAndUpdate(
            userId,
            { cartData: {} }
        );

        return res.status(201).json({
            success: true,
            message: "Order Placed"
        });

    } catch (error) {

        console.log("COD Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Order Place Error"
        });
    }
};


// ======================================================
// RAZORPAY - CREATE ORDER
// ======================================================

export const placeOrderRazorpay = async (req, res) => {
    try {

        const {
            items,
            amount,
            address
        } = req.body;

        const userId = req.userId;


        // -----------------------------
        // Create MongoDB Order
        // -----------------------------

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);

        await newOrder.save();


        // -----------------------------
        // Create Razorpay Order
        // -----------------------------

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: newOrder._id.toString()
        };

        const razorpayOrder =
            await razorpayInstance.orders.create(options);


        // -----------------------------
        // Save Razorpay Order ID
        // -----------------------------

        newOrder.razorpayOrderId = razorpayOrder.id;

        await newOrder.save();


        // -----------------------------
        // Send response
        // -----------------------------

        return res.status(200).json({
            success: true,
            order: razorpayOrder,
            orderId: newOrder._id
        });

    } catch (error) {

        console.log(
            "Razorpay Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================================================
// RAZORPAY - VERIFY PAYMENT
// ======================================================

export const verifyRazorpay = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const userId = req.userId;


        // -----------------------------
        // Check required values
        // -----------------------------

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !orderId
        ) {

            return res.status(400).json({
                success: false,
                message: "Payment verification data is missing"
            });
        }


        // -----------------------------
        // Find MongoDB Order
        // -----------------------------

        const order = await Order.findOne({
            _id: orderId,
            userId: userId
        });

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }


        // -----------------------------
        // Check Razorpay Order ID
        // -----------------------------

        if (
            order.razorpayOrderId !==
            razorpay_order_id
        ) {

            return res.status(400).json({
                success: false,
                message: "Razorpay order ID mismatch"
            });
        }


        // -----------------------------
        // Generate Signature
        // -----------------------------

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


        // -----------------------------
        // Compare Signature
        // -----------------------------

        if (
            expectedSignature !==
            razorpay_signature
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }


        // -----------------------------
        // Payment Verified
        // -----------------------------

        order.payment = true;

        order.razorpayPaymentId =
            razorpay_payment_id;

        order.razorpaySignature =
            razorpay_signature;

        await order.save();


        // -----------------------------
        // Clear Cart
        // -----------------------------

        await User.findByIdAndUpdate(
            userId,
            { cartData: {} }
        );


        return res.status(200).json({
            success: true,
            message: "Payment Verification Successful"
        });

    } catch (error) {

        console.log(
            "Razorpay Verification Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ======================================================
// USER ORDERS
// ======================================================

export const userOrders = async (req, res) => {
    try {

        const userId = req.userId;

        const orders = await Order.find({
            userId
        });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(
            "User Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "userOrders error"
        });
    }
};


// ======================================================
// ADMIN - ALL ORDERS
// ======================================================

export const allOrders = async (req, res) => {
    try {

        const orders = await Order.find({});

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(
            "Admin All Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "adminAllOrders error"
        });
    }
};


// ======================================================
// ADMIN - UPDATE STATUS
// ======================================================

export const updateStatus = async (req, res) => {
    try {

        const {
            orderId,
            status
        } = req.body;

        await Order.findByIdAndUpdate(
            orderId,
            { status }
        );

        return res.status(200).json({
            success: true,
            message: "Status Updated"
        });

    } catch (error) {

        console.log(
            "Update Status Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};