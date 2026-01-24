import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_API_URL;

function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirm) {
    setMessage("Passwords do not match");
    return;
  }

  const res = await fetch(
    `${BASE_URL}/forgot-password/reset?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password   // ✅ ONLY this
      }),
    }
  );

  const data = await res.json();
  setMessage(data.detail?.message || "Failed");

  if (res.ok) {
    setTimeout(() => navigate("/login"), 2000);
  }
};


  return (
    <div className="auth-box">
      <h3>Reset Password</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button type="submit" className="btn btn-success">
          Reset Password
        </button>
      </form>

      {message && <p className="text-success mt-2">{message}</p>}
    </div>
  );
}

export default ResetPassword;
