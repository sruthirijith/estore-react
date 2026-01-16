import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import { BASE_URL } from "../config";

/* ===================== SECURITY SECTION ===================== */
const SecuritySection = () => {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    reenter_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    if (form.new_password !== form.reenter_password) {
      alert("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");

    const res = await fetch(`${BASE_URL}/security_change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Password updated successfully");
      setForm({
        old_password: "",
        new_password: "",
        reenter_password: "",
      });
    } else {
      alert("Failed to update password");
    }
  };

  return (
    <div className="account-card mt-4">
      <h5>Security</h5>

      <div className="row mt-3">
        <div className="col-md-12 mb-3">
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="reenter_password"
            value={form.reenter_password}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleUpdatePassword}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

/* ===================== DELETE ACCOUNT ===================== */
const DeleteAccountSection = () => {
  const handleDeleteAccount = async () => {
    if (!window.confirm("Once you delete your account, there is no going back. Are you sure?")) {
      return;
    }

    const token = localStorage.getItem("access_token");

    const res = await fetch(`${BASE_URL}/profile/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Account deleted successfully");
      localStorage.clear();
      window.location.href = "/login";
    } else {
      alert("Failed to delete account");
    }
  };

  return (
    <div
      className="account-card mt-4"
      style={{ border: "1px solid #f5c2c7", background: "#fff5f5" }}
    >
      <h5 style={{ color: "#dc3545" }}>Delete Account</h5>
      <p className="text-muted">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <button className="btn btn-danger" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

/* ===================== PROFILE PAGE ===================== */
const Profile = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
  if (!token) return;

  fetch(`${BASE_URL}/view_profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((json) => {
      const u = json?.detail?.data;

      // ✅ IMPORTANT SAFETY CHECK
      if (!u) return;

      setForm({
        first_name: u.first_name || "",
        last_name: u.last_name || "",
        email: u.email || "",
        phone: u.phone_number || "",
      });
    })
    .catch((err) => {
      console.error("Failed to load profile", err);
    });
}, [token]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone_number: form.phone.replace(/\D/g, ""),
    };

    const res = await fetch(`${BASE_URL}/edit_profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Profile updated successfully");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="container account-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <ProfileSidebar />
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="account-card">
            <h4>Account Settings</h4>
            <hr />

            <h6 className="mb-3">Personal Information</h6>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input className="form-control" value={form.email} disabled />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>

          {/* ✅ NOW VISIBLE */}
          <SecuritySection />
          <DeleteAccountSection />
        </div>
      </div>
    </div>
  );
};

export default Profile;
