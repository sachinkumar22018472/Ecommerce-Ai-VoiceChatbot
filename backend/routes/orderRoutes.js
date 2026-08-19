import express from 'express';

import {
    PlaceOrder,
    placeOrderRazorpay,
    verifyRazorpay,
    userOrders,
    allOrders,
    updateStatus
} from '../controller/orderController.js';

import authUser from '../middleware/isAuth.js';

const orderRouter = express.Router();


// User - COD
orderRouter.post(
    '/placeorder',
    authUser,
    PlaceOrder
);


// User - Razorpay create order
orderRouter.post(
    '/razorpay',
    authUser,
    placeOrderRazorpay
);


// User - Razorpay verification
orderRouter.post(
    '/verifyRazorpay',
    authUser,
    verifyRazorpay
);


// User - Orders
orderRouter.post(
    '/userorders',
    authUser,
    userOrders
);


// Admin - All Orders
orderRouter.post(
    '/list',
    authUser,
    allOrders
);


// Admin - Update Order Status
orderRouter.post(
    '/status',
    authUser,
    updateStatus
);


export default orderRouter;