import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "#ffffff",
          padding: "20px",
        }}
      >
        <h4
          style={{
            color: "#ffffff",
            marginBottom: "24px",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          Admin
        </h4>

        <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <NavLink to="/admin" style={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/profile" style={linkStyle}>
            Profile
          </NavLink>

          <NavLink to="/admin/categories" style={linkStyle}>
            Categories
          </NavLink>

          <NavLink to="/admin/products" style={linkStyle}>
            Products
          </NavLink>

          <NavLink to="/admin/brands" style={linkStyle}>
            Brands
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1 }}>
        {/* HEADER */}
        <header
          style={{
            height: "60px",
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 20px",
          }}
        >
          <button
            onClick={handleAdminLogout}
            style={{
              background: "#dc2626",
              color: "#ffffff",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ padding: "24px", background: "#f8fafc", minHeight: "calc(100vh - 60px)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#38bdf8" : "#ffffff",
  textDecoration: "none",
  fontWeight: isActive ? "600" : "400",
});

export default AdminLayout;
