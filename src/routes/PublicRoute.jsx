import { use } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthContext/AuthContext";
import Loading from "../components/Loading/Loading";

const PublicRoute = ({ children }) => {
  const { user, isLoading } = use(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  // If user is logged in, redirect to dashboard (or home)
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access to login/register
  return children;
};

export default PublicRoute;
