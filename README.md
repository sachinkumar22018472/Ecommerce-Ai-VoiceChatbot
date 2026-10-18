# 🛍️ OneCart — AI Voice-Enabled E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.x-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-green.svg?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B.svg?logo=razorpay)](https://razorpay.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg?logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7.svg?logo=render)](https://render.com/)

An enterprise-grade, modern full-stack E-Commerce platform equipped with an **interactive AI Voice Assistant**, dual authentication (JWT + cross-site cookies), Razorpay payment gateway integration, Supabase cloud media storage, and a dedicated **Admin Management Portal**.

---

## 🌐 Live Deployments & Links

| Service | Live URL | Platform |
| :--- | :--- | :--- |
| **Storefront (Customer App)** | [https://ecommerce-ai-voice-chatbot.vercel.app](https://ecommerce-ai-voice-chatbot.vercel.app) | **Vercel** |
| **Admin Dashboard** | [https://ecommerce-ai-voice-chatbot-jt97.vercel.app](https://ecommerce-ai-voice-chatbot-jt97.vercel.app) | **Vercel** |
| **REST API Server** | [https://ecommerce-ai-voicechatbotbackend.onrender.com](https://ecommerce-ai-voicechatbotbackend.onrender.com) | **Render** |
| **GitHub Repository** | [sachinkumar22018472/Ecommerce-Ai-VoiceChatbot](https://github.com/sachinkumar22018472/Ecommerce-Ai-VoiceChatbot) | **GitHub** |

---

## ✨ Key Features

### 🎙️ 1. AI Voice Navigation & Assistant
- **Hands-Free Voice Commands**: Utilizes the native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **Interactive Audio Feedback**: Synthesized voice responses with custom audio feedback tones.
- **Smart Voice Navigation**:
  - *"Open search"* / *"Close search"* — Triggers global search bar.
  - *"Go to cart"* / *"Open orders"* / *"Show collections"* — Instant route transitions.
  - Natural speech product filtering and queries.

### 🛒 2. Customer Storefront
- **Dynamic Product Catalog**: Multi-filtering by categories (Men, Women, Kids), sub-categories, price ranges, and real-time search.
- **Persistent Shopping Cart**: Optimistic UI updates synchronized with MongoDB.
- **Dual Payment Modes**:
  - **Cash on Delivery (COD)** with one-click order placement.
  - **Razorpay Integration** with server-side HMAC-SHA256 signature verification.
- **Real-Time Order Tracking**: Multi-step visual timeline tracking order progress (`Order Placed`, `Packing`, `Shipped`, `Out for Delivery`, `Delivered`).

### 🔐 3. Dual-Layer Authentication & Security
- **Cross-Domain Architecture**: Seamless authentication between Vercel frontends and Render backend.
- **Dual Token Engine**:
  - `Authorization: Bearer <token>` via localStorage + automatic Axios interceptor.
  - HTTP-only cross-site cookie fallback (`SameSite: None; Secure`).
- **Google OAuth**: Integrated Firebase popup authentication.
- **Standard Email/Password**: Password hashing with `bcryptjs` and input validation with `validator`.

### 🛡️ 4. Admin Management Dashboard
- **Product Management**: Upload products with multi-image support (up to 4 images per product) stored on Supabase Storage.
- **Catalog Control**: Real-time product removal, pricing, and category updates.
- **Order Processing**: View customer orders, payment status, customer addresses, and update fulfillment states.
- **Metrics & Overview**: Dashboard showing total active products and order volume.

---

## 🛠️ Technology Stack

### **Frontend & Admin**
- **Framework**: React 19, Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7 (with `vercel.json` SPA routing rewrites)
- **State & Context**: React Context API (`UserContext`, `ShopContext`, `AdminContext`, `AuthContext`)
- **HTTP Client**: Axios with global request interceptors
- **Authentication**: Firebase Authentication (Google Sign-In)
- **UI Components & Icons**: React Icons (`io5`, `md`), React Toastify

### **Backend**
- **Runtime**: Node.js, Express 5
- **Database**: MongoDB Atlas with Mongoose 9 ODM
- **Media Storage**: Supabase Cloud Storage (via `@supabase/supabase-js`)
- **Payment Gateway**: Razorpay Node SDK
- **Security & Utilities**: JSON Web Token (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, `cors`, `multer`

---

## 📁 Repository Structure

```
Ecommerce-Ai-VoiceChatbot/
├── frontend/                  # Customer Storefront (Vite + React 19)
│   ├── src/
│   │   ├── components/        # UI components (Nav, Footer, Ai voice assistant, etc.)
│   │   ├── context/           # UserContext, ShopContext, AuthContext
│   │   ├── pages/             # Home, Collection, Cart, PlaceOrder, Order, Login, etc.
│   │   └── main.jsx           # Global Axios interceptors & router entry
│   └── vercel.json            # SPA URL rewrite configuration for Vercel
│
├── admin/                     # Admin Dashboard (Vite + React 19)
│   ├── src/
│   │   ├── componenet/        # Admin Navigation, Sidebar
│   │   ├── context/           # AdminContext, AuthContext
│   │   ├── pages/             # Dashboard Home, Add Product, List Products, Orders, Login
│   │   └── main.jsx           # Admin Axios interceptors & router entry
│   └── vercel.json            # Admin SPA URL rewrite configuration for Vercel
│
└── backend/                   # Node.js + Express REST API Server
    ├── config/                # MongoDB connection, JWT token generators, Supabase client
    ├── controller/            # Auth, Product, Cart, Order, Contact controllers
    ├── middleware/            # isAuth, adminAuth, Multer upload handler
    ├── model/                 # Mongoose schemas (User, Product, Order)
    ├── routes/                # Express API routes
    └── index.js               # Express application entry, CORS, health check
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas cluster URL (or local MongoDB)
- Firebase project credentials
- Razorpay account (Test API keys)
- Supabase account (Storage bucket)

### 1. Clone the Repository
```bash
git clone https://github.com/sachinkumar22018472/Ecommerce-Ai-VoiceChatbot.git
cd Ecommerce-Ai-VoiceChatbot
```

### 2. Configure Environment Variables

#### **Backend (`backend/.env`)**
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@onecart.com
ADMIN_PASSWORD=your_admin_password
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### **Frontend (`frontend/.env`)**
```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### **Admin (`admin/.env`)**
```env
VITE_SERVER_URL=http://localhost:8000
```

---

### 3. Install Dependencies & Run

#### Run Backend Server:
```bash
cd backend
npm install
npm run dev
```
*Backend runs on `http://localhost:8000`*

#### Run Frontend Storefront:
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

#### Run Admin Dashboard:
```bash
cd ../admin
npm install
npm run dev
```
*Admin runs on `http://localhost:5174`*

---

## 📡 API Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health Check | No |
| `POST` | `/api/auth/registration` | Register customer account | No |
| `POST` | `/api/auth/login` | Login customer account | No |
| `POST` | `/api/auth/googlelogin` | Google OAuth login/signup | No |
| `GET` | `/api/auth/logout` | Clear authentication session | No |
| `POST` | `/api/auth/adminlogin` | Admin login | No |
| `GET` | `/api/user/getcurrentuser` | Fetch current logged-in user | **User (Bearer / Cookie)** |
| `GET` | `/api/user/getadmin` | Fetch admin session details | **Admin (Bearer / Cookie)** |
| `GET` | `/api/product/list` | List all available products | No |
| `POST` | `/api/product/addproduct` | Create product (multipart upload) | **Admin** |
| `POST` | `/api/product/remove/:id` | Delete product by ID | **Admin** |
| `POST` | `/api/cart/get` | Get user cart items | **User** |
| `POST` | `/api/cart/add` | Add item & size to cart | **User** |
| `POST` | `/api/cart/update` | Update item quantity in cart | **User** |
| `POST` | `/api/order/placeorder` | Place COD order | **User** |
| `POST` | `/api/order/razorpay` | Initialize Razorpay payment order | **User** |
| `POST` | `/api/order/verifyRazorpay`| Verify payment signature | **User** |
| `POST` | `/api/order/userorders` | Fetch customer order history | **User** |
| `POST` | `/api/order/list` | List all customer orders | **Admin** |
| `POST` | `/api/order/status` | Update fulfillment status of order | **Admin** |

---

## 📌 Recent Updates & Fixes

- **Cross-Domain Token Resolution**: Solved the `GET /api/user/getcurrentuser 400 Bad Request` issue between Vercel and Render by introducing a dual-layer token model (`Authorization: Bearer` via Axios interceptors + `SameSite: None; Secure` cookie fallback).
- **SPA Routing Rewrites**: Added `vercel.json` rewrite configurations in both `frontend` and `admin` to prevent 404 errors on direct navigation or page refresh (`/login`, `/orders`, etc.).
- **Admin & User Logout Architecture**: Fixed context state desynchronization on logout so clicking logout immediately flushes `adminData` / `userData` and redirects to `/login`.
- **Backend Health Check Route**: Added root endpoint `GET /` to verify Render service availability.

---

## 👨‍💻 Author
- **Sachin Kumar**
- GitHub: [@sachinkumar22018472](https://github.com/sachinkumar22018472)

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
