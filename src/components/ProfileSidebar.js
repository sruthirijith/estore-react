import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_API_URL;

const ProfileSidebar = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(
    "/assets/images/default-user.png"
  );

  const fileInputRef = useRef(null);

  // 🔹 Load profile info
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/profile/image/username`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const data = json.detail?.data;
        if (data?.username) setUsername(data.username);
        if (data?.profile_image) setProfileImage(data.profile_image);
      })
      .catch((err) =>
        console.error("Sidebar profile load error:", err)
      );
  }, []);

  // 🔹 Handle image click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 🔹 Handle upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/profile/upload-image`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        console.error("Profile image upload failed");
        return;
      }

      const json = await res.json();
      if (json.detail?.data?.profile_image) {
        setProfileImage(json.detail.data.profile_image);
      }

      // allow selecting same image again
      e.target.value = "";
    } catch (err) {
      console.error("Profile image upload error:", err);
    }
  };

  return (
    <div className="account-sidebar text-center">
      {/* 🔹 CLICKABLE PROFILE IMAGE */}
      <img
        src={profileImage}
        alt="Profile"
        onClick={handleImageClick}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      {/* 🔹 HIDDEN FILE INPUT (THIS IS THE ANSWER TO YOUR QUESTION) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <h5 className="mt-3">{username}</h5>

      <ul className="list-unstyled text-start mt-4">
        <li>
          <NavLink to="/orders" className="sidebar-link">
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className="sidebar-link">
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/payments" className="sidebar-link">
            Payment Method
          </NavLink>
        </li>
        <li>
          <NavLink to="/reviews" className="sidebar-link">
            My Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/addresses" className="sidebar-link">
            Addresses
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="sidebar-link">
            Account Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
