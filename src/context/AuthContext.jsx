import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Tangkap access token dari URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Ambil data user dari backend
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://expressdahsboardv2.vercel.app/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Token tidak valid");

      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("access_token");
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loginWithOAuth = (provider) => {
    window.location.href = `http://localhost:5000/auth/oauth/${provider}`;
  };

  const logOutUser = async () => {
    try {
      await fetch("https://expressdahsboardv2.vercel.app/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("access_token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        loginWithOAuth,
        logOutUser,
        fetchUser,
        setCurrentUser, // 👉 ini ditambahkan agar bisa digunakan jika perlu
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
