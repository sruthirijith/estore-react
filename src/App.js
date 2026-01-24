import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/* LAYOUTS */
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

/* USER PAGES */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Addresses from "./pages/Addresses";

/* ADMIN PAGES */
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Categories from "./pages/UploadCategories";
import Brands from "./pages/UploadBrands";
import Products from "./pages/AdminUploadProduct";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">

          {/* OPTIONAL: DEV BANNER */}
          <div
            style={{
              background: "#ffeb3b",
              padding: "6px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            React app is running
          </div>

          <Routes>

            {/* ================= USER ROUTES ================= */}
            {/* Header & Footer ONLY for users */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/product-details" element={<ProductDetails />} />
            </Route>

            {/* ================= ADMIN ROUTES ================= */}
            {/* NO Header / Footer here */}
            <Route path="/admin" element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="categories" element={<Categories />} />
                <Route path="brands" element={<Brands />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Route>
            
          </Routes>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
