// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  // Ambil user dari backend saat app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

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
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
          localStorage.removeItem("access_token");
        }
      })
      .catch(() => {
        setCurrentUser(null);
        localStorage.removeItem("access_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 

  const logOutUser = () => {
    localStorage.removeItem("access_token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
