import React, { useEffect, useState } from "react";
import { getCart, deleteCartItem } from "../utils/api";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCart(res.detail.data);
    } catch (error) {
      console.error("Failed to load cart");
    }
  };

  const handleDelete = async (productId) => {
    await deleteCartItem(productId);
    loadCart();
  };
  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const payload = {
      items: cart.items.map((item) => ({
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const res = await fetch("http://13.61.19.222/api/purchase", {
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

    // ✅ success
    alert("Order placed successfully!");
    loadCart(); // refresh cart (will be empty)

    // later you can redirect:
    // navigate("/order-success");

  } catch (error) {
    console.error("Checkout error", error);
    alert("Something went wrong during checkout");
  }
};

  if (!cart) return <h4>Loading cart...</h4>;

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
                      onClick={() => handleDelete(item.product_id)}
                    >
                      🗑 Remove
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-3 text-center">
                    <div className="qty-box">
                      <button disabled>-</button>
                      <span>{item.quantity}</span>
                      <button disabled>+</button>
                    </div>
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
}
export default Cart;
