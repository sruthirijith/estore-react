import { useEffect, useState, useRef } from "react";

import "../css/AdminProfile.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const AdminProfile = () => {
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/view_profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => setProfile(res.detail?.data || {}));

    fetch(`${BASE_URL}/profile/image/username`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res =>
        setProfileImage(res.detail?.data?.profile_image || "")
      );
  }, [token]);

  const updateProfile = async () => {
    await fetch(`${BASE_URL}/edit_profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    alert("Profile updated");
  };

  const changePassword = async () => {
    await fetch(`${BASE_URL}/security_change_password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
    alert("Password changed");
    setOldPassword("");
    setNewPassword("");
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/profile/upload-image`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    setProfileImage(data.detail?.data?.profile_image || "");
  };

  const deleteAccount = async () => {
    if (!window.confirm("This will permanently delete the account. Continue?"))
      return;

    await fetch(`${BASE_URL}/profile/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.clear();
    window.location.href = "/login";
  };

  return (
  <div className="admin-profile-container">
    <h2>Admin Profile</h2>

    {/* PROFILE IMAGE */}
    <div className="profile-image-section">
      <img
        src={profileImage || "/assets/images/default-user.png"}
        alt="Profile"
        className="profile-image"
        onClick={() => fileInputRef.current.click()}
      />
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={uploadImage}
      />
      <p className="image-hint">Click image to change</p>
    </div>

    {/* EDIT PROFILE */}
    <div className="admin-card">
      <h3>Edit Profile</h3>

      <div className="admin-form-grid">
        <input
          type="text"
          placeholder="First Name"
          value={profile.first_name || ""}
          onChange={(e) =>
            setProfile({ ...profile, first_name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Last Name"
          value={profile.last_name || ""}
          onChange={(e) =>
            setProfile({ ...profile, last_name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={profile.email || ""}
          disabled
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={profile.phone_number || ""}
          onChange={(e) =>
            setProfile({ ...profile, phone_number: e.target.value })
          }
        />
      </div>

      <button className="admin-primary-btn" onClick={updateProfile}>
        Save Changes
      </button>
    </div>

    {/* CHANGE PASSWORD */}
    <div className="admin-card">
      <h3>Change Password</h3>

      <div className="admin-form-grid">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button className="admin-primary-btn" onClick={changePassword}>
        Change Password
      </button>
    </div>

    {/* DANGER ZONE */}
    <div className="admin-card danger">
      <h3>Delete Account</h3>
      <button className="admin-danger-btn" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  </div>
);
}
export default AdminProfile;
