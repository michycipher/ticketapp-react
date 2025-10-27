// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../utils/auth";

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   return children
// }

// export default ProtectedRoute

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { handleError } from "../utils/errorHandler";

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();

  if (!session) {
    // Show session-expired toast and redirect
    handleError(new Error("SessionExpired"), "auth");
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}
