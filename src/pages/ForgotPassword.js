import React, { useState } from "react";
import { BASE_URL } from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail?.message || "Something went wrong");
      } else {
        setMessage(data.detail?.data?.message);
      }
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="login-box">
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Send Reset Link</button>
        </form>

        {message && (
          <p style={{ color: "green", textAlign: "center", marginTop: 10 }}>
            {message}
          </p>
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {error}
          </p>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
