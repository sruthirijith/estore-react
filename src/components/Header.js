import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCategories, getSubcategories } from '../utils/api';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      const activeCategories = response.detail.data.filter(cat => cat.is_active);
      setCategories(activeCategories);
      
      // Load subcategories for each category
      activeCategories.forEach(cat => {
        loadSubcategoriesForCategory(cat.id);
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadSubcategoriesForCategory = async (categoryId) => {
    try {
      const response = await getSubcategories(categoryId);
      const activeSubs = response.detail.data.filter(sub => sub.is_active);
      setSubcategories(prev => ({
        ...prev,
        [categoryId]: activeSubs
      }));
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header navbar-area">
      {/* Topbar */}
      <div className="topbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-left">
                <ul className="menu-top-link">
                  <li>
                    <div className="select-position">
                      <select id="select4" defaultValue="0">
                        <option value="0">$ USD</option>
                        <option value="1">€ EURO</option>
                        <option value="2">$ CAD</option>
                        <option value="3">₹ INR</option>
                        <option value="4">¥ CNY</option>
                        <option value="5">৳ BDT</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="select-position">
                      <select id="select5" defaultValue="0">
                        <option value="0">English</option>
                        <option value="1">Español</option>
                        <option value="2">Filipino</option>
                        <option value="3">Français</option>
                        <option value="4">العربية</option>
                        <option value="5">हिन्दी</option>
                        <option value="6">বাংলা</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-middle">
                <ul className="useful-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div className="top-end">
                {!isAuthenticated ? (
                  <ul className="user-login" id="guestMenu">
                    <li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </ul>
                ) : (
                  <div className="user-profile" id="userMenu">
                    <span className="user-name">
                      <i className="lni lni-user"></i> My Account
                    </span>
                    <ul className="user-dropdown">
                      <li><Link to="/profile">My Profile</Link></li>
                      <li><Link to="/orders">My Orders</Link></li>
                      <li><Link to="/wishlist">My Wishlist</Link></li>
                      <li><Link to="/settings">Settings</Link></li>
                      <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Middle */}
      <div className="header-middle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 col-7">
              <Link className="navbar-brand" to="/">
                <span className="brand-text">eStore</span>
              </Link>
            </div>
            <div className="col-lg-5 col-md-7 d-xs-none">
              <div className="main-menu-search">
                <div className="navbar-search search-style-5">
                  <div className="search-select">
                    <div className="select-position">
                      <select id="select1" defaultValue="all">
                        <option value="all">All</option>
                        <option value="1">option 01</option>
                        <option value="2">option 02</option>
                        <option value="3">option 03</option>
                        <option value="4">option 04</option>
                        <option value="5">option 05</option>
                      </select>
                    </div>
                  </div>
                  <div className="search-input">
                    <input type="text" placeholder="Search" />
                  </div>
                  <div className="search-btn">
                    <button><i className="lni lni-search-alt"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-2 col-5">
              <div className="middle-right-area">
                <div className="nav-hotline">
                  <i className="lni lni-phone"></i>
                  <h3>Hotline: <span>(+100) 123 456 7890</span></h3>
                </div>
                <div className="navbar-cart">
                  <div className="wishlist">
                    <Link to="/wishlist">
                      <i className="lni lni-heart"></i>
                      <span className="total-items">0</span>
                    </Link>
                  </div>
                  <div className="cart-items">
                    <Link to="/cart" className="main-btn">
                      <i className="lni lni-cart"></i>
                      <span className="total-items">2</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Bottom */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="nav-inner">
              <div className="mega-category-menu">
                <span className="cat-button" onClick={() => setShowCategories(!showCategories)}>
                  <i className="lni lni-menu"></i>All Categories
                </span>
                {showCategories && (
                  <ul className="sub-category" id="categoryList">
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <a href="#">
                          {cat.name}
                          <i className="lni lni-chevron-right"></i>
                        </a>
                        {subcategories[cat.id] && (
                          <ul className="inner-sub-category">
                            {subcategories[cat.id].map(sub => (
                              <li key={sub.id}>
                                <Link to={`/products?category_id=${cat.id}&subcategory_id=${sub.id}`}>
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link to="/" className="active">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/product-details">Product details</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart">Cart</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="nav-social">
              <h5 className="title">Follow Us:</h5>
              <ul>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="lni lni-facebook-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="lni lni-twitter-original"></i>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="lni lni-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="lni lni-skype"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;