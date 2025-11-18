import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ redirectTo = "/abmAutos" }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;