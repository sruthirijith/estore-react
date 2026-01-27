import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../utils/api";


const BASE_URL = process.env.REACT_APP_API_URL;

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");

  if (searchQuery) {
    fetchSearchedProducts(searchQuery);
  } else {
    fetchProducts();
  }
}, [location.search]);


  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data.detail.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };
  
  const fetchSearchedProducts = async (query) => {
  try {
    const res = await searchProducts(query);
    setProducts(res.detail.data);
  } catch (err) {
    console.error("Search failed", err);
  }
};

  // ✅ ADD TO CART WITH LOGIN CHECK
  const handleAddToCart = async (productId) => {
    // 🔴 NOT LOGGED IN
    if (!isAuthenticated) {
      alert("Please sign in to add items to cart");
      navigate("/login");
      return;
    }

    // 🟢 LOGGED IN
    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added to cart");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add to cart failed", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={product.id}
          >
            <div className="card h-100 text-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />

              <div className="card-body">
                <h6>{product.name}</h6>
                <p className="fw-bold">₹ {product.price}</p>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
