import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/authHook";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.getAccessToken()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
