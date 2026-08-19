import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { adminData } = useContext(adminDataContext);
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!adminData ? <Login /> : <Navigate to="/" replace />}
        />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={adminData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} replace />}
        />
        <Route
          path="/add"
          element={adminData ? <Add /> : <Navigate to="/login" state={{ from: location.pathname }} replace />}
        />
        <Route
          path="/lists"
          element={adminData ? <Lists /> : <Navigate to="/login" state={{ from: location.pathname }} replace />}
        />
        <Route
          path="/orders"
          element={adminData ? <Orders /> : <Navigate to="/login" state={{ from: location.pathname }} replace />}
        />

        {/* 404 Catch-All Route (Must be INSIDE <Routes>) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;