import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role !== "ADMIN") return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminProtectedRoute;
