import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps auth pages (Login/Register). If already logged in, there's no
// reason to see these forms again — send them back to the app.
export default function GuestRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}