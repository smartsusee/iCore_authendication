import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Prodect = ({ allowedRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // 🚀 Redirect to "/" if no token
    if (!token) {
      navigate("/", { replace: true });
    } else {
      try {
        const decoded = jwtDecode(token);

        // 🚀 If role doesn't match, clear token & redirect
        if (decoded.role !== allowedRole) {
          localStorage.removeItem("authToken");
          navigate("/", { replace: true });
        }
      } catch (error) {
        // 🚀 If token is invalid, clear token & redirect
        localStorage.removeItem("authToken");
        navigate("/", { replace: true });
      }

      // 🚀 Prevent back button navigation
      window.history.pushState(null, null, window.location.href);
      const handleBackButton = (event) => {
        event.preventDefault();
        // localStorage.removeItem("authToken");
        // window.location.reload(true)
        window.history.pushState(null, null, window.location.href);
      };
      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
      };
    }
  }, [token, allowedRole, navigate]);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default Prodect;
