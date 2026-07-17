// GuestRoute.jsx — same idea as ProtectedRoute, flipped
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export function GuestRoute({ children }) {
    const { auth } = useAuthContext();
    if (auth) return <Navigate to="/tasks" replace />;   // already logged in — nothing to do at /login
    return children;
}