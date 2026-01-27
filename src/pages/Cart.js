import React, { useEffect, useState } from "react";
import {
  getCart,
  deleteCartItem,
  addToCart
} from "../utils/api";

import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Load cart
  const loadCart = async () => {
    try {
      const res = await getCart();
      setCart(res.detail.data);
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  // ✅ Delete cart item (use cart_item_id)
  const handleDelete = async (productId) => {
  try {
    await deleteCartItem(productId);
    loadCart();
  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to remove item from cart");
  }
};

 // ➕ Increase by 1
const handleIncrease = async (item) => {
  try {
    await addToCart(item.product_id, 1);   // 👈 delta
    loadCart();
  } catch {
    alert("Failed to update quantity");
  }
};

// ➖ Decrease by 1
const handleDecrease = async (item) => {
  if (item.quantity <= 1) return;

  try {
    await addToCart(item.product_id, -1);  // 👈 delta
    loadCart();
  } catch {
    alert("Failed to update quantity");
  }
};



  // ✅ Checkout
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // 🔴 Not logged in
      if (!token) {
        alert("Please sign in to checkout");
        navigate("/login");
        return;
      }

      const payload = {
        items: cart.items.map((item) => ({
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const res = await fetch(`${BASE_URL}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail?.message || "Checkout failed");
        return;
      }

      alert("Order placed successfully!");
      loadCart(); // refresh cart

      // optional redirect:
      // navigate("/order-success");

    } catch (error) {
      console.error("Checkout error", error);
      alert("Something went wrong during checkout");
    }
  };

  

  if (!cart) return <h4>No item in the cart</h4>;

  return (
    <div className="container my-5">
      <div className="row">

        {/* LEFT: CART ITEMS */}
        <div className="col-lg-8">
          <h4 className="mb-4">Shopping Cart</h4>

          {cart.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.items.map((item) => (
              <div key={item.cart_item_id} className="card cart-item mb-3">
                <div className="card-body">
                  <div className="row align-items-center">

                    {/* Image */}
                    <div className="col-md-2">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="img-fluid rounded"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="col-md-4">
                      <h6 className="mb-1">{item.product_name}</h6>
                      <p className="mb-1 text-muted">₹ {item.price}</p>

                      <span
                        className="text-danger cart-remove"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.product_id)
                        }
                      >
                        🗑 Remove
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="qty-box d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className="fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>


                    {/* Total */}
                    <div className="col-md-3 text-end">
                      <strong>₹ {item.item_total}</strong>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹ {cart.total_price}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹ 100</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>₹ 0</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>₹ {cart.total_price + 100}</span>
              </div>

              <button
                className="btn btn-success w-100"
                onClick={handleCheckout}
                disabled={cart.items.length === 0}
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
