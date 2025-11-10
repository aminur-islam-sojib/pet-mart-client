import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import { Loader2 } from "lucide-react";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // Redirect to login and save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
