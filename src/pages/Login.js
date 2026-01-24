import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
      return;
    }

    // ✅ ROLE-BASED NAVIGATION (LATEST & CORRECT)
    const role = result.role || localStorage.getItem("role");

    if (role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {error && (
          <p
            id="error-msg"
            style={{ color: "red", textAlign: "center", marginTop: "10px" }}
          >
            {error}
          </p>
        )}

        <div className="links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;