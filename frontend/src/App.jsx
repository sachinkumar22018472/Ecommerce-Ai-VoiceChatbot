import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import ProductDetails from "./pages/ProductDetails";
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NotFound'

import { userDataContext } from './context/UserContext'
import Ai from './components/Ai'

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(userDataContext)
  const location = useLocation()

  if (!userData) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const { userData } = useContext(userDataContext)
  const location = useLocation()

  if (userData) {
    return <Navigate to={location.state?.from || "/"} replace />
  }

  return children
}

function App() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <>
      {/* Toast Notification Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={2500} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Navigation Bar */}
      {!isAuthPage && <Nav />}

      {/* Floating AI Assistant Icon - Only visible on main pages */}
      {!isAuthPage && <Ai />}
      
      <Routes>
        {/* Public Guest Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Registration /></PublicRoute>} />

        {/* Protected App Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/collections" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/productdetail/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/placeorder" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
