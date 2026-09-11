import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Route guard for administrator-only pages. Users must be authenticated
 * and must hold the `admin` role to access any nested admin route.
 */
export function AdminRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.role);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/shop" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
