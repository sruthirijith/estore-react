import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../config";

const ProfileSidebar = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(
    "/assets/images/default-user.png"
  );

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

  return (
    <div className="account-sidebar text-center">
      <img
        src={profileImage}
        alt="Profile"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
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
