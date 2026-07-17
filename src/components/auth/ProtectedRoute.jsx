import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export function ProtectedRoute ({ children }) {
    const { auth } = useAuthContext();
    if(!auth) return <Navigate to="/login" replace />
    return children;
}