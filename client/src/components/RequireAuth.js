import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    // redirect to login and keep where we came from
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
