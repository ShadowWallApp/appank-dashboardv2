import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    // Validasi token ke backend
    fetch("http://localhost:5000/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token tidak valid");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          localStorage.removeItem("access_token");
        }
      })
      .catch(() => {
        setAuthenticated(false);
        localStorage.removeItem("access_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Bisa diganti spinner
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
