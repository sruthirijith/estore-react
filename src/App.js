import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Addresses from "./pages/Addresses";
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* Temporary debug banner to confirm React is rendering */}
          <div style={{ background: '#ffeb3b', padding: '8px 16px', textAlign: 'center', fontWeight: 'bold', zIndex: 9999 }}>
            React app is running – if you can see this, the page is loaded.
          </div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/addresses" element={<Addresses />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;