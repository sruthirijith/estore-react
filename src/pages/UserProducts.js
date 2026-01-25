import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsBySubcategory, addToCart } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const UserProducts = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subcategoryId = params.get("subcategory_id");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  

  useEffect(() => {
    if (subcategoryId) {
      loadProducts();
    }
  }, [subcategoryId]);

  const loadProducts = async () => {
    try {
      const response = await getProductsBySubcategory(subcategoryId);
      setProducts(response.detail.data || []);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ MUST be inside component
  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      alert("Please login to add products to cart");
      navigate("/login");
      return;
    }

    try {
      await addToCart(productId, 1);
      alert("Product added to cart");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }


  return (
    <div className="container mt-4">
      <div className="row">
        {products.length === 0 ? (
          <h4>No products found</h4>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div className="card h-100">
                <img
                  src={product.image || product.image_url}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <div className="card-body text-center">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="fw-bold mb-2">₹ {product.price}</p>

                  {/* ✅ Add to Cart button */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProducts;
